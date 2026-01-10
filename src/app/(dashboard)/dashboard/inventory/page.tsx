'use client'

import { useState } from 'react'
import { Plus, Search, Package, AlertTriangle, Archive, CheckCircle } from 'lucide-react'
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
import { formatCurrency } from '@/lib/utils'

// Real product data from G. Collins & Sons website
const products = [
  {
    id: '1',
    sku: '00038359',
    name: '1.87cts Round Brilliant Cut Diamond Ravello Cluster Ring',
    productType: 'FINISHED_JEWELRY',
    category: 'Engagement Rings',
    collection: 'Ravello',
    price: 38286,
    costPrice: 22000,
    metalType: 'PLATINUM',
    metalPurity: '950',
    status: 'ACTIVE',
    stockQty: 1,
    location: 'Showroom',
  },
  {
    id: '2',
    sku: '00021022',
    name: '3.50ct Cushion Cut Diamond Engagement Ring',
    productType: 'FINISHED_JEWELRY',
    category: 'Engagement Rings',
    collection: null,
    price: 72264,
    costPrice: 45000,
    metalType: 'PLATINUM',
    metalPurity: '950',
    status: 'ACTIVE',
    stockQty: 1,
    location: 'Vault',
  },
  {
    id: '3',
    sku: '00015073',
    name: '5.01ct Emerald Cut Diamond Three Stone Ring',
    productType: 'FINISHED_JEWELRY',
    category: 'Engagement Rings',
    collection: null,
    price: 184590,
    costPrice: 120000,
    metalType: 'PLATINUM',
    metalPurity: '950',
    status: 'ACTIVE',
    stockQty: 1,
    location: 'Vault',
  },
  {
    id: '4',
    sku: '00035023',
    name: '5.30ct Radiant Cut Yellow Diamond Engagement Ring',
    productType: 'FINISHED_JEWELRY',
    category: 'Engagement Rings',
    collection: null,
    price: 250222,
    costPrice: 175000,
    metalType: 'YELLOW_GOLD',
    metalPurity: '18ct',
    status: 'ACTIVE',
    stockQty: 1,
    location: 'Vault',
  },
  {
    id: '5',
    sku: 'PP-5811/1G-001',
    name: 'Patek Philippe Nautilus 5811/1G-001',
    productType: 'WATCH',
    category: 'Watches',
    collection: 'Nautilus',
    price: 87072,
    costPrice: 65000,
    metalType: 'WHITE_GOLD',
    metalPurity: '18ct',
    status: 'ACTIVE',
    stockQty: 1,
    location: 'Showroom',
  },
  {
    id: '6',
    sku: 'PP-6300/401G-001',
    name: 'Patek Philippe Grand Complications 6300/401G-001',
    productType: 'WATCH',
    category: 'Watches',
    collection: 'Grand Complications',
    price: 5371681,
    costPrice: 4500000,
    metalType: 'WHITE_GOLD',
    metalPurity: '18ct',
    status: 'ACTIVE',
    stockQty: 1,
    location: 'Vault',
  },
  {
    id: '7',
    sku: '00045678',
    name: '11.78cts Round Brilliant Cut Diamond Line Bracelet',
    productType: 'FINISHED_JEWELRY',
    category: 'Bracelets & Bangles',
    collection: null,
    price: 71102,
    costPrice: 48000,
    metalType: 'WHITE_GOLD',
    metalPurity: '18ct',
    status: 'ACTIVE',
    stockQty: 1,
    location: 'Showroom',
  },
  {
    id: '8',
    sku: '00056789',
    name: '3.02ct Cushion Cut Diamond Drop Earrings',
    productType: 'FINISHED_JEWELRY',
    category: 'Earrings',
    collection: null,
    price: 72469,
    costPrice: 50000,
    metalType: 'PLATINUM',
    metalPurity: '950',
    status: 'ACTIVE',
    stockQty: 1,
    location: 'Vault',
  },
  {
    id: '9',
    sku: '00067890',
    name: 'Sienna Collection Diamond Set 18ct Rose Gold Bangle',
    productType: 'FINISHED_JEWELRY',
    category: 'Bracelets & Bangles',
    collection: 'Sienna',
    price: 35825,
    costPrice: 22000,
    metalType: 'ROSE_GOLD',
    metalPurity: '18ct',
    status: 'ACTIVE',
    stockQty: 2,
    location: 'Showroom',
  },
  {
    id: '10',
    sku: '00078901',
    name: '0.50ct Emerald Cut Diamond Pendant',
    productType: 'FINISHED_JEWELRY',
    category: 'Necklaces & Pendants',
    collection: null,
    price: 7726,
    costPrice: 4500,
    metalType: 'WHITE_GOLD',
    metalPurity: '18ct',
    status: 'OUT_OF_STOCK',
    stockQty: 0,
    location: 'N/A',
  },
]

const productTypeOptions = [
  { value: '', label: 'All Types' },
  { value: 'FINISHED_JEWELRY', label: 'Finished Jewelry' },
  { value: 'WATCH', label: 'Watches' },
  { value: 'LOOSE_STONE', label: 'Loose Stones' },
  { value: 'ANTIQUE', label: 'Antique' },
]

const statusOptions = [
  { value: '', label: 'All Statuses' },
  { value: 'ACTIVE', label: 'Active' },
  { value: 'OUT_OF_STOCK', label: 'Out of Stock' },
  { value: 'DRAFT', label: 'Draft' },
  { value: 'ARCHIVED', label: 'Archived' },
]

const categoryOptions = [
  { value: '', label: 'All Categories' },
  { value: 'Engagement Rings', label: 'Engagement Rings' },
  { value: 'Watches', label: 'Watches' },
  { value: 'Earrings', label: 'Earrings' },
  { value: 'Bracelets & Bangles', label: 'Bracelets & Bangles' },
  { value: 'Necklaces & Pendants', label: 'Necklaces & Pendants' },
  { value: 'Dress Rings', label: 'Dress Rings' },
]

const statusColors: Record<string, 'success' | 'destructive' | 'warning' | 'secondary'> = {
  ACTIVE: 'success',
  OUT_OF_STOCK: 'destructive',
  DRAFT: 'secondary',
  ARCHIVED: 'warning',
}

const metalTypeLabels: Record<string, string> = {
  PLATINUM: 'Platinum',
  YELLOW_GOLD: 'Yellow Gold',
  WHITE_GOLD: 'White Gold',
  ROSE_GOLD: 'Rose Gold',
  STERLING_SILVER: 'Sterling Silver',
}

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [productTypeFilter, setProductTypeFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      searchQuery === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = productTypeFilter === '' || product.productType === productTypeFilter
    const matchesStatus = statusFilter === '' || product.status === statusFilter
    const matchesCategory = categoryFilter === '' || product.category === categoryFilter

    return matchesSearch && matchesType && matchesStatus && matchesCategory
  })

  const totalValue = products.reduce((sum, p) => sum + (p.price || 0) * p.stockQty, 0)
  const inStock = products.filter((p) => p.stockQty > 0).length
  const outOfStock = products.filter((p) => p.stockQty === 0).length
  const lowStock = products.filter((p) => p.stockQty > 0 && p.stockQty <= 2).length

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold">Inventory</h1>
          <p className="text-sm lg:text-base text-slate-500">Manage products and stock levels</p>
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 lg:gap-4 lg:grid-cols-4">
        <Card>
          <CardContent className="p-3 lg:p-4">
            <div className="flex items-center space-x-2">
              <Package className="h-4 w-4 lg:h-5 lg:w-5 text-blue-500" />
              <p className="text-xs lg:text-sm text-slate-500">Total Products</p>
            </div>
            <p className="mt-1 lg:mt-2 text-xl lg:text-2xl font-bold">1,702</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 lg:p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 lg:h-5 lg:w-5 text-green-500" />
              <p className="text-xs lg:text-sm text-slate-500">In Stock</p>
            </div>
            <p className="mt-1 lg:mt-2 text-xl lg:text-2xl font-bold">984</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 lg:p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 lg:h-5 lg:w-5 text-amber-500" />
              <p className="text-xs lg:text-sm text-slate-500">Low Stock</p>
            </div>
            <p className="mt-1 lg:mt-2 text-xl lg:text-2xl font-bold">{lowStock}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 lg:p-4">
            <div className="flex items-center space-x-2">
              <Archive className="h-4 w-4 lg:h-5 lg:w-5 text-slate-500" />
              <p className="text-xs lg:text-sm text-slate-500">Total Value</p>
            </div>
            <p className="mt-1 lg:mt-2 text-xl lg:text-2xl font-bold">{formatCurrency(totalValue)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search by name or SKU..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select
          options={categoryOptions}
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-44"
        />
        <Select
          options={productTypeOptions}
          value={productTypeFilter}
          onChange={(e) => setProductTypeFilter(e.target.value)}
          className="w-40"
        />
        <Select
          options={statusOptions}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-36"
        />
      </div>

      {/* Products Table - Desktop */}
      <Card className="hidden lg:block">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Metal</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id} className="cursor-pointer hover:bg-slate-50">
                  <TableCell>
                    <div className="max-w-md">
                      <p className="font-medium truncate">{product.name}</p>
                      {product.collection && (
                        <p className="text-xs text-slate-500">{product.collection} Collection</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{product.sku}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    {product.metalType && (
                      <span className="text-sm">
                        {metalTypeLabels[product.metalType]} {product.metalPurity}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">
                    {product.price ? formatCurrency(product.price) : 'POA'}
                  </TableCell>
                  <TableCell>
                    <span
                      className={
                        product.stockQty === 0
                          ? 'text-red-600'
                          : product.stockQty <= 2
                            ? 'text-amber-600'
                            : ''
                      }
                    >
                      {product.stockQty}
                    </span>
                  </TableCell>
                  <TableCell>{product.location}</TableCell>
                  <TableCell>
                    <Badge variant={statusColors[product.status]}>{product.status.replace('_', ' ')}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Product Cards - Mobile */}
      <div className="space-y-3 lg:hidden">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="cursor-pointer active:bg-slate-50">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0 pr-2">
                  <p className="font-medium text-sm truncate">{product.name}</p>
                  <p className="text-xs text-slate-500 font-mono">{product.sku}</p>
                </div>
                <Badge variant={statusColors[product.status]} className="text-xs flex-shrink-0">
                  {product.status.replace('_', ' ')}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-slate-500">Price</p>
                  <p className="font-medium">{product.price ? formatCurrency(product.price) : 'POA'}</p>
                </div>
                <div>
                  <p className="text-slate-500">Stock</p>
                  <p className={`font-medium ${product.stockQty === 0 ? 'text-red-600' : product.stockQty <= 2 ? 'text-amber-600' : ''}`}>
                    {product.stockQty} in {product.location}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
