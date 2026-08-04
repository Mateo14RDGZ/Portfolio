'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Script from 'next/script'

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

// A Meta Pixel ID is public by design - it's visible in every page's HTML
// once the pixel loads. The environment variable lets it be overridden per
// deployment without exposing any secret.
const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() || '1105012992999205'

/** Loads the Meta Pixel after interaction and records client-side route changes in the App Router. */
export function MetaPixel() {
  const pathname = usePathname()
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (!isReady || !pathname || !window.fbq) return

    window.fbq('track', 'PageView')
  }, [isReady, pathname])

  return (
    <>
      <Script id="meta-pixel-config" strategy="afterInteractive" onReady={() => setIsReady(true)}>
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', ${JSON.stringify(pixelId)});
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          alt=""
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${encodeURIComponent(pixelId)}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  )
}
