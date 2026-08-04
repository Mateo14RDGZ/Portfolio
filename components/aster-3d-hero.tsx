'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { useReducedMotion } from 'motion/react'
import { AsterHeroFallback } from '@/components/aster-hero-fallback'

// Generic, unbranded car mesh (CC0 / public domain, no attribution required):
// https://opengameart.org/content/car-0
const MODEL_URL = '/models/car.obj'
// Normalizes the source mesh (whatever its native scale) to a consistent
// on-screen length so the camera/lighting rig below doesn't need retuning
// if the model is swapped.
const TARGET_LENGTH = 4.3

/**
 * Recolors the loaded mesh's material slots into an unbranded, modern EV
 * paint job (dark metallic body, tinted glass, blacked-out trim) and returns
 * whether every expected slot was found - a stale name here would silently
 * leave the model in its default gray materials.
 */
function paintCar(object: THREE.Object3D) {
  const bodyMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x1b2233,
    metalness: 0.6,
    roughness: 0.25,
    clearcoat: 0.7,
    clearcoatRoughness: 0.15,
  })
  const glassMaterial = new THREE.MeshStandardMaterial({
    color: 0x0a1120,
    metalness: 0.2,
    roughness: 0.08,
  })
  const trimMaterial = new THREE.MeshStandardMaterial({
    color: 0x06080d,
    emissive: 0x1c3a63,
    emissiveIntensity: 0.35,
    metalness: 0.5,
    roughness: 0.3,
  })
  const tireMaterial = new THREE.MeshStandardMaterial({ color: 0x0c0c10, roughness: 0.92 })
  const rimMaterial = new THREE.MeshStandardMaterial({ color: 0x585f6a, metalness: 0.85, roughness: 0.28 })

  const materialByName: Record<string, THREE.Material> = {
    Material: bodyMaterial,
    'Material.006': bodyMaterial,
    'Material.007': glassMaterial,
    'Material.008': trimMaterial,
    'Material.004': tireMaterial,
    'Material.005': rimMaterial,
  }
  const foundNames = new Set<string>()

  object.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return
    child.castShadow = true
    child.receiveShadow = true
    const materials = Array.isArray(child.material) ? child.material : [child.material]
    child.material = materials.map((material) => {
      const replacement = materialByName[material.name]
      if (replacement) foundNames.add(material.name)
      return replacement ?? material
    })
  })

  return Object.keys(materialByName).every((name) => foundNames.has(name))
}

/**
 * Centers the model at the origin, rests it on Y=0, scales it to
 * TARGET_LENGTH, and rotates it so its long axis runs along X - matching
 * the orientation the camera and drag-rotation logic below assume,
 * regardless of how the source file was authored.
 */
function normalizeTransform(object: THREE.Object3D) {
  const box = new THREE.Box3().setFromObject(object)
  const size = box.getSize(new THREE.Vector3())
  const center = box.getCenter(new THREE.Vector3())

  const longestHorizontal = Math.max(size.x, size.z)
  const scale = TARGET_LENGTH / longestHorizontal
  object.scale.setScalar(scale)

  if (size.z >= size.x) {
    object.rotation.y = Math.PI / 2
  }

  object.position.set(0, 0, 0)
  const scaledBox = new THREE.Box3().setFromObject(object)
  object.position.set(-center.x * scale, -scaledBox.min.y, -center.z * scale)
}

function AsterCanvas({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [modelReady, setModelReady] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50)
    camera.position.set(4.6, 2.15, 5.8)
    camera.lookAt(0, 0.5, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    container.appendChild(renderer.domElement)

    const carGroup = new THREE.Group()
    scene.add(carGroup)

    let cancelled = false
    new OBJLoader().load(MODEL_URL, (object) => {
      if (cancelled) return
      if (!paintCar(object)) {
        // The source mesh's material slots no longer match what paintCar
        // expects (e.g. the model file was swapped) - fail safe to the
        // static fallback rather than show an unpainted gray car.
        return
      }
      normalizeTransform(object)
      carGroup.add(object)
      setModelReady(true)
    })

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4)
    keyLight.position.set(4, 6, 4)
    keyLight.castShadow = true
    keyLight.shadow.mapSize.set(2048, 2048)
    keyLight.shadow.camera.left = -3
    keyLight.shadow.camera.right = 3
    keyLight.shadow.camera.top = 3
    keyLight.shadow.camera.bottom = -3
    keyLight.shadow.camera.near = 1
    keyLight.shadow.camera.far = 14
    keyLight.shadow.bias = -0.0015
    keyLight.shadow.normalBias = 0.025
    scene.add(keyLight)

    const rimLight = new THREE.DirectionalLight(0x8fb2ff, 2.2)
    rimLight.position.set(-4, 2.5, -3.5)
    scene.add(rimLight)

    const fillLight = new THREE.HemisphereLight(0x6f88c9, 0x0a0d16, 0.55)
    scene.add(fillLight)

    const ground = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), new THREE.ShadowMaterial({ opacity: 0.4 }))
    ground.rotation.x = -Math.PI / 2
    ground.receiveShadow = true
    scene.add(ground)

    function resize() {
      if (!container) return
      const { clientWidth: w, clientHeight: h } = container
      if (w === 0 || h === 0) return
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    resize()
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)

    // Drag-to-rotate with inertia, same horizontal-vs-vertical gesture
    // disambiguation used for the plan cards, so vertical page scroll keeps
    // working on touch devices. Unlike a stylized silhouette, this is a
    // real car mesh, so it holds up at any angle - full 360 degree rotation
    // is allowed.
    const IDLE_SWAY = prefersReducedMotion ? 0 : 0.09

    let isDragging = false
    let lastX = 0
    let velocity = 0
    let idleCenter = 0
    let idleElapsed = 0

    function pointerDown(event: PointerEvent) {
      isDragging = true
      lastX = event.clientX
      velocity = 0
      container?.setPointerCapture(event.pointerId)
    }
    function pointerMove(event: PointerEvent) {
      if (!isDragging) return
      const deltaX = event.clientX - lastX
      lastX = event.clientX
      const rotationDelta = deltaX * 0.008
      carGroup.rotation.y += rotationDelta
      velocity = prefersReducedMotion ? 0 : rotationDelta
    }
    function pointerUp(event: PointerEvent) {
      isDragging = false
      idleElapsed = 0
      container?.releasePointerCapture(event.pointerId)
    }

    container.addEventListener('pointerdown', pointerDown)
    container.addEventListener('pointermove', pointerMove)
    container.addEventListener('pointerup', pointerUp)
    container.addEventListener('pointercancel', pointerUp)

    let frame = 0
    function animate() {
      frame = requestAnimationFrame(animate)
      if (!isDragging) {
        if (Math.abs(velocity) > 0.0001) {
          carGroup.rotation.y += velocity
          velocity *= 0.94
          idleElapsed = 0
        } else {
          if (idleElapsed === 0) idleCenter = carGroup.rotation.y
          idleElapsed += 0.016
          const sway = Math.sin(idleElapsed * 0.5) * IDLE_SWAY
          carGroup.rotation.y = idleCenter + sway
        }
      }
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      container.removeEventListener('pointerdown', pointerDown)
      container.removeEventListener('pointermove', pointerMove)
      container.removeEventListener('pointerup', pointerUp)
      container.removeEventListener('pointercancel', pointerUp)
      container.removeChild(renderer.domElement)
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose()
          const material = object.material
          if (Array.isArray(material)) material.forEach((m) => m.dispose())
          else material.dispose()
        }
      })
      renderer.dispose()
    }
  }, [prefersReducedMotion])

  return (
    <>
      <div
        ref={containerRef}
        className="absolute inset-0 touch-pan-y cursor-grab active:cursor-grabbing"
        role="img"
        aria-label="Modelo 3D interactivo de un vehículo eléctrico de Aster Automóviles Eléctricos. Arrastrá para girarlo."
      />
      {!modelReady && (
        <div className="pointer-events-none absolute inset-0">
          <AsterHeroFallback />
        </div>
      )}
    </>
  )
}

export default function Aster3DHero() {
  const reduceMotion = useReducedMotion()
  const [webglSupported] = useState(() => {
    try {
      const canvas = document.createElement('canvas')
      return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'))
    } catch {
      return false
    }
  })

  if (!webglSupported) {
    return <AsterHeroFallback />
  }

  return <AsterCanvas prefersReducedMotion={Boolean(reduceMotion)} />
}
