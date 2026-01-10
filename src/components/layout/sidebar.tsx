'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  Truck,
  Calendar,
  Wrench,
  BarChart3,
  Settings,
  Diamond,
  Watch,
  FileText,
  Mail,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'Customers', href: '/dashboard/customers', icon: Users },
  { name: 'Mailing Lists', href: '/dashboard/customers/mailing-lists', icon: Mail },
  { name: 'Inventory', href: '/dashboard/inventory', icon: Package },
  { name: 'Products', href: '/dashboard/inventory/products', icon: Diamond },
  { name: 'Watches', href: '/dashboard/inventory/watches', icon: Watch },
  { name: 'Orders', href: '/dashboard/orders', icon: ShoppingCart },
  { name: 'Vendors', href: '/dashboard/vendors', icon: Truck },
  { name: 'Purchase Orders', href: '/dashboard/vendors/purchase-orders', icon: FileText },
  { name: 'Appointments', href: '/dashboard/appointments', icon: Calendar },
  { name: 'Repairs', href: '/dashboard/repairs', icon: Wrench },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col bg-slate-900">
      {/* Logo */}
      <div className="flex h-20 items-center justify-center border-b border-slate-800 px-4">
        <Link href="/dashboard" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="G. Collins & Sons"
            width={180}
            height={50}
            className="brightness-0 invert"
            priority
          />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-2 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              )}
            >
              <item.icon
                className={cn(
                  'mr-3 h-5 w-5 flex-shrink-0',
                  isActive ? 'text-amber-500' : 'text-slate-400 group-hover:text-slate-300'
                )}
              />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-800 p-4">
        <p className="text-xs text-slate-500">
          Smart Platform v1.0
          <br />
          Built by Justransform
        </p>
      </div>
    </div>
  )
}
