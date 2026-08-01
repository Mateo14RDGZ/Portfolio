import { ImageResponse } from 'next/og'

export const alt = 'Mateo Rodríguez, desarrollador web en Uruguay · MR14'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 82px',
          background: '#dfe8c8',
          color: '#291532',
          border: '18px solid #291532',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: '-0.03em' }}>MATEO RODRÍGUEZ</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 150, height: 150, borderRadius: 999, background: '#ff5d3a', fontSize: 44, fontWeight: 800 }}>
            MR14
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 86, lineHeight: 0.92, fontWeight: 750, letterSpacing: '-0.055em', maxWidth: 900 }}>
            Desarrollador web en Uruguay.
          </div>
          <div style={{ marginTop: 36, fontSize: 25, color: '#5d4963' }}>
            Sitios web · Tiendas online · Sistemas a medida
          </div>
        </div>
      </div>
    ),
    size,
  )
}
