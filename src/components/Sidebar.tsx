import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useTranslation } from 'react-i18next'
// import { trpc } from '../utils/trpc'

export const Sidebar = () => {
  const { i18n } = useTranslation()
  return (
    <div className="w-64 border-r bg-white shadow-sm">
      <header className="p-4 font-bold hover:text-red-500">
        <Link href="/">Yxans Klagan</Link>
      </header>
      <nav className="px-2">
        <ul>
          <li>
            <SidebarLink to="/village">Village</SidebarLink>
          </li>
        </ul>
      </nav>
      <button
        type="button"
        onClick={() => i18n.changeLanguage('en')}
        className="bg-red-500 p-2 font-bold text-white hover:bg-red-700"
      >
        engelska
      </button>
      <button
        type="button"
        onClick={() => i18n.changeLanguage('sv')}
        className="bg-red-500 p-2 font-bold text-white hover:bg-red-700"
      >
        svenska
      </button>
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
