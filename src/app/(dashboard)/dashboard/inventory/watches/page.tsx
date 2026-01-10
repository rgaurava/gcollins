'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Plus, Search, Watch, Clock, Award, Shield, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select } from '@/components/ui/select'
import { Modal } from '@/components/ui/modal'
import { Textarea } from '@/components/ui/textarea'
import { formatCurrency, formatDate } from '@/lib/utils'

// Real Patek Philippe watch data from G. Collins & Sons website
const watches = [
  {
    id: '1',
    sku: 'PP-6300/401G-001',
    referenceNumber: '6300/401G-001',
    name: 'Patek Philippe Grandmaster Chime',
    brand: 'PATEK_PHILIPPE',
    collection: 'Grand Complications',
    price: 5371681,
    movement: 'Manual',
    caliber: '300 GS AL 36-750 QIS FUS IRM',
    powerReserve: 72,
    caseMaterial: '18ct White Gold',
    caseSize: 47.7,
    dialColor: 'Blue/Ebony',
    complications: ['Minute Repeater', 'Grande Sonnerie', 'Petite Sonnerie', 'Alarm', 'Second Time Zone', 'Perpetual Calendar'],
    waterResistance: 30,
    hasBox: true,
    hasPapers: true,
    warrantyEnd: new Date('2030-06-15'),
    status: 'AVAILABLE',
    location: 'Vault',
    imageUrl: 'https://gcollinsandsons.com/cdn/shop/products/6300_401G_001_1_2x_67d47410-7fa1-4648-b64a-64be95af1a99.jpg',
  },
  {
    id: '2',
    sku: 'PP-5811/1G-001',
    referenceNumber: '5811/1G-001',
    name: 'Patek Philippe Nautilus',
    brand: 'PATEK_PHILIPPE',
    collection: 'Nautilus',
    price: 87072,
    movement: 'Automatic',
    caliber: '26-330 S C',
    powerReserve: 45,
    caseMaterial: '18ct White Gold',
    caseSize: 41.0,
    dialColor: 'Blue Gradient',
    complications: ['Date', 'Sweep Seconds'],
    waterResistance: 120,
    hasBox: true,
    hasPapers: true,
    warrantyEnd: new Date('2028-03-20'),
    status: 'AVAILABLE',
    location: 'Showroom',
    imageUrl: 'https://gcollinsandsons.com/cdn/shop/products/5811_1G_001_1_2x_8e264d3e-1c03-4152-83a8-0516d04c33ce.jpg',
  },
  {
    id: '3',
    sku: 'PP-5167A-001',
    referenceNumber: '5167A-001',
    name: 'Patek Philippe Aquanaut',
    brand: 'PATEK_PHILIPPE',
    collection: 'Aquanaut',
    price: 28988,
    movement: 'Automatic',
    caliber: '324 S C',
    powerReserve: 45,
    caseMaterial: 'Stainless Steel',
    caseSize: 40.0,
    dialColor: 'Black Embossed',
    complications: ['Date', 'Sweep Seconds'],
    waterResistance: 120,
    hasBox: true,
    hasPapers: true,
    warrantyEnd: new Date('2027-11-10'),
    status: 'AVAILABLE',
    location: 'Showroom',
    imageUrl: 'https://gcollinsandsons.com/cdn/shop/products/5167R_001_1_2x_4263b65f-86a2-4937-ae3a-090826475c2b.jpg',
  },
  {
    id: '4',
    sku: 'PP-5227R-001',
    referenceNumber: '5227R-001',
    name: 'Patek Philippe Calatrava',
    brand: 'PATEK_PHILIPPE',
    collection: 'Calatrava',
    price: 50099,
    movement: 'Automatic',
    caliber: '324 S C',
    powerReserve: 45,
    caseMaterial: '18ct Rose Gold',
    caseSize: 39.0,
    dialColor: 'White Lacquered',
    complications: ['Sweep Seconds'],
    waterResistance: 30,
    hasBox: true,
    hasPapers: true,
    warrantyEnd: new Date('2028-08-05'),
    status: 'AVAILABLE',
    location: 'Showroom',
    imageUrl: 'https://gcollinsandsons.com/cdn/shop/products/5227R_001_1_2x_3ff667a0-8f8a-499e-91ca-62bd940211ee.jpg',
  },
  {
    id: '5',
    sku: 'PP-5270/1R-001',
    referenceNumber: '5270/1R-001',
    name: 'Patek Philippe Perpetual Calendar Chronograph',
    brand: 'PATEK_PHILIPPE',
    collection: 'Grand Complications',
    price: 279018,
    movement: 'Manual',
    caliber: 'CH 29-535 PS Q',
    powerReserve: 65,
    caseMaterial: '18ct Rose Gold',
    caseSize: 41.0,
    dialColor: 'Salmon',
    complications: ['Perpetual Calendar', 'Chronograph', 'Moon Phase', 'Day/Night'],
    waterResistance: 30,
    hasBox: true,
    hasPapers: true,
    warrantyEnd: new Date('2029-01-22'),
    status: 'AVAILABLE',
    location: 'Vault',
    imageUrl: 'https://gcollinsandsons.com/cdn/shop/products/5271_12P_010_1_2x_7a028983-749a-4097-949a-795c52bd96af.jpg',
  },
  {
    id: '6',
    sku: 'PP-4910/1200A-011',
    referenceNumber: '4910/1200A-011',
    name: 'Patek Philippe Twenty~4',
    brand: 'PATEK_PHILIPPE',
    collection: 'Twenty~4',
    price: 19047,
    movement: 'Quartz',
    caliber: 'E15',
    powerReserve: null,
    caseMaterial: 'Stainless Steel',
    caseSize: 25.1,
    dialColor: 'Olive Green Sunburst',
    complications: [],
    waterResistance: 30,
    hasBox: true,
    hasPapers: true,
    warrantyEnd: new Date('2027-05-18'),
    status: 'AVAILABLE',
    location: 'Showroom',
    imageUrl: 'https://gcollinsandsons.com/cdn/shop/products/4910_1200A_011_1_2x_eeb0091a-ff32-40e6-b4f8-e6c33eec8bf1.jpg',
  },
  {
    id: '7',
    sku: 'PP-5738P-001',
    referenceNumber: '5738P-001',
    name: 'Patek Philippe Golden Ellipse',
    brand: 'PATEK_PHILIPPE',
    collection: 'Golden Ellipse',
    price: 69830,
    movement: 'Automatic',
    caliber: '240',
    powerReserve: 48,
    caseMaterial: 'Platinum 950',
    caseSize: 34.5,
    dialColor: 'Blue Sunburst',
    complications: [],
    waterResistance: 30,
    hasBox: true,
    hasPapers: true,
    warrantyEnd: new Date('2028-09-30'),
    status: 'AVAILABLE',
    location: 'Showroom',
    imageUrl: 'https://gcollinsandsons.com/cdn/shop/files/Golden-Ellipse-5738P-001.jpg',
  },
  {
    id: '8',
    sku: 'PP-7041R-001',
    referenceNumber: '7041R-001',
    name: 'Patek Philippe Gondolo',
    brand: 'PATEK_PHILIPPE',
    collection: 'Gondolo',
    price: 44986,
    movement: 'Manual',
    caliber: '215 PS',
    powerReserve: 44,
    caseMaterial: '18ct Rose Gold',
    caseSize: 30.0,
    dialColor: 'White Opaline',
    complications: ['Small Seconds'],
    waterResistance: 30,
    hasBox: true,
    hasPapers: true,
    warrantyEnd: new Date('2027-12-12'),
    status: 'AVAILABLE',
    location: 'Showroom',
    imageUrl: 'https://gcollinsandsons.com/cdn/shop/products/5204G_001_1_2x_36054ff7-e33b-4b64-b4aa-183265526c68.jpg',
  },
  {
    id: '9',
    sku: 'PP-5935A-001',
    referenceNumber: '5935A-001',
    name: 'Patek Philippe World Time Flyback Chronograph',
    brand: 'PATEK_PHILIPPE',
    collection: 'Complications',
    price: 76038,
    movement: 'Automatic',
    caliber: 'CH 28-520 HU',
    powerReserve: 55,
    caseMaterial: 'Stainless Steel',
    caseSize: 41.0,
    dialColor: 'Blue',
    complications: ['World Time', 'Flyback Chronograph'],
    waterResistance: 30,
    hasBox: true,
    hasPapers: true,
    warrantyEnd: new Date('2029-04-08'),
    status: 'RESERVED',
    location: 'Vault',
    imageUrl: 'https://gcollinsandsons.com/cdn/shop/products/7300_1200A_011_1_2x_3009d4af-ecf4-479d-b2fb-01cf6729ea82.jpg',
  },
  {
    id: '10',
    sku: 'PP-5212A-001',
    referenceNumber: '5212A-001',
    name: 'Patek Philippe Calatrava Weekly Calendar',
    brand: 'PATEK_PHILIPPE',
    collection: 'Complications',
    price: 45820,
    movement: 'Automatic',
    caliber: '26-330 S C J SE',
    powerReserve: 45,
    caseMaterial: 'Stainless Steel',
    caseSize: 40.0,
    dialColor: 'Blue Opaline',
    complications: ['Weekly Calendar', 'Date'],
    waterResistance: 30,
    hasBox: true,
    hasPapers: true,
    warrantyEnd: new Date('2028-02-28'),
    status: 'AVAILABLE',
    location: 'Showroom',
    imageUrl: 'https://gcollinsandsons.com/cdn/shop/products/7118_1200A_011_1_2x_f87fce0f-7e5f-47a0-b22f-2bf072e2ff23.jpg',
  },
]

const collectionOptions = [
  { value: '', label: 'All Collections' },
  { value: 'Grand Complications', label: 'Grand Complications' },
  { value: 'Complications', label: 'Complications' },
  { value: 'Nautilus', label: 'Nautilus' },
  { value: 'Aquanaut', label: 'Aquanaut' },
  { value: 'Calatrava', label: 'Calatrava' },
  { value: 'Twenty~4', label: 'Twenty~4' },
  { value: 'Golden Ellipse', label: 'Golden Ellipse' },
  { value: 'Gondolo', label: 'Gondolo' },
]

const movementOptions = [
  { value: '', label: 'All Movements' },
  { value: 'Automatic', label: 'Automatic' },
  { value: 'Manual', label: 'Manual' },
  { value: 'Quartz', label: 'Quartz' },
]

const materialOptions = [
  { value: '', label: 'All Materials' },
  { value: 'Stainless Steel', label: 'Stainless Steel' },
  { value: 'Rose Gold', label: 'Rose Gold' },
  { value: 'White Gold', label: 'White Gold' },
  { value: 'Platinum', label: 'Platinum' },
]

const statusColors: Record<string, 'success' | 'warning' | 'secondary'> = {
  AVAILABLE: 'success',
  RESERVED: 'warning',
  SOLD: 'secondary',
}

export default function WatchesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [collectionFilter, setCollectionFilter] = useState('')
  const [movementFilter, setMovementFilter] = useState('')
  const [materialFilter, setMaterialFilter] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    referenceNumber: '',
    name: '',
    collection: 'Nautilus',
    price: '',
    movement: 'Automatic',
    caliber: '',
    powerReserve: '',
    caseMaterial: 'Stainless Steel',
    caseSize: '',
    dialColor: '',
    waterResistance: '30',
    hasBox: true,
    hasPapers: true,
    location: 'Showroom',
    notes: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Creating watch:', formData)
    setIsModalOpen(false)
    setFormData({
      referenceNumber: '',
      name: '',
      collection: 'Nautilus',
      price: '',
      movement: 'Automatic',
      caliber: '',
      powerReserve: '',
      caseMaterial: 'Stainless Steel',
      caseSize: '',
      dialColor: '',
      waterResistance: '30',
      hasBox: true,
      hasPapers: true,
      location: 'Showroom',
      notes: '',
    })
  }

  const filteredWatches = watches.filter((watch) => {
    const matchesSearch =
      searchQuery === '' ||
      watch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      watch.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCollection = collectionFilter === '' || watch.collection === collectionFilter
    const matchesMovement = movementFilter === '' || watch.movement === movementFilter
    const matchesMaterial = materialFilter === '' || watch.caseMaterial.includes(materialFilter)

    return matchesSearch && matchesCollection && matchesMovement && matchesMaterial
  })

  const totalValue = watches.reduce((sum, w) => sum + w.price, 0)
  const available = watches.filter((w) => w.status === 'AVAILABLE').length

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Watches</h1>
          <p className="text-slate-500">Authorized Patek Philippe Retailer - {watches.length} timepieces</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Watch
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Watch className="h-5 w-5 text-blue-500" />
              <p className="text-sm text-slate-500">Total Pieces</p>
            </div>
            <p className="mt-2 text-2xl font-bold">{watches.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-green-500" />
              <p className="text-sm text-slate-500">Available</p>
            </div>
            <p className="mt-2 text-2xl font-bold">{available}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-amber-500" />
              <p className="text-sm text-slate-500">Grand Complications</p>
            </div>
            <p className="mt-2 text-2xl font-bold">{watches.filter(w => w.collection === 'Grand Complications').length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-purple-500" />
              <p className="text-sm text-slate-500">Total Value</p>
            </div>
            <p className="mt-2 text-2xl font-bold">{formatCurrency(totalValue)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search by name or reference..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select
          options={collectionOptions}
          value={collectionFilter}
          onChange={(e) => setCollectionFilter(e.target.value)}
          className="w-44"
        />
        <Select
          options={movementOptions}
          value={movementFilter}
          onChange={(e) => setMovementFilter(e.target.value)}
          className="w-36"
        />
        <Select
          options={materialOptions}
          value={materialFilter}
          onChange={(e) => setMaterialFilter(e.target.value)}
          className="w-40"
        />
      </div>

      {/* Watches Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {filteredWatches.map((watch) => (
          <Card key={watch.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex gap-6">
                {/* Watch Image */}
                <div className="w-32 h-32 bg-slate-50 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {watch.imageUrl ? (
                    <Image
                      src={watch.imageUrl}
                      alt={watch.name}
                      width={128}
                      height={128}
                      className="object-contain w-full h-full"
                    />
                  ) : (
                    <Watch className="h-12 w-12 text-slate-400" />
                  )}
                </div>

                {/* Watch Details */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs text-slate-500 font-mono">{watch.referenceNumber}</p>
                      <h3 className="font-semibold text-lg">{watch.name}</h3>
                      <p className="text-sm text-slate-500">{watch.collection}</p>
                    </div>
                    <Badge variant={statusColors[watch.status]}>{watch.status}</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-slate-500">Movement:</span>
                      <span className="ml-1 font-medium">{watch.movement}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Caliber:</span>
                      <span className="ml-1 font-medium">{watch.caliber}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Case:</span>
                      <span className="ml-1 font-medium">{watch.caseMaterial}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Size:</span>
                      <span className="ml-1 font-medium">{watch.caseSize}mm</span>
                    </div>
                  </div>

                  {watch.complications.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {watch.complications.slice(0, 4).map((comp) => (
                        <Badge key={comp} variant="outline" className="text-xs">
                          {comp}
                        </Badge>
                      ))}
                      {watch.complications.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{watch.complications.length - 4} more
                        </Badge>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <div className="flex items-center gap-1">
                        {watch.hasBox && <Badge variant="secondary" className="text-xs">Box</Badge>}
                        {watch.hasPapers && <Badge variant="secondary" className="text-xs">Papers</Badge>}
                      </div>
                      {watch.warrantyEnd && (
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Warranty: {formatDate(watch.warrantyEnd)}
                        </span>
                      )}
                    </div>
                    <p className="font-bold text-xl">{formatCurrency(watch.price)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Watch Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Watch" size="lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Reference Number *</label>
              <Input
                required
                value={formData.referenceNumber}
                onChange={(e) => setFormData({ ...formData, referenceNumber: e.target.value })}
                placeholder="e.g., 5811/1G-001"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Collection *</label>
              <Select
                options={collectionOptions.filter(o => o.value !== '')}
                value={formData.collection}
                onChange={(e) => setFormData({ ...formData, collection: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Watch Name *</label>
            <Input
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Patek Philippe Nautilus"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Price (GBP) *</label>
              <Input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="e.g., 87072"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Movement *</label>
              <Select
                options={movementOptions.filter(o => o.value !== '')}
                value={formData.movement}
                onChange={(e) => setFormData({ ...formData, movement: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Caliber</label>
              <Input
                value={formData.caliber}
                onChange={(e) => setFormData({ ...formData, caliber: e.target.value })}
                placeholder="e.g., 26-330 S C"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Power Reserve (hrs)</label>
              <Input
                type="number"
                value={formData.powerReserve}
                onChange={(e) => setFormData({ ...formData, powerReserve: e.target.value })}
                placeholder="e.g., 45"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Water Resistance (m)</label>
              <Input
                value={formData.waterResistance}
                onChange={(e) => setFormData({ ...formData, waterResistance: e.target.value })}
                placeholder="e.g., 120"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Case Material</label>
              <Select
                options={[
                  { value: 'Stainless Steel', label: 'Stainless Steel' },
                  { value: '18ct Rose Gold', label: '18ct Rose Gold' },
                  { value: '18ct White Gold', label: '18ct White Gold' },
                  { value: '18ct Yellow Gold', label: '18ct Yellow Gold' },
                  { value: 'Platinum 950', label: 'Platinum 950' },
                ]}
                value={formData.caseMaterial}
                onChange={(e) => setFormData({ ...formData, caseMaterial: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Case Size (mm)</label>
              <Input
                value={formData.caseSize}
                onChange={(e) => setFormData({ ...formData, caseSize: e.target.value })}
                placeholder="e.g., 41.0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Dial Color</label>
              <Input
                value={formData.dialColor}
                onChange={(e) => setFormData({ ...formData, dialColor: e.target.value })}
                placeholder="e.g., Blue Gradient"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
              <Select
                options={[
                  { value: 'Showroom', label: 'Showroom' },
                  { value: 'Vault', label: 'Vault' },
                  { value: 'Display Case', label: 'Display Case' },
                ]}
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
            <div className="flex items-center gap-4 pt-6">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.hasBox}
                  onChange={(e) => setFormData({ ...formData, hasBox: e.target.checked })}
                  className="rounded border-slate-300"
                />
                <span className="text-sm">Has Box</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.hasPapers}
                  onChange={(e) => setFormData({ ...formData, hasPapers: e.target.checked })}
                  className="rounded border-slate-300"
                />
                <span className="text-sm">Has Papers</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
            <Textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Additional notes..."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Watch</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
