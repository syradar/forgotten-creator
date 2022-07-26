import React from 'react'
import { Sidebar } from './Sidebar'

// import { trpc } from '../utils/trpc'

interface LayoutProps {
  children: React.ReactNode
}
export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <main className="flex h-screen flex-col bg-gray-100 text-gray-800 lg:flex-row">
        <Sidebar />
        <div className="w-full px-8 py-4">{children}</div>
      </main>
    </>
  )
}
