import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useTranslation } from 'react-i18next'
// import { trpc } from '../utils/trpc'

export const Sidebar = () => {
  const { t } = useTranslation(['common', 'sidebar'])
  return (
    <div className="flex min-w-[16rem] flex-col gap-4 border-r bg-white shadow-sm lg:w-64">
      <header className="p-4 font-bold hover:text-red-500">
        <Link href="/">{t('common:AppTitle')}</Link>
      </header>
      <nav className="px-2">
        <ul>
          <li>
            <SidebarLink to="/village">{t('sidebar:Menu.Village')}</SidebarLink>
          </li>
          <li>
            <SidebarLink to="/names">{t('sidebar:Menu.Names')}</SidebarLink>
          </li>
        </ul>
      </nav>
      <div className="mt-auto mb-4">
        <LanguageSwitcher />
      </div>
    </div>
  )
}

interface SidebarLinkProps {
  children: React.ReactNode
  to: string
}

const SidebarLink = ({ children, to }: SidebarLinkProps) => {
  const router = useRouter()
  const isActive = router.asPath === to

  return (
    <Link href={to} passHref>
      <a
        className={`block rounded-lg p-2 hover:bg-gray-200
      ${isActive ? 'bg-gray-200' : ''}
      `}
      >
        {children}
      </a>
    </Link>
  )
}

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()

  return (
    <div className="flex justify-center gap-2">
      <LanguageButton locale="en" active={i18n.language === 'en'}>
        English
      </LanguageButton>
      <LanguageButton locale="sv" active={i18n.language === 'sv'}>
        Svenska
      </LanguageButton>
    </div>
  )
}

interface LanguageButtonProps {
  children: React.ReactNode
  active: boolean
  locale: string
}
const LanguageButton = ({ children, active, locale }: LanguageButtonProps) => {
  const router = useRouter()
  return (
    <Link href={router.asPath} locale={locale} passHref>
      <a
        className={`rounded-lg px-2 py-1 text-sm font-medium hover:bg-gray-200 ${
          active ? 'bg-gray-200' : ''
        }`}
      >
        {children}
      </a>
    </Link>
  )
}
