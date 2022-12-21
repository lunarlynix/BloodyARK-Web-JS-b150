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
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}