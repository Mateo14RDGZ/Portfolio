'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Script from 'next/script'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

// A GA4 measurement ID is public by design. The environment variable lets the
// tracking property be overridden per deployment without exposing any secret.
const measurementId = process.env.NEXT_PUBLIC_GA_ID?.trim() || 'G-2EQ71K5M2F'

/** Loads GA4 after interaction and records client-side route changes in the App Router. */
export function GoogleAnalytics() {
  const pathname = usePathname()
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (!isReady || !pathname || !window.gtag) return

    window.gtag('event', 'page_view', {
      page_location: `${window.location.origin}${pathname}`,
      page_path: pathname,
      page_title: document.title,
    })
  }, [isReady, pathname])

  return (
    <>
      <Script id="google-analytics-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          window.gtag = window.gtag || gtag;
          window.gtag('js', new Date());
          window.gtag('config', ${JSON.stringify(measurementId)}, { anonymize_ip: true, send_page_view: false });
        `}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`}
        strategy="afterInteractive"
        onReady={() => setIsReady(true)}
      />
    </>
  )
}
