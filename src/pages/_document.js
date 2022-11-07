import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html data-theme="light">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="alarm-clock.png" type="image/x-icon" />
        <meta name="theme-color" content="#fff" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
