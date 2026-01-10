'use client'

import {
  PoundSterling,
  TrendingUp,
  Users,
  ShoppingCart,
  Package,
  Calendar,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency } from '@/lib/utils'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

// Mock data for analytics
const revenueData = [
  { month: 'Jul', revenue: 1850000, orders: 98 },
  { month: 'Aug', revenue: 2100000, orders: 112 },
  { month: 'Sep', revenue: 1950000, orders: 105 },
  { month: 'Oct', revenue: 2400000, orders: 128 },
  { month: 'Nov', revenue: 2850000, orders: 145 },
  { month: 'Dec', revenue: 3200000, orders: 168 },
  { month: 'Jan', revenue: 2847650, orders: 156 },
]

const categoryData = [
  { name: 'Engagement Rings', value: 35, color: '#3b82f6' },
  { name: 'Watches', value: 28, color: '#10b981' },
  { name: 'Earrings', value: 15, color: '#f59e0b' },
  { name: 'Bracelets', value: 12, color: '#ef4444' },
  { name: 'Necklaces', value: 10, color: '#8b5cf6' },
]

const topProducts = [
  { name: 'Patek Philippe Nautilus', sales: 12, revenue: 1044864 },
  { name: 'Diamond Engagement Rings', sales: 28, revenue: 892450 },
  { name: 'Diamond Line Bracelets', sales: 8, revenue: 568816 },
  { name: 'Diamond Stud Earrings', sales: 45, revenue: 307665 },
  { name: 'Gold Pendants', sales: 32, revenue: 247232 },
]

const salesByChannel = [
  { channel: 'In-Store', value: 65 },
  { channel: 'Online', value: 20 },
  { channel: 'Phone', value: 10 },
  { channel: 'WhatsApp', value: 5 },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-slate-500">Business insights and performance metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <PoundSterling className="h-5 w-5 text-green-500" />
              <p className="text-sm text-slate-500">Total Revenue (YTD)</p>
            </div>
            <p className="mt-2 text-2xl font-bold">{formatCurrency(17197650)}</p>
            <p className="text-sm text-green-600">+12.5% vs last year</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="h-5 w-5 text-blue-500" />
              <p className="text-sm text-slate-500">Total Orders (YTD)</p>
            </div>
            <p className="mt-2 text-2xl font-bold">912</p>
            <p className="text-sm text-green-600">+8.2% vs last year</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-purple-500" />
              <p className="text-sm text-slate-500">New Customers</p>
            </div>
            <p className="mt-2 text-2xl font-bold">186</p>
            <p className="text-sm text-green-600">+15.3% vs last year</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-amber-500" />
              <p className="text-sm text-slate-500">Avg. Order Value</p>
            </div>
            <p className="mt-2 text-2xl font-bold">{formatCurrency(18854)}</p>
            <p className="text-sm text-green-600">+3.8% vs last year</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis
                    tickFormatter={(value) => `£${(value / 1000000).toFixed(1)}M`}
                  />
                  <Tooltip
                    formatter={(value) => formatCurrency(value as number)}
                    labelFormatter={(label) => `Month: ${label}`}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    name="Revenue"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Sales by Category */}
        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Orders by Month */}
        <Card>
          <CardHeader>
            <CardTitle>Orders by Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="orders" fill="#10b981" name="Orders" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Sales Channel Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Sales by Channel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesByChannel} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" tickFormatter={(value) => `${value}%`} />
                  <YAxis type="category" dataKey="channel" width={80} />
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Bar dataKey="value" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Top Selling Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div
                key={product.name}
                className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-sm font-medium">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-slate-500">{product.sales} units sold</p>
                  </div>
                </div>
                <p className="font-semibold">{formatCurrency(product.revenue)}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
