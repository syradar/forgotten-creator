import type { NextPage } from 'next'
import { i18n } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import nextI18nextConfig from '../../next-i18next.config'
import { Button } from '../components/Button'
import { PlusIcon } from '../components/icons/PlusIcon'
import { range } from '../functions/functions'
import { getHumanName, Name } from '../names/name-generator'
import { ValidLanguage } from '../village/language'
// import { trpc } from '../utils/trpc'

const VillagePage: NextPage = () => {
  const { t, i18n } = useTranslation()
  const [names, setNames] = useState<Name[]>()

  const nameCreator = useCallback(
    () =>
      range(10).map(() =>
        getHumanName('alderlander', 'male', i18n.language as ValidLanguage),
      ),

    [i18n.language],
  )

  useEffect(() => {
    setNames(nameCreator())
  }, [nameCreator])

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
        <header className="mb-8">
          <h1 className="mb-2 text-4xl font-bold">{t('names:PageTitle')}</h1>

          <p className="mb-4">{t('names:PageDescription')}</p>

          <Button onClick={() => setNames(nameCreator())}>
            <PlusIcon />
            {t('names:GenerateNames')}
          </Button>
        </header>
        {names &&
          names.map(name => (
            <div key={name.id}>
              {name.firstName}
              {name?.familyName && ` ${name.familyName}`}
              {name?.homeName && ` ${t('names:OF')} ${name.homeName}`}
              {name?.nickName && ` ${t('names:THE')} ${name.nickName}`}
            </div>
          ))}
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

export default VillagePage
