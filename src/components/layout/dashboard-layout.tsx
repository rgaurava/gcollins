'use client'

import { SessionProvider } from 'next-auth/react'
import { Sidebar } from './sidebar'
import { Header } from './header'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SessionProvider>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto bg-slate-50 p-6">{children}</main>
        </div>
      </div>
    </SessionProvider>
  )
}
