import type { NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '../components/Button'
import { CardHeader } from '../components/Card'
import { Parchment2 } from '../components/Parchment2'
import { Stack } from '../components/Stack'
import { Stat } from '../components/Stat'
import { Inn } from '../village/inn'
import { ValidLanguage } from '../village/language'
import { createRandomVillage, Village } from '../village/village'
// import { trpc } from '../utils/trpc'

const VillagePage: NextPage = () => {
  const { t, i18n } = useTranslation('common')
  const [village, setVillage] = useState<Village>()

  const villageCreator = useCallback(
    () => createRandomVillage(i18n.language as ValidLanguage),
    [i18n.language],
  )

  useEffect(() => {
    setVillage(villageCreator())
  }, [villageCreator])

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
          <h1 className="mb-2 text-4xl font-bold">
            {t('common:VillageTitle')}
          </h1>

          <p className="mb-4">Introtext som beskriver featuren.</p>

          <Button onClick={() => setVillage(villageCreator())}>
            Create new village
          </Button>
        </header>
        {village && <VillageView village={village} />}
      </div>
    </>
  )
}

export default VillagePage

interface VillageViewProps {
  village: Village
}
const VillageView = ({ village }: VillageViewProps) => {
  return (
    <Parchment2>
      <CardHeader>{village.name}</CardHeader>
      <div className="mb-6">{village.size}</div>

      <Stack.Vertical>
        <div className="grid grid-cols-3 gap-4">
          <Stat label="Inhabitants">{village.inhabitants} st</Stat>
          <Stat label="Byålder">{village.age} år</Stat>
          <Stat label="Grundad">{village.builtWhen}</Stat>
        </div>

        <section>
          <div className="mb-2 text-xl font-bold">Quirks</div>
          <div className="grid grid-cols-3 gap-4">
            <Stat label="Problem">{village.problem}</Stat>
            <Stat label="Fame">{village.fame}</Stat>
            <Stat label="Oddity">{village.oddity}</Stat>
          </div>
        </section>
        {village.leader && (
          <section>
            <div className="mb-2 text-xl font-bold">Ledare</div>
            <div className="grid grid-cols-2 gap-4">
              <Stat label="Type">{village.leader.type}</Stat>
              {village.leader.type !== 'noOne' && (
                <Stat label="Oddity">{village.leader.oddity}</Stat>
              )}
            </div>
          </section>
        )}
        <section>
          <div className="mb-4 text-xl font-bold">Institutions</div>
          <Stack.Vertical gap="large">
            {village.inns.length !== 0 && (
              <div className="grid grid-cols-2 gap-4">
                {village.inns.map(inn => (
                  <InnView key={inn.id} inn={inn}></InnView>
                ))}
              </div>
            )}
            {village.institutions.length !== 0 && (
              <div className="grid grid-cols-3 gap-4">
                {village.institutions.map(institution => (
                  <div
                    key={institution.id}
                    className="rounded border p-4 font-medium"
                  >
                    {institution.type}
                  </div>
                ))}
              </div>
            )}
          </Stack.Vertical>
        </section>
      </Stack.Vertical>
    </Parchment2>
  )
}

const InnView = ({ inn }: { inn: Inn }) => {
  return (
    <div className="rounded bg-slate-100 p-4">
      <div className="text-sm">Inn</div>
      <div className="font-bold">{inn.name}</div>
      <Stack.Vertical gap="small">
        <Stack.Horizontal justify>
          <div>Oddity</div>
          <div className="font-medium">{inn.oddity}</div>
        </Stack.Horizontal>
        <Stack.Horizontal justify>
          <div>Speciality </div>
          <div className="font-medium">{inn.speciality}</div>
        </Stack.Horizontal>
        <Stack.Horizontal justify>
          <div>Guest</div>
          <div className="font-medium">{inn.guest}</div>
        </Stack.Horizontal>
      </Stack.Vertical>
    </div>
  )
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'footer'])),
      // Will be passed to the page component as props
    },
  }
}
