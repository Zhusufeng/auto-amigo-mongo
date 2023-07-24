import { Head, Html, Main, NextScript } from "next/document";

const bodyStyle: React.CSSProperties = {
  margin: 0,
};

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <body style={bodyStyle}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
