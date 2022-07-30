// src/pages/_app.tsx
import { withTRPC } from '@trpc/next'
import { SessionProvider } from 'next-auth/react'
import { appWithTranslation } from 'next-i18next'
import type { AppType } from 'next/dist/shared/lib/utils'
import superjson from 'superjson'
import nextI18nextConfig from '../../next-i18next.config'
import { Layout } from '../components/Layout'
import type { AppRouter } from '../server/router'
import '../styles/globals.css'

const MyApp: AppType = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}

// The types are sort of correct but not really.
// This is a workaround to get it to work.
// const i18nUserConfig = {
//   i18n: {
//     defaultLocale: i18n.defaultLocale,
//     locales: i18n.locales,
//   },
//   defaultNS: i18n.defaultNS,
//   serializeConfig: i18n.serializeConfig,
//   localePath: i18n.localePath,
// }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// const TranlsatedApp = appWithTranslation(MyApp as any, i18nUserConfig)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TranlsatedApp = appWithTranslation(MyApp as any, nextI18nextConfig)

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return ''
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}` // SSR should use vercel url

  return `http://localhost:${process.env.PORT ?? 3000}` // dev SSR should use localhost
}

export default withTRPC<AppRouter>({
  config({ ctx: _ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = `${getBaseUrl()}/api/trpc`

    return {
      url,
      transformer: superjson,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    }
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(TranlsatedApp)
