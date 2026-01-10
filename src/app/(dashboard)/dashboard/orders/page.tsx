'use client'

import { useState } from 'react'
import { Plus, Search, Filter, Eye, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Select } from '@/components/ui/select'
import { Modal } from '@/components/ui/modal'
import { Textarea } from '@/components/ui/textarea'
import { formatCurrency, formatDateTime } from '@/lib/utils'

// Mock order data
const orders = [
  {
    id: '1',
    orderNumber: 'GCS-2501-0042',
    customer: { firstName: 'Elizabeth', lastName: 'Windsor', email: 'elizabeth.windsor@email.com' },
    orderType: 'STANDARD',
    channel: 'IN_STORE',
    status: 'PROCESSING',
    totalAmount: 72264,
    currency: 'GBP',
    items: 1,
    placedAt: new Date('2025-01-10T14:30:00'),
    createdBy: { firstName: 'Sarah', lastName: 'Collins' },
  },
  {
    id: '2',
    orderNumber: 'GCS-2501-0041',
    customer: { firstName: 'James', lastName: 'Harrison', email: 'james.harrison@company.com' },
    orderType: 'CUSTOM',
    channel: 'IN_STORE',
    status: 'IN_PRODUCTION',
    totalAmount: 38286,
    currency: 'GBP',
    items: 1,
    placedAt: new Date('2025-01-10T11:15:00'),
    createdBy: { firstName: 'Thomas', lastName: 'Williams' },
  },
  {
    id: '3',
    orderNumber: 'GCS-2501-0040',
    customer: { firstName: 'Sophie', lastName: 'Chen', email: 'sophie.chen@email.com' },
    orderType: 'STANDARD',
    channel: 'ONLINE',
    status: 'SHIPPED',
    totalAmount: 25296,
    currency: 'GBP',
    items: 1,
    placedAt: new Date('2025-01-09T16:45:00'),
    createdBy: null,
  },
  {
    id: '4',
    orderNumber: 'GCS-2501-0039',
    customer: { firstName: 'Michael', lastName: 'Roberts', email: 'michael.roberts@email.com' },
    orderType: 'CUSTOM',
    channel: 'IN_STORE',
    status: 'IN_PRODUCTION',
    totalAmount: 184590,
    currency: 'GBP',
    items: 1,
    placedAt: new Date('2025-01-09T09:20:00'),
    createdBy: { firstName: 'Sarah', lastName: 'Collins' },
  },
  {
    id: '5',
    orderNumber: 'GCS-2501-0038',
    customer: { firstName: 'Emma', lastName: 'Davis', email: 'emma.davis@email.com' },
    orderType: 'STANDARD',
    channel: 'ONLINE',
    status: 'DELIVERED',
    totalAmount: 7726,
    currency: 'GBP',
    items: 1,
    placedAt: new Date('2025-01-08T10:00:00'),
    createdBy: null,
  },
  {
    id: '6',
    orderNumber: 'GCS-2501-0037',
    customer: { firstName: 'David', lastName: 'Thompson', email: 'david.thompson@email.com' },
    orderType: 'STANDARD',
    channel: 'IN_STORE',
    status: 'COMPLETED',
    totalAmount: 87072,
    currency: 'GBP',
    items: 1,
    placedAt: new Date('2025-01-07T15:30:00'),
    createdBy: { firstName: 'Thomas', lastName: 'Williams' },
  },
  {
    id: '7',
    orderNumber: 'GCS-2501-0036',
    customer: { firstName: 'Marcus', lastName: 'Lee', email: 'marcus.lee@email.com' },
    orderType: 'STANDARD',
    channel: 'PHONE',
    status: 'PENDING',
    totalAmount: 35825,
    currency: 'GBP',
    items: 2,
    placedAt: new Date('2025-01-10T09:00:00'),
    createdBy: { firstName: 'Sarah', lastName: 'Collins' },
  },
]

const statusOptions = [
  { value: '', label: 'All Statuses' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'CONFIRMED', label: 'Confirmed' },
  { value: 'PROCESSING', label: 'Processing' },
  { value: 'IN_PRODUCTION', label: 'In Production' },
  { value: 'SHIPPED', label: 'Shipped' },
  { value: 'DELIVERED', label: 'Delivered' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'CANCELLED', label: 'Cancelled' },
]

const orderTypeOptions = [
  { value: '', label: 'All Types' },
  { value: 'STANDARD', label: 'Standard' },
  { value: 'CUSTOM', label: 'Custom/Bespoke' },
  { value: 'REPAIR', label: 'Repair' },
]

const channelOptions = [
  { value: '', label: 'All Channels' },
  { value: 'ONLINE', label: 'Online' },
  { value: 'IN_STORE', label: 'In-Store' },
  { value: 'PHONE', label: 'Phone' },
  { value: 'WHATSAPP', label: 'WhatsApp' },
]

const statusColors: Record<string, 'default' | 'success' | 'warning' | 'info' | 'destructive' | 'secondary'> = {
  PENDING: 'warning',
  CONFIRMED: 'info',
  PROCESSING: 'info',
  AWAITING_PAYMENT: 'warning',
  PAID: 'success',
  IN_PRODUCTION: 'info',
  READY_FOR_PICKUP: 'success',
  SHIPPED: 'default',
  DELIVERED: 'success',
  COMPLETED: 'success',
  CANCELLED: 'destructive',
  REFUNDED: 'secondary',
}

const customerOptions = [
  { value: '', label: 'Select Customer' },
  { value: 'elizabeth-windsor', label: 'Elizabeth Windsor' },
  { value: 'james-harrison', label: 'James Harrison' },
  { value: 'sophie-chen', label: 'Sophie Chen' },
  { value: 'michael-roberts', label: 'Michael Roberts' },
  { value: 'emma-davis', label: 'Emma Davis' },
  { value: 'david-thompson', label: 'David Thompson' },
]

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [orderTypeFilter, setOrderTypeFilter] = useState('')
  const [channelFilter, setChannelFilter] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    customer: '',
    orderType: 'STANDARD',
    channel: 'IN_STORE',
    productSearch: '',
    quantity: '1',
    price: '',
    notes: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Creating order:', formData)
    setIsModalOpen(false)
    setFormData({
      customer: '',
      orderType: 'STANDARD',
      channel: 'IN_STORE',
      productSearch: '',
      quantity: '1',
      price: '',
      notes: '',
    })
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      searchQuery === '' ||
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${order.customer.firstName} ${order.customer.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === '' || order.status === statusFilter
    const matchesType = orderTypeFilter === '' || order.orderType === orderTypeFilter
    const matchesChannel = channelFilter === '' || order.channel === channelFilter

    return matchesSearch && matchesStatus && matchesType && matchesChannel
  })

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0)
  const pendingOrders = orders.filter((o) => o.status === 'PENDING').length
  const inProductionOrders = orders.filter((o) => o.status === 'IN_PRODUCTION').length

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold">Orders</h1>
          <p className="text-sm lg:text-base text-slate-500">Manage customer orders and fulfillment</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Create Order
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 lg:gap-4 lg:grid-cols-4">
        <Card>
          <CardContent className="p-3 lg:p-4">
            <p className="text-xs lg:text-sm text-slate-500">Total Orders</p>
            <p className="text-xl lg:text-2xl font-bold">156</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 lg:p-4">
            <p className="text-xs lg:text-sm text-slate-500">Pending</p>
            <p className="text-xl lg:text-2xl font-bold">{pendingOrders}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 lg:p-4">
            <p className="text-xs lg:text-sm text-slate-500">In Production</p>
            <p className="text-xl lg:text-2xl font-bold">{inProductionOrders}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 lg:p-4">
            <p className="text-xs lg:text-sm text-slate-500">This Month Revenue</p>
            <p className="text-xl lg:text-2xl font-bold">{formatCurrency(totalRevenue)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search orders..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select
          options={statusOptions}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-36"
        />
        <Select
          options={orderTypeOptions}
          value={orderTypeFilter}
          onChange={(e) => setOrderTypeFilter(e.target.value)}
          className="w-32"
        />
        <Select
          options={channelOptions}
          value={channelFilter}
          onChange={(e) => setChannelFilter(e.target.value)}
          className="w-32"
        />
      </div>

      {/* Orders Table - Desktop */}
      <Card className="hidden lg:block">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order #</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Channel</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Created By</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id} className="cursor-pointer hover:bg-slate-50">
                  <TableCell className="font-mono font-medium">{order.orderNumber}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">
                        {order.customer.firstName} {order.customer.lastName}
                      </p>
                      <p className="text-xs text-slate-500">{order.customer.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{order.orderType}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{order.channel.replace('_', ' ')}</span>
                  </TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell className="font-medium">
                    {formatCurrency(order.totalAmount, order.currency)}
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusColors[order.status]}>
                      {order.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{formatDateTime(order.placedAt)}</TableCell>
                  <TableCell className="text-sm text-slate-500">
                    {order.createdBy
                      ? `${order.createdBy.firstName} ${order.createdBy.lastName}`
                      : 'Online'}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Orders Cards - Mobile */}
      <div className="space-y-3 lg:hidden">
        {filteredOrders.map((order) => (
          <Card key={order.id} className="cursor-pointer active:bg-slate-50">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-mono font-medium text-sm">{order.orderNumber}</p>
                  <p className="text-sm text-slate-500">
                    {order.customer.firstName} {order.customer.lastName}
                  </p>
                </div>
                <Badge variant={statusColors[order.status]} className="text-xs">
                  {order.status.replace('_', ' ')}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-slate-500">Total</p>
                  <p className="font-medium">{formatCurrency(order.totalAmount)}</p>
                </div>
                <div>
                  <p className="text-slate-500">Type</p>
                  <p className="font-medium">{order.orderType}</p>
                </div>
              </div>
              <div className="mt-2 text-xs text-slate-400">
                {formatDateTime(order.placedAt)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Order Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Order" size="lg">
        <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Customer *</label>
            <Select
              options={customerOptions}
              value={formData.customer}
              onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Order Type</label>
              <Select
                options={orderTypeOptions.filter(o => o.value !== '')}
                value={formData.orderType}
                onChange={(e) => setFormData({ ...formData, orderType: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Channel</label>
              <Select
                options={channelOptions.filter(o => o.value !== '')}
                value={formData.channel}
                onChange={(e) => setFormData({ ...formData, channel: e.target.value })}
              />
            </div>
          </div>

          <div className="border rounded-lg p-4 bg-slate-50">
            <h4 className="font-medium mb-3">Order Items</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Product / SKU *</label>
                <Input
                  required
                  value={formData.productSearch}
                  onChange={(e) => setFormData({ ...formData, productSearch: e.target.value })}
                  placeholder="Search product or enter SKU..."
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Quantity</label>
                  <Input
                    type="number"
                    min="1"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Price (GBP) *</label>
                  <Input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="e.g., 38286"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
            <Textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Order notes, special instructions..."
              rows={3}
            />
          </div>

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button type="submit" className="w-full sm:w-auto">Create Order</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
