import Script from 'next/script'

const measurementId = process.env.NEXT_PUBLIC_GA_ID?.trim()

/** Keeps GA4 ready for activation without loading any Google script until an ID exists. */
export function GoogleAnalytics() {
  if (!measurementId) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', ${JSON.stringify(measurementId)}, { anonymize_ip: true });
        `}
      </Script>
    </>
  )
}
