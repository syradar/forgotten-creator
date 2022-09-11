import { useTranslation } from 'react-i18next'
import { tc } from '../functions/functions'
import { useValidLanguage } from '../hooks/useValidLanguage'
import { Inn } from '../village/inn'
import { LabelValue } from './LabelValue'
import { Name } from './Name'

export const InnView = ({ inn }: { inn: Inn }) => {
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
        <LabelValue label={t('village:Institutions.Owner')}>
          <Name name={inn.owner.name}></Name>
        </LabelValue>
      </div>
    </div>
  )
}
