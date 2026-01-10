'use client'

import { Bell, Search, User, LogOut } from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function Header() {
  const { data: session } = useSession()

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      {/* Search */}
      <div className="flex w-96 items-center">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            type="search"
            placeholder="Search customers, products, orders..."
            className="pl-10"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
        </Button>

        {/* User menu */}
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <p className="text-sm font-medium">{session?.user?.name || 'User'}</p>
            <p className="text-xs text-slate-500">{session?.user?.role || 'Role'}</p>
          </div>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => signOut({ callbackUrl: '/login' })}
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
