'use client'

import { useState } from 'react'
import { Plus, Search, Star, ExternalLink, Phone, Mail } from 'lucide-react'
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

// Mock vendor data
const vendors = [
  {
    id: '1',
    name: 'Patek Philippe SA',
    code: 'PP-001',
    vendorType: 'WATCH_BRAND',
    email: 'retail@patek.com',
    phone: '+41 22 884 20 20',
    country: 'Switzerland',
    categories: ['Luxury Watches', 'Complications'],
    reliabilityScore: 0.98,
    averageLeadDays: 90,
    isApproved: true,
    totalOrders: 45,
    totalSpend: 2850000,
  },
  {
    id: '2',
    name: 'De Beers Diamond Trading',
    code: 'DB-001',
    vendorType: 'STONE_SUPPLIER',
    email: 'trading@debeers.com',
    phone: '+44 20 7430 3434',
    country: 'United Kingdom',
    categories: ['Diamonds', 'Certified Stones'],
    reliabilityScore: 0.95,
    averageLeadDays: 14,
    isApproved: true,
    totalOrders: 128,
    totalSpend: 1450000,
  },
  {
    id: '3',
    name: 'Johnson Matthey',
    code: 'JM-001',
    vendorType: 'METAL_SUPPLIER',
    email: 'precious.metals@matthey.com',
    phone: '+44 20 7269 8000',
    country: 'United Kingdom',
    categories: ['Platinum', 'Gold', 'Precious Metals'],
    reliabilityScore: 0.99,
    averageLeadDays: 3,
    isApproved: true,
    totalOrders: 86,
    totalSpend: 890000,
  },
  {
    id: '4',
    name: 'Cartier International',
    code: 'CT-001',
    vendorType: 'WATCH_BRAND',
    email: 'wholesale@cartier.com',
    phone: '+33 1 42 18 53 00',
    country: 'France',
    categories: ['Luxury Watches', 'Fine Jewelry'],
    reliabilityScore: 0.97,
    averageLeadDays: 45,
    isApproved: true,
    totalOrders: 32,
    totalSpend: 1250000,
  },
  {
    id: '5',
    name: 'Collins Workshop Ltd',
    code: 'CW-001',
    vendorType: 'MANUFACTURER',
    email: 'workshop@collinsltd.co.uk',
    phone: '+44 1234 567890',
    country: 'United Kingdom',
    categories: ['Bespoke Manufacturing', 'Repairs'],
    reliabilityScore: 1.0,
    averageLeadDays: 21,
    isApproved: true,
    totalOrders: 245,
    totalSpend: 680000,
  },
  {
    id: '6',
    name: 'GIA Gemological Services',
    code: 'GIA-001',
    vendorType: 'SERVICE_PROVIDER',
    email: 'grading@gia.edu',
    phone: '+1 760 603 4500',
    country: 'United States',
    categories: ['Certification', 'Grading'],
    reliabilityScore: 1.0,
    averageLeadDays: 10,
    isApproved: true,
    totalOrders: 312,
    totalSpend: 45000,
  },
]

const vendorTypeOptions = [
  { value: '', label: 'All Types' },
  { value: 'MANUFACTURER', label: 'Manufacturer' },
  { value: 'WHOLESALER', label: 'Wholesaler' },
  { value: 'STONE_SUPPLIER', label: 'Stone Supplier' },
  { value: 'METAL_SUPPLIER', label: 'Metal Supplier' },
  { value: 'WATCH_BRAND', label: 'Watch Brand' },
  { value: 'SERVICE_PROVIDER', label: 'Service Provider' },
]

const vendorTypeLabels: Record<string, string> = {
  MANUFACTURER: 'Manufacturer',
  WHOLESALER: 'Wholesaler',
  STONE_SUPPLIER: 'Stone Supplier',
  METAL_SUPPLIER: 'Metal Supplier',
  WATCH_BRAND: 'Watch Brand',
  SERVICE_PROVIDER: 'Service Provider',
}

export default function VendorsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [vendorTypeFilter, setVendorTypeFilter] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    vendorType: 'MANUFACTURER',
    email: '',
    phone: '',
    country: 'United Kingdom',
    categories: '',
    website: '',
    notes: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Creating vendor:', formData)
    setIsModalOpen(false)
    setFormData({
      name: '',
      code: '',
      vendorType: 'MANUFACTURER',
      email: '',
      phone: '',
      country: 'United Kingdom',
      categories: '',
      website: '',
      notes: '',
    })
  }

  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch =
      searchQuery === '' ||
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.code.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = vendorTypeFilter === '' || vendor.vendorType === vendorTypeFilter

    return matchesSearch && matchesType
  })

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Vendors</h1>
          <p className="text-slate-500">Manage suppliers and vendor relationships</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Vendor
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-slate-500">Total Vendors</p>
            <p className="text-2xl font-bold">{vendors.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-slate-500">Approved</p>
            <p className="text-2xl font-bold">{vendors.filter((v) => v.isApproved).length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-slate-500">Avg. Reliability</p>
            <p className="text-2xl font-bold">
              {(
                (vendors.reduce((sum, v) => sum + v.reliabilityScore, 0) / vendors.length) *
                100
              ).toFixed(0)}
              %
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-slate-500">Total Spend (YTD)</p>
            <p className="text-2xl font-bold">
              £{(vendors.reduce((sum, v) => sum + v.totalSpend, 0) / 1000000).toFixed(1)}M
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search vendors..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select
          options={vendorTypeOptions}
          value={vendorTypeFilter}
          onChange={(e) => setVendorTypeFilter(e.target.value)}
          className="w-48"
        />
      </div>

      {/* Vendors Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Categories</TableHead>
                <TableHead>Reliability</TableHead>
                <TableHead>Lead Time</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVendors.map((vendor) => (
                <TableRow key={vendor.id} className="cursor-pointer hover:bg-slate-50">
                  <TableCell>
                    <div>
                      <p className="font-medium">{vendor.name}</p>
                      <p className="text-xs text-slate-500">{vendor.code}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{vendorTypeLabels[vendor.vendorType]}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Mail className="mr-2 h-3 w-3 text-slate-400" />
                        {vendor.email}
                      </div>
                      <div className="flex items-center text-sm text-slate-500">
                        <Phone className="mr-2 h-3 w-3 text-slate-400" />
                        {vendor.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {vendor.categories.slice(0, 2).map((cat) => (
                        <Badge key={cat} variant="secondary" className="text-xs">
                          {cat}
                        </Badge>
                      ))}
                      {vendor.categories.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{vendor.categories.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Star className="mr-1 h-4 w-4 text-amber-500 fill-amber-500" />
                      <span>{(vendor.reliabilityScore * 100).toFixed(0)}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{vendor.averageLeadDays} days</TableCell>
                  <TableCell>{vendor.totalOrders}</TableCell>
                  <TableCell>
                    <Badge variant={vendor.isApproved ? 'success' : 'warning'}>
                      {vendor.isApproved ? 'Approved' : 'Pending'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Vendor Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Vendor" size="lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Vendor Name *</label>
              <Input
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Patek Philippe SA"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Vendor Code *</label>
              <Input
                required
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="e.g., PP-001"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Vendor Type *</label>
              <Select
                options={vendorTypeOptions.filter(o => o.value !== '')}
                value={formData.vendorType}
                onChange={(e) => setFormData({ ...formData, vendorType: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Country</label>
              <Select
                options={[
                  { value: 'United Kingdom', label: 'United Kingdom' },
                  { value: 'Switzerland', label: 'Switzerland' },
                  { value: 'France', label: 'France' },
                  { value: 'Germany', label: 'Germany' },
                  { value: 'United States', label: 'United States' },
                  { value: 'Italy', label: 'Italy' },
                ]}
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
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
                placeholder="contact@vendor.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+44 20 1234 5678"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Website</label>
            <Input
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              placeholder="https://vendor.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Categories (comma separated)</label>
            <Input
              value={formData.categories}
              onChange={(e) => setFormData({ ...formData, categories: e.target.value })}
              placeholder="e.g., Luxury Watches, Complications"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
            <Textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Additional information about this vendor..."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Vendor</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
