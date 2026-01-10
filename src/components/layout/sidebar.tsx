'use client'

import Link from 'next/link'
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
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSidebar } from './sidebar-context'

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
  const { isCollapsed, isMobileOpen, toggleCollapse, closeMobile } = useSidebar()

  const sidebarContent = (
    <>
      {/* Header with Logo and Collapse Arrow */}
      <div className="flex h-28 items-center bg-white px-4">
        {/* Collapse Arrow - desktop only (left side) */}
        {!isCollapsed && (
          <button
            onClick={toggleCollapse}
            className="hidden lg:flex items-center justify-center w-8 h-8 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors flex-shrink-0"
            title="Collapse sidebar"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}

        {/* Logo - centered */}
        <Link href="/dashboard" className="flex-1 flex items-center justify-center" onClick={closeMobile}>
          {isCollapsed ? (
            <img
              src="/gcs/images/gc-griffin.png"
              alt="G. Collins & Sons"
              width={48}
              height={48}
              className="contrast-[3] brightness-[0.3] saturate-150"
            />
          ) : (
            <img
              src="/gcs/images/gcollins-logo.png"
              alt="G. Collins & Sons"
              className="h-20 w-auto contrast-200 brightness-50"
            />
          )}
        </Link>

        {/* Close button - mobile only (right side) */}
        <button
          onClick={closeMobile}
          className="lg:hidden p-1 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Spacer for desktop to balance the layout */}
        {!isCollapsed && <div className="hidden lg:block w-8 h-8 flex-shrink-0" />}
      </div>

      {/* Expand Arrow when collapsed - desktop only */}
      {isCollapsed && (
        <button
          onClick={toggleCollapse}
          className="hidden lg:flex items-center justify-center h-10 w-full bg-white text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          title="Expand sidebar"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      )}

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-2 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={closeMobile}
              title={isCollapsed ? item.name : undefined}
              className={cn(
                'group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isCollapsed ? 'justify-center' : '',
                isActive
                  ? 'bg-white/20 text-white'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              )}
            >
              <item.icon
                className={cn(
                  'h-5 w-5 flex-shrink-0',
                  isCollapsed ? '' : 'mr-3',
                  isActive ? 'text-amber-400' : 'text-white/60 group-hover:text-white/80'
                )}
              />
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="border-t border-white/20 p-4">
          <p className="text-xs text-white/50">
            Smart Platform v1.0
            <br />
            Built by Justransform
          </p>
        </div>
      )}
    </>
  )

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={closeMobile}
        />
      )}

      {/* Mobile sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-64 flex-col transition-transform duration-300 lg:hidden',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        style={{ backgroundColor: '#1a242d' }}
      >
        {sidebarContent}
      </div>

      {/* Desktop sidebar */}
      <div
        className={cn(
          'hidden lg:flex h-full flex-col transition-all duration-300',
          isCollapsed ? 'w-16' : 'w-64'
        )}
        style={{ backgroundColor: '#1a242d' }}
      >
        {sidebarContent}
      </div>
    </>
  )
}
