const path = import('path')

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'sv'],
    ...(typeof window === undefined
      ? { localePath: path.resolve('./public/locales') }
      : {}),
  },
}
