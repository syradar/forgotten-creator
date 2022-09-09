import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { ValidLanguage } from '../village/language'

export const useValidLanguage = () => {
  const { i18n } = useTranslation()
  const [currentLang, setCurrentLang] = useState<ValidLanguage>(
    i18n.language as ValidLanguage,
  )
  useEffect(() => {
    setCurrentLang(i18n.language as ValidLanguage)
  }, [i18n.language])

  return currentLang
}
