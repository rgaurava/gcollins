'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Plus, Search, Grid, List, Heart, Eye, Edit, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select } from '@/components/ui/select'
import { Modal } from '@/components/ui/modal'
import { Textarea } from '@/components/ui/textarea'
import { formatCurrency } from '@/lib/utils'

// Rich product data from G. Collins & Sons
const products = [
  {
    id: '1',
    sku: '00038359',
    name: '1.87cts Round Brilliant Cut Diamond Ravello Cluster Ring',
    category: 'Engagement Rings',
    collection: 'Ravello',
    price: 38286,
    metalType: 'Platinum 950',
    mainStone: 'Diamond',
    caratWeight: '1.87ct',
    cut: 'Round Brilliant',
    color: 'F',
    clarity: 'VS1',
    certification: 'GIA',
    status: 'ACTIVE',
    featured: true,
    imageUrl: 'https://gcollinsandsons.com/cdn/shop/files/48171.png?v=1766589839',
  },
  {
    id: '2',
    sku: '00021022',
    name: '3.50ct Cushion Cut Diamond Engagement Ring',
    category: 'Engagement Rings',
    collection: 'Eleanor Setting',
    price: 72264,
    metalType: 'Platinum 950',
    mainStone: 'Diamond',
    caratWeight: '3.50ct',
    cut: 'Cushion',
    color: 'G',
    clarity: 'VS2',
    certification: 'GIA',
    status: 'ACTIVE',
    featured: true,
    imageUrl: 'https://gcollinsandsons.com/cdn/shop/files/48165.png?v=1766418627',
  },
  {
    id: '3',
    sku: '00015073',
    name: '5.01ct Emerald Cut Diamond Three Stone Ring',
    category: 'Engagement Rings',
    collection: null,
    price: 184590,
    metalType: 'Platinum 950',
    mainStone: 'Diamond',
    caratWeight: '5.01ct',
    cut: 'Emerald',
    color: 'E',
    clarity: 'VVS2',
    certification: 'GIA',
    status: 'ACTIVE',
    featured: true,
    imageUrl: 'https://gcollinsandsons.com/cdn/shop/files/48356.png?v=1767783472',
  },
  {
    id: '4',
    sku: '00035023',
    name: '5.30ct Radiant Cut Yellow Diamond Engagement Ring',
    category: 'Engagement Rings',
    collection: null,
    price: 250222,
    metalType: '18ct Yellow Gold',
    mainStone: 'Yellow Diamond',
    caratWeight: '5.30ct',
    cut: 'Radiant',
    color: 'Fancy Intense Yellow',
    clarity: 'VS1',
    certification: 'GIA',
    status: 'ACTIVE',
    featured: true,
    imageUrl: 'https://gcollinsandsons.com/cdn/shop/files/48127.png?v=1765644266',
  },
  {
    id: '5',
    sku: '00045678',
    name: '11.78cts Round Brilliant Cut Diamond Line Bracelet',
    category: 'Bracelets & Bangles',
    collection: null,
    price: 71102,
    metalType: '18ct White Gold',
    mainStone: 'Diamond',
    caratWeight: '11.78ct',
    cut: 'Round Brilliant',
    color: 'F-G',
    clarity: 'VS',
    certification: 'GIA',
    status: 'ACTIVE',
    featured: false,
    imageUrl: 'https://gcollinsandsons.com/cdn/shop/files/46568.png?v=1764584768',
  },
  {
    id: '6',
    sku: '00056789',
    name: '3.02ct Cushion Cut Diamond Drop Earrings',
    category: 'Earrings',
    collection: null,
    price: 72469,
    metalType: 'Platinum 950',
    mainStone: 'Diamond',
    caratWeight: '3.02ct',
    cut: 'Cushion',
    color: 'E',
    clarity: 'VS1',
    certification: 'GIA',
    status: 'ACTIVE',
    featured: false,
    imageUrl: 'https://gcollinsandsons.com/cdn/shop/files/48446.png?v=1767782565',
  },
  {
    id: '7',
    sku: '00067890',
    name: 'Sienna Collection Diamond Set 18ct Rose Gold Bangle',
    category: 'Bracelets & Bangles',
    collection: 'Sienna',
    price: 35825,
    metalType: '18ct Rose Gold',
    mainStone: 'Diamond',
    caratWeight: '0.85ct',
    cut: 'Round Brilliant',
    color: 'F',
    clarity: 'VS',
    certification: null,
    status: 'ACTIVE',
    featured: true,
    imageUrl: 'https://gcollinsandsons.com/cdn/shop/files/48125_1.png?v=1765892832',
  },
  {
    id: '8',
    sku: '00078901',
    name: '0.50ct Emerald Cut Diamond Pendant',
    category: 'Necklaces & Pendants',
    collection: null,
    price: 7726,
    metalType: '18ct White Gold',
    mainStone: 'Diamond',
    caratWeight: '0.50ct',
    cut: 'Emerald',
    color: 'F',
    clarity: 'VS1',
    certification: 'GIA',
    status: 'ACTIVE',
    featured: false,
    imageUrl: 'https://gcollinsandsons.com/cdn/shop/files/48123.png?v=1765625986',
  },
  {
    id: '9',
    sku: '00089012',
    name: '1.29ct Emerald Drop Earrings',
    category: 'Earrings',
    collection: null,
    price: 13605,
    metalType: '18ct White Gold',
    mainStone: 'Emerald',
    caratWeight: '1.29ct',
    cut: 'Pear',
    color: 'Vivid Green',
    clarity: 'Eye Clean',
    certification: 'Gübelin',
    status: 'ACTIVE',
    featured: false,
    imageUrl: 'https://gcollinsandsons.com/cdn/shop/files/48069.png?v=1766245560',
  },
  {
    id: '10',
    sku: '00090123',
    name: 'Trefoil Collection 2.25cts Diamond Platinum Bangle',
    category: 'Bracelets & Bangles',
    collection: 'Trefoil',
    price: 44029,
    metalType: 'Platinum 950',
    mainStone: 'Diamond',
    caratWeight: '2.25ct',
    cut: 'Round Brilliant',
    color: 'E-F',
    clarity: 'VVS',
    certification: null,
    status: 'ACTIVE',
    featured: true,
    imageUrl: 'https://gcollinsandsons.com/cdn/shop/files/48029.png?v=1764582287',
  },
  {
    id: '11',
    sku: '00101234',
    name: '1.05cts Round Brilliant Cut Diamond Stud Earrings',
    category: 'Earrings',
    collection: null,
    price: 6837,
    metalType: '18ct White Gold',
    mainStone: 'Diamond',
    caratWeight: '1.05ct',
    cut: 'Round Brilliant',
    color: 'F',
    clarity: 'VS1',
    certification: 'GIA',
    status: 'ACTIVE',
    featured: false,
    imageUrl: 'https://gcollinsandsons.com/cdn/shop/files/47738.png?v=1762255343',
  },
  {
    id: '12',
    sku: '00112345',
    name: 'Infinity Collection 18ct Rose Gold Diamond Bracelet',
    category: 'Bracelets & Bangles',
    collection: 'Infinity',
    price: 37739,
    metalType: '18ct Rose Gold',
    mainStone: 'Diamond',
    caratWeight: '1.50ct',
    cut: 'Round Brilliant',
    color: 'F-G',
    clarity: 'VS',
    certification: null,
    status: 'ACTIVE',
    featured: true,
    imageUrl: 'https://gcollinsandsons.com/cdn/shop/files/Screenshot2023-03-22at22.21.38.png?v=1766243977',
  },
]

const categoryOptions = [
  { value: '', label: 'All Categories' },
  { value: 'Engagement Rings', label: 'Engagement Rings' },
  { value: 'Earrings', label: 'Earrings' },
  { value: 'Bracelets & Bangles', label: 'Bracelets & Bangles' },
  { value: 'Necklaces & Pendants', label: 'Necklaces & Pendants' },
  { value: 'Dress Rings', label: 'Dress Rings' },
]

const collectionOptions = [
  { value: '', label: 'All Collections' },
  { value: 'Ravello', label: 'Ravello' },
  { value: 'Sienna', label: 'Sienna' },
  { value: 'Skyline', label: 'Skyline' },
  { value: 'Trefoil', label: 'Trefoil' },
  { value: 'Infinity', label: 'Infinity' },
  { value: 'Eleanor Setting', label: 'Eleanor Setting' },
]

const metalOptions = [
  { value: '', label: 'All Metals' },
  { value: 'Platinum', label: 'Platinum' },
  { value: 'Yellow Gold', label: 'Yellow Gold' },
  { value: 'White Gold', label: 'White Gold' },
  { value: 'Rose Gold', label: 'Rose Gold' },
]

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [collectionFilter, setCollectionFilter] = useState('')
  const [metalFilter, setMetalFilter] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    category: 'Engagement Rings',
    collection: '',
    price: '',
    metalType: 'Platinum 950',
    mainStone: 'Diamond',
    caratWeight: '',
    cut: '',
    color: '',
    clarity: '',
    certification: 'GIA',
    description: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Creating product:', formData)
    setIsModalOpen(false)
    setFormData({
      sku: '',
      name: '',
      category: 'Engagement Rings',
      collection: '',
      price: '',
      metalType: 'Platinum 950',
      mainStone: 'Diamond',
      caratWeight: '',
      cut: '',
      color: '',
      clarity: '',
      certification: 'GIA',
      description: '',
    })
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      searchQuery === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = categoryFilter === '' || product.category === categoryFilter
    const matchesCollection = collectionFilter === '' || product.collection === collectionFilter
    const matchesMetal = metalFilter === '' || product.metalType.includes(metalFilter)

    return matchesSearch && matchesCategory && matchesCollection && matchesMetal
  })

  const totalValue = products.reduce((sum, p) => sum + p.price, 0)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-slate-500">Fine jewelry catalog - {products.length} items valued at {formatCurrency(totalValue)}</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search products..."
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
          options={collectionOptions}
          value={collectionFilter}
          onChange={(e) => setCollectionFilter(e.target.value)}
          className="w-40"
        />
        <Select
          options={metalOptions}
          value={metalFilter}
          onChange={(e) => setMetalFilter(e.target.value)}
          className="w-36"
        />
        <div className="flex border rounded-md">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="icon"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="icon"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Products Grid */}
      {viewMode === 'grid' ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative aspect-square bg-slate-100">
                {product.imageUrl ? (
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-contain p-2"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                    <div className="text-center p-4">
                      <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-slate-200 flex items-center justify-center">
                        <Star className="h-8 w-8 text-slate-400" />
                      </div>
                      <p className="text-xs">{product.category}</p>
                    </div>
                  </div>
                )}
                {product.featured && (
                  <Badge className="absolute top-2 left-2 bg-amber-500 z-10">Featured</Badge>
                )}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 z-10">
                  <Button size="icon" variant="secondary" className="h-8 w-8">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="secondary" className="h-8 w-8">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="secondary" className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <p className="text-xs text-slate-500">{product.sku}</p>
                  <h3 className="font-medium text-sm line-clamp-2">{product.name}</h3>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs">{product.metalType}</Badge>
                    {product.collection && (
                      <Badge variant="secondary" className="text-xs">{product.collection}</Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <p className="font-bold text-lg">{formatCurrency(product.price)}</p>
                    {product.certification && (
                      <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                        {product.certification}
                      </Badge>
                    )}
                  </div>
                  <div className="text-xs text-slate-500 space-y-1 pt-2 border-t">
                    <p><span className="font-medium">Stone:</span> {product.mainStone} {product.caratWeight}</p>
                    <p><span className="font-medium">Cut:</span> {product.cut} | <span className="font-medium">Color:</span> {product.color}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <table className="w-full">
              <thead className="border-b bg-slate-50">
                <tr>
                  <th className="text-left p-4 font-medium">Product</th>
                  <th className="text-left p-4 font-medium">Category</th>
                  <th className="text-left p-4 font-medium">Stone Details</th>
                  <th className="text-left p-4 font-medium">Metal</th>
                  <th className="text-left p-4 font-medium">Certification</th>
                  <th className="text-right p-4 font-medium">Price</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-slate-50 cursor-pointer">
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-xs text-slate-500">{product.sku}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <p>{product.category}</p>
                        {product.collection && (
                          <p className="text-xs text-slate-500">{product.collection} Collection</p>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <p>{product.mainStone} {product.caratWeight}</p>
                      <p className="text-xs text-slate-500">{product.cut} | {product.color} | {product.clarity}</p>
                    </td>
                    <td className="p-4">{product.metalType}</td>
                    <td className="p-4">
                      {product.certification ? (
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {product.certification}
                        </Badge>
                      ) : '-'}
                    </td>
                    <td className="p-4 text-right font-bold">{formatCurrency(product.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {/* Add Product Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Product" size="lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">SKU *</label>
              <Input
                required
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                placeholder="e.g., 00038359"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Category *</label>
              <Select
                options={categoryOptions.filter(o => o.value !== '')}
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Product Name *</label>
            <Input
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., 1.87cts Round Brilliant Cut Diamond Ring"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Collection</label>
              <Select
                options={collectionOptions}
                value={formData.collection}
                onChange={(e) => setFormData({ ...formData, collection: e.target.value })}
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Metal Type</label>
              <Select
                options={[
                  { value: 'Platinum 950', label: 'Platinum 950' },
                  { value: '18ct White Gold', label: '18ct White Gold' },
                  { value: '18ct Yellow Gold', label: '18ct Yellow Gold' },
                  { value: '18ct Rose Gold', label: '18ct Rose Gold' },
                ]}
                value={formData.metalType}
                onChange={(e) => setFormData({ ...formData, metalType: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Main Stone</label>
              <Select
                options={[
                  { value: 'Diamond', label: 'Diamond' },
                  { value: 'Emerald', label: 'Emerald' },
                  { value: 'Sapphire', label: 'Sapphire' },
                  { value: 'Ruby', label: 'Ruby' },
                  { value: 'Pearl', label: 'Pearl' },
                ]}
                value={formData.mainStone}
                onChange={(e) => setFormData({ ...formData, mainStone: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Carat Weight</label>
              <Input
                value={formData.caratWeight}
                onChange={(e) => setFormData({ ...formData, caratWeight: e.target.value })}
                placeholder="e.g., 1.87ct"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Cut</label>
              <Input
                value={formData.cut}
                onChange={(e) => setFormData({ ...formData, cut: e.target.value })}
                placeholder="e.g., Round Brilliant"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Color</label>
              <Input
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                placeholder="e.g., F"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Clarity</label>
              <Input
                value={formData.clarity}
                onChange={(e) => setFormData({ ...formData, clarity: e.target.value })}
                placeholder="e.g., VS1"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Certification</label>
            <Select
              options={[
                { value: '', label: 'None' },
                { value: 'GIA', label: 'GIA' },
                { value: 'IGI', label: 'IGI' },
                { value: 'HRD', label: 'HRD' },
                { value: 'Gübelin', label: 'Gübelin' },
              ]}
              value={formData.certification}
              onChange={(e) => setFormData({ ...formData, certification: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Product description..."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Product</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
