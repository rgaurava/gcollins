'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { SessionProvider } from 'next-auth/react'
import { Sidebar } from './sidebar'
import { Header } from './header'
import { SidebarProvider } from './sidebar-context'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    // Check demo auth state
    const authData = localStorage.getItem('demo-auth')
    if (authData) {
      try {
        const parsed = JSON.parse(authData)
        if (parsed.loggedIn) {
          setIsAuthenticated(true)
          return
        }
      } catch {
        // Invalid auth data
      }
    }
    // Not authenticated - redirect to landing page
    setIsAuthenticated(false)
    router.push('/')
  }, [router])

  // Show nothing while checking auth
  if (isAuthenticated === null) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-600 mx-auto"></div>
          <p className="mt-4 text-sm text-slate-500">Loading...</p>
        </div>
      </div>
    )
  }

  // Redirect happening
  if (!isAuthenticated) {
    return null
  }

  return (
    <SessionProvider>
      <SidebarProvider>
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <Sidebar />

          {/* Main content */}
          <div className="flex flex-1 flex-col overflow-hidden min-w-0">
            <Header />
            <main className="flex-1 overflow-y-auto bg-slate-50 p-4 lg:p-6">
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </SessionProvider>
  )
}
