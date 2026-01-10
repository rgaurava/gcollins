'use client'

import { useState } from 'react'
import { Plus, Search, FileText, Clock, CheckCircle, XCircle, Truck, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
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
import { formatCurrency } from '@/lib/utils'

// Real purchase order data for G. Collins & Sons
const purchaseOrders = [
  {
    id: '1',
    poNumber: 'PO-2024-001',
    vendor: 'Patek Philippe SA',
    vendorCode: 'PP-001',
    orderDate: '2024-01-15',
    expectedDelivery: '2024-04-15',
    actualDelivery: null,
    status: 'IN_TRANSIT',
    priority: 'HIGH',
    items: [
      { name: 'Nautilus 5811/1G-001', quantity: 1, unitPrice: 65000 },
      { name: 'Calatrava 5227G-010', quantity: 2, unitPrice: 28000 },
    ],
    totalAmount: 121000,
    currency: 'CHF',
    paymentStatus: 'PARTIAL',
    paidAmount: 60500,
    notes: 'Quarterly allocation - Q1 2024',
  },
  {
    id: '2',
    poNumber: 'PO-2024-002',
    vendor: 'De Beers Diamond Trading',
    vendorCode: 'DB-001',
    orderDate: '2024-01-20',
    expectedDelivery: '2024-02-03',
    actualDelivery: '2024-02-01',
    status: 'DELIVERED',
    priority: 'NORMAL',
    items: [
      { name: '3.50ct Cushion Cut D/VVS1', quantity: 1, unitPrice: 95000 },
      { name: '1.50ct Round Brilliant E/VS1', quantity: 3, unitPrice: 18000 },
      { name: '2.00ct Emerald Cut E/VVS2', quantity: 2, unitPrice: 42000 },
    ],
    totalAmount: 233000,
    currency: 'GBP',
    paymentStatus: 'PAID',
    paidAmount: 233000,
    notes: 'Certified stones for bespoke engagement rings',
  },
  {
    id: '3',
    poNumber: 'PO-2024-003',
    vendor: 'Johnson Matthey',
    vendorCode: 'JM-001',
    orderDate: '2024-01-22',
    expectedDelivery: '2024-01-25',
    actualDelivery: '2024-01-24',
    status: 'DELIVERED',
    priority: 'URGENT',
    items: [
      { name: 'Platinum 950 (oz)', quantity: 50, unitPrice: 980 },
      { name: '18ct Yellow Gold (oz)', quantity: 30, unitPrice: 1650 },
      { name: '18ct White Gold (oz)', quantity: 25, unitPrice: 1580 },
    ],
    totalAmount: 138000,
    currency: 'GBP',
    paymentStatus: 'PAID',
    paidAmount: 138000,
    notes: 'Monthly precious metals replenishment',
  },
  {
    id: '4',
    poNumber: 'PO-2024-004',
    vendor: 'Patek Philippe SA',
    vendorCode: 'PP-001',
    orderDate: '2024-02-01',
    expectedDelivery: '2024-05-01',
    actualDelivery: null,
    status: 'PENDING',
    priority: 'HIGH',
    items: [
      { name: 'Grand Complications 5270P-001', quantity: 1, unitPrice: 185000 },
      { name: 'Aquanaut 5968G-010', quantity: 1, unitPrice: 62000 },
    ],
    totalAmount: 247000,
    currency: 'CHF',
    paymentStatus: 'DEPOSIT_PAID',
    paidAmount: 74100,
    notes: 'Special allocation - Perpetual Calendar model',
  },
  {
    id: '5',
    poNumber: 'PO-2024-005',
    vendor: 'Collins Workshop Ltd',
    vendorCode: 'CW-001',
    orderDate: '2024-02-05',
    expectedDelivery: '2024-02-26',
    actualDelivery: null,
    status: 'IN_PROGRESS',
    priority: 'NORMAL',
    items: [
      { name: 'Bespoke Engagement Ring - Davies', quantity: 1, unitPrice: 4500 },
      { name: 'Wedding Band Set - Thompson', quantity: 1, unitPrice: 2800 },
      { name: 'Ring Resizing (x5)', quantity: 5, unitPrice: 120 },
    ],
    totalAmount: 7900,
    currency: 'GBP',
    paymentStatus: 'PAID',
    paidAmount: 7900,
    notes: 'Workshop manufacturing order - Week 6',
  },
  {
    id: '6',
    poNumber: 'PO-2024-006',
    vendor: 'GIA Gemological Services',
    vendorCode: 'GIA-001',
    orderDate: '2024-02-08',
    expectedDelivery: '2024-02-18',
    actualDelivery: null,
    status: 'IN_PROGRESS',
    priority: 'NORMAL',
    items: [
      { name: 'Diamond Grading Report', quantity: 8, unitPrice: 150 },
      { name: 'Diamond Dossier', quantity: 12, unitPrice: 85 },
    ],
    totalAmount: 2220,
    currency: 'USD',
    paymentStatus: 'PENDING',
    paidAmount: 0,
    notes: 'Certification batch for new inventory',
  },
  {
    id: '7',
    poNumber: 'PO-2024-007',
    vendor: 'De Beers Diamond Trading',
    vendorCode: 'DB-001',
    orderDate: '2024-02-10',
    expectedDelivery: '2024-02-24',
    actualDelivery: null,
    status: 'CONFIRMED',
    priority: 'HIGH',
    items: [
      { name: '5.01ct Emerald Cut D/IF', quantity: 1, unitPrice: 320000 },
      { name: 'Matching Pear Cuts 1.00ct (pair)', quantity: 1, unitPrice: 28000 },
    ],
    totalAmount: 348000,
    currency: 'GBP',
    paymentStatus: 'PARTIAL',
    paidAmount: 174000,
    notes: 'Exceptional stone - VIP client order',
  },
  {
    id: '8',
    poNumber: 'PO-2024-008',
    vendor: 'Cartier International',
    vendorCode: 'CT-001',
    orderDate: '2024-02-12',
    expectedDelivery: '2024-03-28',
    actualDelivery: null,
    status: 'PENDING',
    priority: 'NORMAL',
    items: [
      { name: 'Tank Francaise Medium', quantity: 2, unitPrice: 24500 },
      { name: 'Santos de Cartier Large', quantity: 1, unitPrice: 32000 },
      { name: 'Ballon Bleu 36mm', quantity: 2, unitPrice: 18500 },
    ],
    totalAmount: 118000,
    currency: 'EUR',
    paymentStatus: 'PENDING',
    paidAmount: 0,
    notes: 'Spring collection replenishment',
  },
  {
    id: '9',
    poNumber: 'PO-2023-098',
    vendor: 'Patek Philippe SA',
    vendorCode: 'PP-001',
    orderDate: '2023-11-01',
    expectedDelivery: '2024-02-01',
    actualDelivery: '2024-01-28',
    status: 'DELIVERED',
    priority: 'HIGH',
    items: [
      { name: 'Grand Complications 6300/401G-001', quantity: 1, unitPrice: 4500000 },
    ],
    totalAmount: 4500000,
    currency: 'CHF',
    paymentStatus: 'PAID',
    paidAmount: 4500000,
    notes: 'Grandmaster Chime - Exceptional piece',
  },
  {
    id: '10',
    poNumber: 'PO-2023-095',
    vendor: 'Johnson Matthey',
    vendorCode: 'JM-001',
    orderDate: '2023-12-15',
    expectedDelivery: '2023-12-18',
    actualDelivery: '2023-12-17',
    status: 'DELIVERED',
    priority: 'NORMAL',
    items: [
      { name: 'Platinum 950 (oz)', quantity: 40, unitPrice: 970 },
      { name: '18ct Rose Gold (oz)', quantity: 20, unitPrice: 1620 },
    ],
    totalAmount: 71200,
    currency: 'GBP',
    paymentStatus: 'PAID',
    paidAmount: 71200,
    notes: 'December metals order',
  },
]

const statusOptions = [
  { value: '', label: 'All Statuses' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'CONFIRMED', label: 'Confirmed' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'IN_TRANSIT', label: 'In Transit' },
  { value: 'DELIVERED', label: 'Delivered' },
  { value: 'CANCELLED', label: 'Cancelled' },
]

const vendorOptions = [
  { value: '', label: 'All Vendors' },
  { value: 'Patek Philippe SA', label: 'Patek Philippe' },
  { value: 'De Beers Diamond Trading', label: 'De Beers' },
  { value: 'Johnson Matthey', label: 'Johnson Matthey' },
  { value: 'Cartier International', label: 'Cartier' },
  { value: 'Collins Workshop Ltd', label: 'Collins Workshop' },
  { value: 'GIA Gemological Services', label: 'GIA' },
]

const priorityOptions = [
  { value: '', label: 'All Priorities' },
  { value: 'URGENT', label: 'Urgent' },
  { value: 'HIGH', label: 'High' },
  { value: 'NORMAL', label: 'Normal' },
  { value: 'LOW', label: 'Low' },
]

const statusColors: Record<string, 'success' | 'destructive' | 'warning' | 'secondary' | 'default'> = {
  PENDING: 'secondary',
  CONFIRMED: 'default',
  IN_PROGRESS: 'warning',
  IN_TRANSIT: 'warning',
  DELIVERED: 'success',
  CANCELLED: 'destructive',
}

const statusIcons: Record<string, React.ElementType> = {
  PENDING: Clock,
  CONFIRMED: CheckCircle,
  IN_PROGRESS: Package,
  IN_TRANSIT: Truck,
  DELIVERED: CheckCircle,
  CANCELLED: XCircle,
}

const priorityColors: Record<string, string> = {
  URGENT: 'text-red-600 bg-red-50',
  HIGH: 'text-amber-600 bg-amber-50',
  NORMAL: 'text-slate-600 bg-slate-50',
  LOW: 'text-slate-400 bg-slate-50',
}

const paymentStatusColors: Record<string, 'success' | 'warning' | 'secondary' | 'destructive'> = {
  PAID: 'success',
  PARTIAL: 'warning',
  DEPOSIT_PAID: 'warning',
  PENDING: 'secondary',
  OVERDUE: 'destructive',
}

export default function PurchaseOrdersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [vendorFilter, setVendorFilter] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    vendor: '',
    priority: 'NORMAL',
    expectedDelivery: '',
    itemName: '',
    quantity: '1',
    unitPrice: '',
    currency: 'GBP',
    notes: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Creating PO:', formData)
    setIsModalOpen(false)
    setFormData({
      vendor: '',
      priority: 'NORMAL',
      expectedDelivery: '',
      itemName: '',
      quantity: '1',
      unitPrice: '',
      currency: 'GBP',
      notes: '',
    })
  }

  const filteredOrders = purchaseOrders.filter((order) => {
    const matchesSearch =
      searchQuery === '' ||
      order.poNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.vendor.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === '' || order.status === statusFilter
    const matchesVendor = vendorFilter === '' || order.vendor === vendorFilter
    const matchesPriority = priorityFilter === '' || order.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesVendor && matchesPriority
  })

  const totalPending = purchaseOrders.filter((o) => ['PENDING', 'CONFIRMED'].includes(o.status)).length
  const totalInProgress = purchaseOrders.filter((o) => ['IN_PROGRESS', 'IN_TRANSIT'].includes(o.status)).length
  const totalDelivered = purchaseOrders.filter((o) => o.status === 'DELIVERED').length
  const totalOutstanding = purchaseOrders
    .filter((o) => o.status !== 'DELIVERED')
    .reduce((sum, o) => sum + (o.totalAmount - o.paidAmount), 0)

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Purchase Orders</h1>
          <p className="text-slate-500">Manage vendor orders and deliveries</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create PO
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-slate-500" />
              <p className="text-sm text-slate-500">Pending/Confirmed</p>
            </div>
            <p className="mt-2 text-2xl font-bold">{totalPending}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Truck className="h-5 w-5 text-amber-500" />
              <p className="text-sm text-slate-500">In Progress/Transit</p>
            </div>
            <p className="mt-2 text-2xl font-bold">{totalInProgress}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <p className="text-sm text-slate-500">Delivered (YTD)</p>
            </div>
            <p className="mt-2 text-2xl font-bold">{totalDelivered}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-500" />
              <p className="text-sm text-slate-500">Outstanding Value</p>
            </div>
            <p className="mt-2 text-2xl font-bold">{formatCurrency(totalOutstanding)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search PO number or vendor..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select
          options={vendorOptions}
          value={vendorFilter}
          onChange={(e) => setVendorFilter(e.target.value)}
          className="w-44"
        />
        <Select
          options={statusOptions}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-36"
        />
        <Select
          options={priorityOptions}
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="w-32"
        />
      </div>

      {/* Purchase Orders Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>PO Number</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Expected</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => {
                const StatusIcon = statusIcons[order.status]
                return (
                  <TableRow key={order.id} className="cursor-pointer hover:bg-slate-50">
                    <TableCell>
                      <div className="flex items-center">
                        <FileText className="mr-2 h-4 w-4 text-slate-400" />
                        <span className="font-medium">{order.poNumber}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{order.vendor}</p>
                        <p className="text-xs text-slate-500">{order.vendorCode}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        <p className="text-sm truncate">{order.items[0].name}</p>
                        {order.items.length > 1 && (
                          <p className="text-xs text-slate-500">
                            +{order.items.length - 1} more item{order.items.length > 2 ? 's' : ''}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{formatDate(order.orderDate)}</TableCell>
                    <TableCell className="text-sm">
                      {order.actualDelivery ? (
                        <span className="text-green-600">{formatDate(order.actualDelivery)}</span>
                      ) : (
                        formatDate(order.expectedDelivery)
                      )}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">
                          {order.currency === 'GBP' && '£'}
                          {order.currency === 'CHF' && 'CHF '}
                          {order.currency === 'USD' && '$'}
                          {order.currency === 'EUR' && '€'}
                          {order.totalAmount.toLocaleString()}
                        </p>
                        <p className="text-xs text-slate-500">{order.currency}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={paymentStatusColors[order.paymentStatus]}>
                        {order.paymentStatus.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${priorityColors[order.priority]}`}
                      >
                        {order.priority}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusColors[order.status]} className="flex items-center w-fit gap-1">
                        <StatusIcon className="h-3 w-3" />
                        {order.status.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 text-sm">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5" />
              <div>
                <p>
                  <span className="font-medium">PO-2024-002</span> marked as delivered
                </p>
                <p className="text-slate-500">De Beers Diamond Trading - 2 days ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5" />
              <div>
                <p>
                  <span className="font-medium">PO-2024-001</span> shipped - in transit
                </p>
                <p className="text-slate-500">Patek Philippe SA - 3 days ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5" />
              <div>
                <p>
                  <span className="font-medium">PO-2024-007</span> confirmed by vendor
                </p>
                <p className="text-slate-500">De Beers Diamond Trading - 5 days ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5" />
              <div>
                <p>
                  Payment received for <span className="font-medium">PO-2024-003</span>
                </p>
                <p className="text-slate-500">Johnson Matthey - 1 week ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Create PO Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create Purchase Order" size="lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Vendor *</label>
              <Select
                options={vendorOptions}
                value={formData.vendor}
                onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Priority</label>
              <Select
                options={priorityOptions.filter(o => o.value !== '')}
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Expected Delivery *</label>
              <Input
                type="date"
                required
                value={formData.expectedDelivery}
                onChange={(e) => setFormData({ ...formData, expectedDelivery: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Currency</label>
              <Select
                options={[
                  { value: 'GBP', label: 'GBP (£)' },
                  { value: 'CHF', label: 'CHF' },
                  { value: 'USD', label: 'USD ($)' },
                  { value: 'EUR', label: 'EUR (€)' },
                ]}
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
              />
            </div>
          </div>

          <div className="border rounded-lg p-4 bg-slate-50">
            <h4 className="font-medium mb-3">Order Item</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Item Name *</label>
                <Input
                  required
                  value={formData.itemName}
                  onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
                  placeholder="e.g., Nautilus 5811/1G-001"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
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
                  <label className="block text-sm font-medium text-slate-700 mb-1">Unit Price *</label>
                  <Input
                    type="number"
                    required
                    value={formData.unitPrice}
                    onChange={(e) => setFormData({ ...formData, unitPrice: e.target.value })}
                    placeholder="e.g., 65000"
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
              placeholder="Additional notes for this purchase order..."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Purchase Order</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
