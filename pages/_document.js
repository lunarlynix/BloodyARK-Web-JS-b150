import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
          <link rel="icon" type="image/png" href="/images/favicon.png"></link>
      </Head>
      <body className="bg-bgray-bg dark">
      <div class="bg-gray-800 border-l-4 border-red-500 text-gray-300 p-4 fixed bottom-0 md:bottom-10 right-0 md:right-10 z-50" role="alert">
        <p class="font-bold animate-pulse">Alert! Intermittent Web Server Issues</p>
        <p>We're currently moving to a new domain name bloody.gg, you may face issues during migration!</p>
      </div>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}