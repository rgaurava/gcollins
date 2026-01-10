'use client'

import { useState } from 'react'
import { Plus, Search, Filter, Mail, Phone, MoreHorizontal } from 'lucide-react'
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
import { formatCurrency, formatDate, getInitials } from '@/lib/utils'

// Mock customer data for prototype
const customers = [
  {
    id: '1',
    firstName: 'Elizabeth',
    lastName: 'Windsor',
    email: 'elizabeth.windsor@email.com',
    phone: '+44 7700 900123',
    customerType: 'INDIVIDUAL',
    vipLevel: 'PLATINUM',
    lifetimeValue: 485000,
    totalOrders: 12,
    lastPurchaseDate: new Date('2025-01-05'),
    assignedTo: { firstName: 'Sarah', lastName: 'Collins' },
  },
  {
    id: '2',
    firstName: 'James',
    lastName: 'Harrison',
    email: 'james.harrison@company.com',
    phone: '+44 7700 900456',
    customerType: 'CORPORATE',
    vipLevel: 'GOLD',
    lifetimeValue: 156000,
    totalOrders: 8,
    lastPurchaseDate: new Date('2025-01-08'),
    assignedTo: { firstName: 'Thomas', lastName: 'Williams' },
  },
  {
    id: '3',
    firstName: 'Sophie',
    lastName: 'Chen',
    email: 'sophie.chen@email.com',
    phone: '+44 7700 900789',
    customerType: 'INDIVIDUAL',
    vipLevel: 'SILVER',
    lifetimeValue: 78500,
    totalOrders: 5,
    lastPurchaseDate: new Date('2025-01-02'),
    assignedTo: { firstName: 'Sarah', lastName: 'Collins' },
  },
  {
    id: '4',
    firstName: 'Michael',
    lastName: 'Roberts',
    email: 'michael.roberts@email.com',
    phone: '+44 7700 900321',
    customerType: 'INDIVIDUAL',
    vipLevel: 'COLLECTOR',
    lifetimeValue: 1250000,
    totalOrders: 28,
    lastPurchaseDate: new Date('2025-01-09'),
    assignedTo: { firstName: 'Sarah', lastName: 'Collins' },
  },
  {
    id: '5',
    firstName: 'Emma',
    lastName: 'Davis',
    email: 'emma.davis@email.com',
    phone: '+44 7700 900654',
    customerType: 'INDIVIDUAL',
    vipLevel: 'STANDARD',
    lifetimeValue: 12500,
    totalOrders: 2,
    lastPurchaseDate: new Date('2024-12-15'),
    assignedTo: { firstName: 'Thomas', lastName: 'Williams' },
  },
  {
    id: '6',
    firstName: 'David',
    lastName: 'Thompson',
    email: 'david.thompson@email.com',
    phone: '+44 7700 900987',
    customerType: 'INDIVIDUAL',
    vipLevel: 'GOLD',
    lifetimeValue: 95000,
    totalOrders: 6,
    lastPurchaseDate: new Date('2024-12-28'),
    assignedTo: { firstName: 'Sarah', lastName: 'Collins' },
  },
]

const vipColors: Record<string, 'default' | 'secondary' | 'warning' | 'info' | 'destructive'> = {
  STANDARD: 'secondary',
  SILVER: 'default',
  GOLD: 'warning',
  PLATINUM: 'info',
  COLLECTOR: 'destructive',
}

const customerTypeOptions = [
  { value: '', label: 'All Types' },
  { value: 'INDIVIDUAL', label: 'Individual' },
  { value: 'CORPORATE', label: 'Corporate' },
  { value: 'TRADE', label: 'Trade' },
]

const vipLevelOptions = [
  { value: '', label: 'All VIP Levels' },
  { value: 'STANDARD', label: 'Standard' },
  { value: 'SILVER', label: 'Silver' },
  { value: 'GOLD', label: 'Gold' },
  { value: 'PLATINUM', label: 'Platinum' },
  { value: 'COLLECTOR', label: 'Collector' },
]

const assignedToOptions = [
  { value: '', label: 'Select Staff' },
  { value: 'sarah-collins', label: 'Sarah Collins' },
  { value: 'thomas-williams', label: 'Thomas Williams' },
]

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [customerTypeFilter, setCustomerTypeFilter] = useState('')
  const [vipLevelFilter, setVipLevelFilter] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    customerType: 'INDIVIDUAL',
    vipLevel: 'STANDARD',
    assignedTo: '',
    address: '',
    city: '',
    postcode: '',
    notes: '',
  })

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      searchQuery === '' ||
      `${customer.firstName} ${customer.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = customerTypeFilter === '' || customer.customerType === customerTypeFilter
    const matchesVip = vipLevelFilter === '' || customer.vipLevel === vipLevelFilter

    return matchesSearch && matchesType && matchesVip
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Creating customer:', formData)
    // Here you would call your API to create the customer
    setIsModalOpen(false)
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      customerType: 'INDIVIDUAL',
      vipLevel: 'STANDARD',
      assignedTo: '',
      address: '',
      city: '',
      postcode: '',
      notes: '',
    })
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Customers</h1>
          <p className="text-slate-500">Manage your customer relationships</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-slate-500">Total Customers</p>
            <p className="text-2xl font-bold">1,243</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-slate-500">VIP Customers</p>
            <p className="text-2xl font-bold">186</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-slate-500">New This Month</p>
            <p className="text-2xl font-bold">42</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-slate-500">Avg. Lifetime Value</p>
            <p className="text-2xl font-bold">{formatCurrency(28450)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search customers..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select
          options={customerTypeOptions}
          value={customerTypeFilter}
          onChange={(e) => setCustomerTypeFilter(e.target.value)}
          className="w-40"
        />
        <Select
          options={vipLevelOptions}
          value={vipLevelFilter}
          onChange={(e) => setVipLevelFilter(e.target.value)}
          className="w-40"
        />
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          More Filters
        </Button>
      </div>

      {/* Customer Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>VIP Level</TableHead>
                <TableHead>Lifetime Value</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Last Purchase</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id} className="cursor-pointer hover:bg-slate-50">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 font-medium">
                        {getInitials(customer.firstName, customer.lastName)}
                      </div>
                      <div>
                        <p className="font-medium">
                          {customer.firstName} {customer.lastName}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Mail className="mr-2 h-3 w-3 text-slate-400" />
                        {customer.email}
                      </div>
                      <div className="flex items-center text-sm text-slate-500">
                        <Phone className="mr-2 h-3 w-3 text-slate-400" />
                        {customer.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{customer.customerType}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={vipColors[customer.vipLevel]}>{customer.vipLevel}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    {formatCurrency(customer.lifetimeValue)}
                  </TableCell>
                  <TableCell>{customer.totalOrders}</TableCell>
                  <TableCell>{formatDate(customer.lastPurchaseDate)}</TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {customer.assignedTo.firstName} {customer.assignedTo.lastName}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Customer Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Customer" size="lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">First Name *</label>
              <Input
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                placeholder="Enter first name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Last Name *</label>
              <Input
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                placeholder="Enter last name"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
              <Input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="email@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+44 7700 900000"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Customer Type</label>
              <Select
                options={[
                  { value: 'INDIVIDUAL', label: 'Individual' },
                  { value: 'CORPORATE', label: 'Corporate' },
                  { value: 'TRADE', label: 'Trade' },
                ]}
                value={formData.customerType}
                onChange={(e) => setFormData({ ...formData, customerType: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">VIP Level</label>
              <Select
                options={[
                  { value: 'STANDARD', label: 'Standard' },
                  { value: 'SILVER', label: 'Silver' },
                  { value: 'GOLD', label: 'Gold' },
                  { value: 'PLATINUM', label: 'Platinum' },
                  { value: 'COLLECTOR', label: 'Collector' },
                ]}
                value={formData.vipLevel}
                onChange={(e) => setFormData({ ...formData, vipLevel: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Assigned To</label>
            <Select
              options={assignedToOptions}
              value={formData.assignedTo}
              onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
            <Input
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Street address"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
              <Input
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="City"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Postcode</label>
              <Input
                value={formData.postcode}
                onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                placeholder="Postcode"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
            <Textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Add any notes about this customer..."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Customer</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
