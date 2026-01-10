'use client'

import {
  PoundSterling,
  ShoppingCart,
  Users,
  TrendingUp,
  Package,
  Calendar,
  Clock,
  AlertTriangle,
} from 'lucide-react'
import { StatsCard } from '@/components/dashboard/stats-card'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatDateTime } from '@/lib/utils'

// Mock data for prototype - will be replaced with real API calls
const stats = {
  totalRevenue: 2847650,
  revenueChange: 12.5,
  totalOrders: 156,
  ordersChange: 8.2,
  totalCustomers: 1243,
  customersChange: 5.1,
  avgOrderValue: 18254,
  aovChange: 3.8,
}

const recentOrders = [
  {
    id: '1',
    orderNumber: 'GCS-2501-0042',
    customer: { firstName: 'Elizabeth', lastName: 'Windsor' },
    totalAmount: 72264,
    currency: 'GBP',
    status: 'PROCESSING',
    placedAt: new Date('2025-01-10T14:30:00'),
  },
  {
    id: '2',
    orderNumber: 'GCS-2501-0041',
    customer: { firstName: 'James', lastName: 'Harrison' },
    totalAmount: 38286,
    currency: 'GBP',
    status: 'PAID',
    placedAt: new Date('2025-01-10T11:15:00'),
  },
  {
    id: '3',
    orderNumber: 'GCS-2501-0040',
    customer: { firstName: 'Sophie', lastName: 'Chen' },
    totalAmount: 25296,
    currency: 'GBP',
    status: 'SHIPPED',
    placedAt: new Date('2025-01-09T16:45:00'),
  },
  {
    id: '4',
    orderNumber: 'GCS-2501-0039',
    customer: { firstName: 'Michael', lastName: 'Roberts' },
    totalAmount: 184590,
    currency: 'GBP',
    status: 'IN_PRODUCTION',
    placedAt: new Date('2025-01-09T09:20:00'),
  },
]

const upcomingAppointments = [
  {
    id: '1',
    title: 'Engagement Ring Consultation',
    type: 'BESPOKE_DESIGN',
    startTime: new Date('2025-01-10T15:00:00'),
    customer: { firstName: 'David', lastName: 'Thompson' },
    host: { firstName: 'Sarah', lastName: 'Collins' },
  },
  {
    id: '2',
    title: 'Watch Collection Viewing',
    type: 'VIEWING',
    startTime: new Date('2025-01-10T16:30:00'),
    customer: { firstName: 'Marcus', lastName: 'Lee' },
    host: { firstName: 'Thomas', lastName: 'Williams' },
  },
  {
    id: '3',
    title: 'Anniversary Gift Selection',
    type: 'CONSULTATION',
    startTime: new Date('2025-01-11T10:00:00'),
    customer: { firstName: 'Emma', lastName: 'Davis' },
    host: { firstName: 'Sarah', lastName: 'Collins' },
  },
]

const lowStockItems = [
  { id: '1', name: '1.00ct Round Brilliant Diamond', sku: 'STN-00234', quantity: 2, location: 'Vault' },
  { id: '2', name: '18ct Yellow Gold Wire (1mm)', sku: 'MTL-00089', quantity: 15, location: 'Workshop' },
  { id: '3', name: 'Patek Philippe 5167A-001', sku: 'WTC-00156', quantity: 1, location: 'Showroom' },
]

const statusColors: Record<string, 'default' | 'success' | 'warning' | 'info' | 'destructive'> = {
  PENDING: 'warning',
  PAID: 'success',
  PROCESSING: 'info',
  IN_PRODUCTION: 'info',
  SHIPPED: 'default',
  DELIVERED: 'success',
  COMPLETED: 'success',
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-slate-500">Welcome to G. Collins & Sons Smart Platform</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Revenue"
          value={formatCurrency(stats.totalRevenue)}
          change={stats.revenueChange}
          changeLabel="vs last month"
          icon={PoundSterling}
          iconColor="text-green-600"
        />
        <StatsCard
          title="Total Orders"
          value={stats.totalOrders.toString()}
          change={stats.ordersChange}
          changeLabel="vs last month"
          icon={ShoppingCart}
          iconColor="text-blue-600"
        />
        <StatsCard
          title="Total Customers"
          value={stats.totalCustomers.toLocaleString()}
          change={stats.customersChange}
          changeLabel="vs last month"
          icon={Users}
          iconColor="text-purple-600"
        />
        <StatsCard
          title="Avg. Order Value"
          value={formatCurrency(stats.avgOrderValue)}
          change={stats.aovChange}
          changeLabel="vs last month"
          icon={TrendingUp}
          iconColor="text-amber-600"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Orders</CardTitle>
            <a href="/dashboard/orders" className="text-sm text-blue-600 hover:underline">
              View all
            </a>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="font-medium">{order.orderNumber}</p>
                    <p className="text-sm text-slate-500">
                      {order.customer.firstName} {order.customer.lastName}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      {formatCurrency(order.totalAmount, order.currency)}
                    </p>
                    <Badge variant={statusColors[order.status] || 'default'}>
                      {order.status.replace('_', ' ')}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Appointments */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Upcoming Appointments</CardTitle>
            <a href="/dashboard/appointments" className="text-sm text-blue-600 hover:underline">
              View all
            </a>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className="flex items-start space-x-4 border-b pb-4 last:border-0 last:pb-0"
                >
                  <div className="rounded-full bg-amber-100 p-2">
                    <Calendar className="h-4 w-4 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{apt.title}</p>
                    <p className="text-sm text-slate-500">
                      {apt.customer.firstName} {apt.customer.lastName}
                    </p>
                    <div className="mt-1 flex items-center text-xs text-slate-400">
                      <Clock className="mr-1 h-3 w-3" />
                      {formatDateTime(apt.startTime)}
                    </div>
                  </div>
                  <Badge variant="outline">{apt.type.replace('_', ' ')}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Low Stock Alert */}
      <Card>
        <CardHeader className="flex flex-row items-center space-x-2">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          <CardTitle className="text-lg">Low Stock Alert</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {lowStockItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center space-x-3">
                  <Package className="h-8 w-8 text-slate-400" />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-slate-500">{item.sku}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-amber-600">{item.quantity}</p>
                  <p className="text-xs text-slate-500">{item.location}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
