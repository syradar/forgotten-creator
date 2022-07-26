import type { NextPage } from 'next'
import Head from 'next/head'
import { useTranslation } from 'react-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// import { trpc } from '../utils/trpc'

const Home: NextPage = () => {
  const { t } = useTranslation('common')
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
          {t('common:VillageTitle')}
        </h1>

        <div className="list-item">Knapp skapa</div>
        <div className="list-item">Byinformation, som antal invånare</div>
        <div className="list-item">Känd för?</div>
        <div className="list-item">Grundat år XXXX</div>
        <div className="list-item">
          Lista på byggnader, med dess ägare, namn på värdshuset?
        </div>
        <div className="list-item">Fortifikationer?</div>
      </div>
    </>
  )
}

export default Home

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'footer'])),
      // Will be passed to the page component as props
    },
  }
}