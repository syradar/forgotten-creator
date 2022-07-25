import React from 'react'
import { Sidebar } from './Sidebar'

// import { trpc } from '../utils/trpc'

interface LayoutProps {
  children: React.ReactNode
}
export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <main className="flex h-screen bg-gray-100 text-gray-800">
        <Sidebar />
        <div className="p-4">{children}</div>
      </main>
    </>
  )
}
