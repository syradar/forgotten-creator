import Document, { Html, Head, Main, NextScript } from 'next/document'
import i18n from '../../next-i18next.config.js'

class MyDocument extends Document {
  render() {
    const currentLocale =
      this.props.__NEXT_DATA__.locale || i18n.i18n.defaultLocale
    return (
      <Html lang={currentLocale}>
        <Head>
          {/* Adobe Fonts - Yxans Klagan */}
          <link rel="stylesheet" href="https://use.typekit.net/ujt3yzw.css" />

          {/* Google Fonts - Work Sans */}
          <link
            href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
