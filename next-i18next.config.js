// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

// const isVercel =
//   typeof window === 'undefined' && process.env.NODE_ENV === 'production'

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'sv'],
    defaultNS: 'common',
    serializeConfig: false,
    localePath: path.resolve('./public/locales'),

    // localePath: path.resolve(
    //   isVercel ? './public/static/locales' : './public/locales',
    // ),
  },
}
