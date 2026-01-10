'use client'

import { Bell, Search, User, LogOut, Menu } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useSidebar } from './sidebar-context'

export function Header() {
  const router = useRouter()
  const { toggleMobile } = useSidebar()

  const handleLogout = () => {
    // Clear demo auth and redirect to landing page
    if (typeof window !== 'undefined') {
      localStorage.removeItem('demo-auth')
    }
    router.push('/')
  }

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-4 lg:px-6">
      {/* Left side - hamburger and search */}
      <div className="flex items-center gap-3 flex-1">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={toggleMobile}
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Search - hidden on mobile, visible on tablet+ */}
        <div className="hidden sm:block w-full max-w-sm lg:max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-10 w-full"
            />
          </div>
        </div>

        {/* Mobile search button */}
        <Button variant="ghost" size="icon" className="sm:hidden">
          <Search className="h-5 w-5" />
        </Button>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 lg:gap-4">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
        </Button>

        {/* User menu */}
        <div className="flex items-center gap-2 lg:gap-3">
          {/* User info - hidden on small mobile */}
          <div className="hidden md:block text-right">
            <p className="text-sm font-medium truncate max-w-[120px]">
              Admin User
            </p>
            <p className="text-xs text-slate-500">Administrator</p>
          </div>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            title="Logout"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
