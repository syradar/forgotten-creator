import type { NextPage } from 'next'
import { i18n } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import nextI18nextConfig from '../../next-i18next.config'
import { Button } from '../components/Button'
import { CardHeader } from '../components/Card'
import { PlusIcon } from '../components/icons/PlusIcon'
import { LabelValue } from '../components/LabelValue'
import { Name } from '../components/Name'
import { Parchment2 } from '../components/Parchment2'
import { Stack } from '../components/Stack'
import { Stat } from '../components/Stat'
import { tc } from '../functions/functions'
import { useValidLanguage } from '../hooks/useValidLanguage'
import { Inn } from '../village/inn'
import { createRandomVillage, Village } from '../village/village'
// import { trpc } from '../utils/trpc'

const VillagePage: NextPage<{ _village: Village }> = ({
  _village,
}: {
  _village: Village
}) => {
  const { t } = useTranslation()
  const [village, setVillage] = useState<Village>(_village)

  const handleNewVillage = useCallback(() => {
    setVillage(createRandomVillage())
  }, [])

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

          <Button onClick={() => handleNewVillage()}>
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
  const currentLang = useValidLanguage()

  return (
    <Parchment2>
      <CardHeader>{village.name[currentLang]}</CardHeader>
      <div className="mb-6">{t(tc('village:Size', village.size))}</div>

      <Stack.Vertical>
        <div className="flex flex-wrap gap-4">
          <Stat flexGreedy label={t('village:Inhabitants')}>
            {village.inhabitants} st
          </Stat>
          <Stat flexGreedy label={t('village:Age')}>
            {village.age} {t('village:Years')}
          </Stat>
          <Stat flexGreedy label={t('village:Founded')}>
            {t(tc('village:Ages', village.builtWhen))}
          </Stat>
        </div>

        <section>
          <div className="mb-2 text-xl font-bold">{t('village:Quirks')}</div>
          <div className="flex flex-wrap gap-4">
            <Stat flexGreedy label={t('village:Problems.Problem')}>
              {t(tc('village:Problems', village.problem))}
            </Stat>
            <Stat flexGreedy label={t('village:Fames.Fame')}>
              {t(tc('village:Fames', village.fame))}
            </Stat>
            <Stat flexGreedy label={t('village:Oddities.Oddity')}>
              {t(tc('village:Oddities', village.oddity))}
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
                {t(tc('village:Leader.Type', village.leader.type))}
              </Stat>
              <Stat label={t('village:Leader.Oddities.Oddity')}>
                {t(tc('village:Leader.Oddities', village.leader.oddity))}
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
                      <Stack.Vertical>
                        <div>
                          {t(tc('village:Institutions', institution.type))}
                        </div>
                        <LabelValue label={t('village:Institutions.Owner')}>
                          <Name name={institution.owner.name} />
                        </LabelValue>
                      </Stack.Vertical>
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
  const currentLang = useValidLanguage()
  return (
    <div className="rounded bg-slate-100 p-4">
      <div className="text-sm">{t('village:Inns.Inn')}</div>
      <div className="mb-2 font-bold">{inn.name[currentLang]}</div>

      <div className="grid grid-cols-1 gap-2 lg:grid-cols-3 lg:gap-4">
        <LabelValue label={t('village:Inns.Oddities.Oddity')}>
          {t(tc('village:Inns.Oddities', inn.oddity))}
        </LabelValue>
        <LabelValue label={t('village:Inns.Specialities.Speciality')}>
          {t(tc('village:Inns.Specialities', inn.speciality))}
        </LabelValue>
        <LabelValue label={t('village:Inns.Guests.Guest')}>
          {t(tc('village:Inns.Guests', inn.guest))}
        </LabelValue>
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
      ...(await serverSideTranslations(
        locale,
        ['common', 'sidebar', 'home', 'village'],
        nextI18nextConfig,
      )),
      _village: createRandomVillage(),
      // Will be passed to the page component as props
    },
  }
}

export default VillagePage
