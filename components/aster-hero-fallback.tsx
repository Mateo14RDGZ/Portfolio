import Image from 'next/image'

/**
 * Static image shown while the Aster 3D scene's JS chunk is loading, and as
 * the permanent fallback when WebGL isn't available. Kept in its own file
 * with no dependency on three.js so it can be imported eagerly here without
 * pulling the 3D bundle into every page that renders the concept gallery.
 */
export function AsterHeroFallback() {
  return <Image src="/concepts/aster-hero.webp" alt="Vehículo eléctrico en un showroom de Aster Automóviles Eléctricos" fill priority sizes="(max-width:1023px) 100vw, 62vw" className="object-cover" />
}
