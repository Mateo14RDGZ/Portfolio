'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useReducedMotion } from 'motion/react'
import { AsterHeroFallback } from '@/components/aster-hero-fallback'

/**
 * A pure extrusion has the same width along its entire length, which reads
 * fine from the side but looks like a rounded block head-on or from the
 * rear. This narrows the body toward the centerline past a given X, so the
 * nose and tail curve inward in 3D instead of ending in a flat slab.
 */
function taperEnds(
  geometry: THREE.BufferGeometry,
  tapers: { threshold: number; tip: number; minScale: number }[],
) {
  const position = geometry.attributes.position
  for (let i = 0; i < position.count; i++) {
    const x = position.getX(i)
    let scale = 1
    for (const { threshold, tip, minScale } of tapers) {
      const pastThreshold = tip > threshold ? x > threshold : x < threshold
      if (pastThreshold) {
        const t = THREE.MathUtils.clamp((x - threshold) / (tip - threshold), 0, 1)
        scale = Math.min(scale, THREE.MathUtils.lerp(1, minScale, t * t))
      }
    }
    position.setZ(i, position.getZ(i) * scale)
  }
  position.needsUpdate = true
  geometry.computeVertexNormals()
}

/**
 * Builds a stylized, unbranded car silhouette (no licensed 3D model) from
 * primitive and extruded geometry: a lower body shape extruded from a side
 * profile, a narrower inset "greenhouse" (glass cabin) on top, and four
 * wheels. Proportions are what sell the illusion of a real car, not detail.
 */
function buildCar() {
  const car = new THREE.Group()

  const bodyMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x1b2233,
    metalness: 0.55,
    roughness: 0.28,
    clearcoat: 0.65,
    clearcoatRoughness: 0.18,
  })
  const glassMaterial = new THREE.MeshStandardMaterial({
    color: 0x0a1120,
    metalness: 0.2,
    roughness: 0.08,
  })
  const tireMaterial = new THREE.MeshStandardMaterial({ color: 0x0c0c10, roughness: 0.92 })
  const hubMaterial = new THREE.MeshStandardMaterial({ color: 0xaab4c8, metalness: 0.85, roughness: 0.3 })
  const headlightMaterial = new THREE.MeshStandardMaterial({
    color: 0xeaf2ff,
    emissive: 0xbcd4ff,
    emissiveIntensity: 0.9,
    roughness: 0.3,
  })
  const taillightMaterial = new THREE.MeshStandardMaterial({
    color: 0xff5d3a,
    emissive: 0xff3d1a,
    emissiveIntensity: 0.8,
    roughness: 0.3,
  })

  // Side profile of the lower body, in the XY plane (X = length, Y = height).
  // Drawn once and extruded along Z for width.
  const bodyShape = new THREE.Shape()
  bodyShape.moveTo(2.02, 0.2)
  bodyShape.quadraticCurveTo(2.18, 0.2, 2.16, 0.4)
  bodyShape.quadraticCurveTo(2.12, 0.5, 1.9, 0.46)
  bodyShape.lineTo(1.55, 0.5)
  bodyShape.lineTo(1.18, 0.64)
  bodyShape.quadraticCurveTo(0.86, 0.98, 0.5, 1.14)
  bodyShape.lineTo(-0.55, 1.16)
  bodyShape.quadraticCurveTo(-1.0, 1.02, -1.28, 0.66)
  bodyShape.lineTo(-1.7, 0.52)
  bodyShape.lineTo(-1.98, 0.46)
  bodyShape.quadraticCurveTo(-2.2, 0.5, -2.16, 0.32)
  bodyShape.quadraticCurveTo(-2.13, 0.2, -1.98, 0.2)
  // Rocker panel back to the nose, arching up and over each wheel opening so
  // the wheels read as tucked into fenders instead of just floating against
  // a smooth underbody - the single biggest cue that reads as "car" at a
  // glance.
  bodyShape.lineTo(-1.51, 0.2)
  bodyShape.absarc(-1.15, 0.2, 0.36, Math.PI, 0, true)
  bodyShape.lineTo(0.79, 0.2)
  bodyShape.absarc(1.15, 0.2, 0.36, Math.PI, 0, true)
  bodyShape.lineTo(2.02, 0.2)

  const bodyDepth = 1.68
  const bodyGeometry = new THREE.ExtrudeGeometry(bodyShape, {
    depth: bodyDepth,
    bevelEnabled: true,
    bevelThickness: 0.1,
    bevelSize: 0.09,
    bevelSegments: 6,
    curveSegments: 24,
  })
  bodyGeometry.translate(0, 0, -bodyDepth / 2)
  taperEnds(bodyGeometry, [
    { threshold: 1.7, tip: 2.3, minScale: 0.88 },
    { threshold: -1.8, tip: -2.3, minScale: 0.88 },
  ])
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
  body.castShadow = true
  body.receiveShadow = true
  car.add(body)

  // Greenhouse (windshield + roof + rear glass), narrower than the body.
  const glassShape = new THREE.Shape()
  glassShape.moveTo(1.16, 0.62)
  glassShape.lineTo(0.5, 1.1)
  glassShape.quadraticCurveTo(0.0, 1.22, -0.52, 1.12)
  glassShape.lineTo(-1.24, 0.64)
  glassShape.lineTo(1.16, 0.64)
  glassShape.lineTo(1.16, 0.62)

  const glassDepth = bodyDepth - 0.26
  const glassGeometry = new THREE.ExtrudeGeometry(glassShape, {
    depth: glassDepth,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.03,
    bevelSegments: 3,
    curveSegments: 16,
  })
  glassGeometry.translate(0, 0, -glassDepth / 2)
  const glass = new THREE.Mesh(glassGeometry, glassMaterial)
  glass.castShadow = true
  car.add(glass)

  // Wheels - sized to tuck inside the fender arches cut into bodyShape above
  const wheelRadius = 0.3
  const wheelWidth = 0.3
  const tireGeometry = new THREE.CylinderGeometry(wheelRadius, wheelRadius, wheelWidth, 28)
  const hubGeometry = new THREE.CylinderGeometry(wheelRadius * 0.55, wheelRadius * 0.55, wheelWidth + 0.02, 20)

  function addWheel(x: number, z: number) {
    const wheel = new THREE.Group()
    const tire = new THREE.Mesh(tireGeometry, tireMaterial)
    tire.rotation.x = Math.PI / 2
    tire.castShadow = true
    const hub = new THREE.Mesh(hubGeometry, hubMaterial)
    hub.rotation.x = Math.PI / 2
    wheel.add(tire, hub)
    wheel.position.set(x, wheelRadius, z)
    car.add(wheel)
  }

  const track = bodyDepth / 2 - 0.06
  addWheel(1.15, track)
  addWheel(1.15, -track)
  addWheel(-1.15, track)
  addWheel(-1.15, -track)

  // Headlights / taillights - small emissive accents, not literal detail.
  const headlightGeometry = new THREE.BoxGeometry(0.06, 0.14, 0.34)
  const leftHeadlight = new THREE.Mesh(headlightGeometry, headlightMaterial)
  leftHeadlight.position.set(2.12, 0.42, 0.55)
  const rightHeadlight = leftHeadlight.clone()
  rightHeadlight.position.z = -0.55
  car.add(leftHeadlight, rightHeadlight)

  const taillightGeometry = new THREE.BoxGeometry(0.06, 0.16, 0.3)
  const leftTaillight = new THREE.Mesh(taillightGeometry, taillightMaterial)
  leftTaillight.position.set(-2.1, 0.44, 0.58)
  const rightTaillight = leftTaillight.clone()
  rightTaillight.position.z = -0.58
  car.add(leftTaillight, rightTaillight)

  // Side mirrors
  const mirrorGeometry = new THREE.BoxGeometry(0.14, 0.08, 0.06)
  const leftMirror = new THREE.Mesh(mirrorGeometry, bodyMaterial)
  leftMirror.position.set(1.02, 0.78, bodyDepth / 2 - 0.02)
  const rightMirror = leftMirror.clone()
  rightMirror.position.z = -(bodyDepth / 2 - 0.02)
  car.add(leftMirror, rightMirror)

  return car
}

function AsterCanvas({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null)

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

    const carGroup = buildCar()
    scene.add(carGroup)

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
    // working on touch devices. Rotation is clamped to a range around the
    // front 3/4 hero angle - like a real car configurator, it never spins
    // all the way to the flatter head-on views. The range is asymmetric:
    // turning toward the rear 3/4 reveals a clean side profile, turning
    // toward the nose flattens out much sooner, so that direction is capped
    // tighter.
    const ROTATION_LIMIT_NOSE = 0.46
    const ROTATION_LIMIT_TAIL = 1.05
    const IDLE_SWAY = prefersReducedMotion ? 0 : 0.09

    let isDragging = false
    let lastX = 0
    let velocity = 0
    let idleCenter = 0
    let idleElapsed = 0

    function clampRotation(value: number) {
      return THREE.MathUtils.clamp(value, -ROTATION_LIMIT_NOSE, ROTATION_LIMIT_TAIL)
    }

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
      carGroup.rotation.y = clampRotation(carGroup.rotation.y + rotationDelta)
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
          carGroup.rotation.y = clampRotation(carGroup.rotation.y + velocity)
          velocity *= 0.94
          idleElapsed = 0
        } else {
          // Settled: gently sway around wherever the car was left, instead
          // of spinning continuously (which would drift into the clamped,
          // less flattering angles and just sit stuck at the edge).
          if (idleElapsed === 0) idleCenter = carGroup.rotation.y
          idleElapsed += 0.016
          const sway = Math.sin(idleElapsed * 0.5) * IDLE_SWAY
          carGroup.rotation.y = clampRotation(idleCenter + sway)
        }
      }
      renderer.render(scene, camera)
    }
    animate()

    return () => {
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
    <div
      ref={containerRef}
      className="absolute inset-0 touch-pan-y cursor-grab active:cursor-grabbing"
      role="img"
      aria-label="Modelo 3D interactivo de un SUV eléctrico de Aster Automóviles Eléctricos. Arrastrá para girarlo."
    />
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
