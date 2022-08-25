import type { NextPage } from 'next'
import { i18n } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useTranslation } from 'react-i18next'
import nextI18nextConfig from '../../next-i18next.config'
// import { trpc } from '../utils/trpc'

const Home: NextPage = () => {
  const { t } = useTranslation()

  return (
    <>
      <Head>
        <title>Yxans Klagan Next</title>
        <meta
          name="description"
          content="Game master app for Forgotten Lands"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="">
        <h1 className="text-5xl font-extrabold leading-normal text-gray-700 md:text-[5rem]">
          {t('home:PageTitle')}
        </h1>
        <p className="text-2xl text-gray-700">This stack uses:</p>

        <div className="flex w-full items-center justify-center pt-6 text-2xl text-blue-500">
          hello.data
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  if (process.env.NODE_ENV === 'development') {
    await i18n?.reloadResources().then(() => {
      console.log('reloaded resources')
    })
  }

  return {
    props: {
      ...(await serverSideTranslations(
        locale,
        ['common', 'sidebar', 'home', 'village', 'names'],
        nextI18nextConfig,
      )),
      // Will be passed to the page component as props
    },
  }
}

export default Home
