import type { NextPage } from 'next'
import { i18n } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '../components/Button'
import { CardHeader } from '../components/Card'
import { PlusIcon } from '../components/icons/PlusIcon'
import { Parchment2 } from '../components/Parchment2'
import { Stack } from '../components/Stack'
import { Stat } from '../components/Stat'
import { transCombine } from '../functions/functions'
import { Inn } from '../village/inn'
import { ValidLanguage } from '../village/language'
import { createRandomVillage, Village } from '../village/village'
// import { trpc } from '../utils/trpc'

const VillagePage: NextPage = () => {
  const { t, i18n } = useTranslation()
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
          <h1 className="mb-2 text-4xl font-bold">{t('village:PageTitle')}</h1>

          <p className="mb-4">{t('village:PageDescription')}</p>

          <Button onClick={() => setVillage(villageCreator())}>
            <PlusIcon />
            {t('village:CreateNewVillage')}
          </Button>
        </header>
        {village && <VillageView village={village} />}
      </div>
    </>
  )
}

interface VillageViewProps {
  village: Village
}
const VillageView = ({ village }: VillageViewProps) => {
  const { t } = useTranslation()

  return (
    <Parchment2>
      <CardHeader>{village.name}</CardHeader>
      <div className="mb-6">
        {t(transCombine('village:Size', village.size))}
      </div>

      <Stack.Vertical>
        <div className="flex flex-wrap gap-4">
          <Stat flexGreedy label={t('village:Inhabitants')}>
            {village.inhabitants} st
          </Stat>
          <Stat flexGreedy label={t('village:Age')}>
            {village.age} {t('village:Years')}
          </Stat>
          <Stat flexGreedy label={t('village:Founded')}>
            {t(transCombine('village:Ages', village.builtWhen))}
          </Stat>
        </div>

        <section>
          <div className="mb-2 text-xl font-bold">{t('village:Quirks')}</div>
          <div className="flex flex-wrap gap-4">
            <Stat flexGreedy label={t('village:Problems.Problem')}>
              {t(transCombine('village:Problems', village.problem))}
            </Stat>
            <Stat flexGreedy label={t('village:Fames.Fame')}>
              {t(transCombine('village:Fames', village.fame))}
            </Stat>
            <Stat flexGreedy label={t('village:Oddities.Oddity')}>
              {t(transCombine('village:Oddities', village.oddity))}
            </Stat>
          </div>
        </section>
        {village.leader && (
          <section>
            <div className="mb-2 text-xl font-bold">
              {t('village:Leader.Leader')}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Stat label={t('village:Leader.Type.Type')}>
                {t(transCombine('village:Leader.Type', village.leader.type))}
              </Stat>
              <Stat label={t('village:Leader.Oddities.Oddity')}>
                {t(
                  transCombine(
                    'village:Leader.Oddities',
                    village.leader.oddity,
                  ),
                )}
              </Stat>
            </div>
          </section>
        )}
        {(village.inns.length > 0 || village.institutions.length > 0) && (
          <section className="flex flex-col gap-4">
            <div className="text-xl font-bold">
              {t('village:Institutions.Institutions')}
            </div>
            <Stack.Vertical>
              {village.inns.length !== 0 &&
                village.inns.map(inn => (
                  <InnView key={inn.id} inn={inn}></InnView>
                ))}
              {village.institutions.length !== 0 && (
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
                  {village.institutions.map(institution => (
                    <div
                      key={institution.id}
                      className="rounded border p-4 font-medium"
                    >
                      {t(
                        transCombine('village:Institutions', institution.type),
                      )}
                    </div>
                  ))}
                </div>
              )}
            </Stack.Vertical>
          </section>
        )}
      </Stack.Vertical>
    </Parchment2>
  )
}

const InnView = ({ inn }: { inn: Inn }) => {
  const { t } = useTranslation()
  return (
    <div className="rounded bg-slate-100 p-4">
      <div className="text-sm">{t('village:Inns.Inn')}</div>
      <div className="mb-2 font-bold">{inn.name}</div>

      <div className="grid grid-cols-1 gap-2 lg:grid-cols-3 lg:gap-4">
        <div>
          <div className="text-sm">{t('village:Inns.Oddities.Oddity')}</div>
          <div className="font-medium">
            {t(transCombine('village:Inns.Oddities', inn.oddity))}
          </div>
        </div>
        <div>
          <div className="text-sm">
            {t('village:Inns.Specialities.Speciality')}
          </div>
          <div className="font-medium">
            {t(transCombine('village:Inns.Specialities', inn.speciality))}
          </div>
        </div>
        <div>
          <div className="text-sm">{t('village:Inns.Guests.Guest')}</div>
          <div className="font-medium">
            {t(transCombine('village:Inns.Guests', inn.guest))}
          </div>
        </div>
      </div>
    </div>
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
      ...(await serverSideTranslations(locale, [
        'common',
        'sidebar',
        'village',
      ])),
      // Will be passed to the page component as props
    },
  }
}

export default VillagePage
