'use client'

import { useState } from 'react'
import { Plus, Search, Wrench, Clock, CheckCircle, AlertCircle } from 'lucide-react'
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
import { formatCurrency, formatDate } from '@/lib/utils'

// Mock repair data
const repairs = [
  {
    id: '1',
    repairNumber: 'REP-2501-0023',
    customer: { firstName: 'Elizabeth', lastName: 'Windsor' },
    itemDescription: '3.5ct Diamond Engagement Ring - Platinum',
    repairType: 'RESIZE',
    issueDescription: 'Ring resize from M to N',
    status: 'READY_FOR_COLLECTION',
    estimatedCost: 150,
    actualCost: 150,
    intakeDate: new Date('2025-01-03'),
    completedDate: new Date('2025-01-09'),
  },
  {
    id: '2',
    repairNumber: 'REP-2501-0022',
    customer: { firstName: 'James', lastName: 'Harrison' },
    itemDescription: 'Patek Philippe Nautilus 5711',
    repairType: 'OTHER',
    issueDescription: 'Full service - movement service and polish',
    status: 'IN_PROGRESS',
    estimatedCost: 2500,
    actualCost: null,
    intakeDate: new Date('2025-01-02'),
    completedDate: null,
  },
  {
    id: '3',
    repairNumber: 'REP-2501-0021',
    customer: { firstName: 'Sophie', lastName: 'Chen' },
    itemDescription: '18ct White Gold Diamond Tennis Bracelet',
    repairType: 'CLASP_REPAIR',
    issueDescription: 'Clasp replacement - broken safety catch',
    status: 'APPROVED',
    estimatedCost: 350,
    actualCost: null,
    intakeDate: new Date('2025-01-08'),
    completedDate: null,
  },
  {
    id: '4',
    repairNumber: 'REP-2501-0020',
    customer: { firstName: 'Michael', lastName: 'Roberts' },
    itemDescription: '2ct Emerald and Diamond Ring',
    repairType: 'STONE_REPLACEMENT',
    issueDescription: 'Replace chipped side diamond (0.15ct)',
    status: 'IN_PROGRESS',
    estimatedCost: 850,
    actualCost: null,
    intakeDate: new Date('2025-01-05'),
    completedDate: null,
  },
  {
    id: '5',
    repairNumber: 'REP-2501-0019',
    customer: { firstName: 'Emma', lastName: 'Davis' },
    itemDescription: 'Pearl Strand Necklace',
    repairType: 'CHAIN_REPAIR',
    issueDescription: 'Restring entire pearl strand with new silk thread',
    status: 'ESTIMATE_SENT',
    estimatedCost: 220,
    actualCost: null,
    intakeDate: new Date('2025-01-07'),
    completedDate: null,
  },
  {
    id: '6',
    repairNumber: 'REP-2501-0018',
    customer: { firstName: 'David', lastName: 'Thompson' },
    itemDescription: '18ct Yellow Gold Signet Ring',
    repairType: 'ENGRAVING',
    issueDescription: 'Add family crest engraving',
    status: 'QUALITY_CHECK',
    estimatedCost: 180,
    actualCost: 180,
    intakeDate: new Date('2025-01-04'),
    completedDate: null,
  },
]

const statusOptions = [
  { value: '', label: 'All Statuses' },
  { value: 'INTAKE', label: 'Intake' },
  { value: 'ESTIMATE_PENDING', label: 'Estimate Pending' },
  { value: 'ESTIMATE_SENT', label: 'Estimate Sent' },
  { value: 'APPROVED', label: 'Approved' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'QUALITY_CHECK', label: 'Quality Check' },
  { value: 'READY_FOR_COLLECTION', label: 'Ready for Collection' },
  { value: 'COLLECTED', label: 'Collected' },
]

const repairTypeOptions = [
  { value: '', label: 'All Types' },
  { value: 'RESIZE', label: 'Resize' },
  { value: 'POLISH', label: 'Polish' },
  { value: 'RHODIUM_PLATE', label: 'Rhodium Plate' },
  { value: 'STONE_REPLACEMENT', label: 'Stone Replacement' },
  { value: 'CLASP_REPAIR', label: 'Clasp Repair' },
  { value: 'CHAIN_REPAIR', label: 'Chain Repair' },
  { value: 'PRONG_RETIPPING', label: 'Prong Retipping' },
  { value: 'FULL_RESTORATION', label: 'Full Restoration' },
  { value: 'CLEANING', label: 'Cleaning' },
  { value: 'ENGRAVING', label: 'Engraving' },
  { value: 'OTHER', label: 'Other' },
]

const statusColors: Record<string, 'default' | 'success' | 'warning' | 'info' | 'destructive' | 'secondary'> = {
  INTAKE: 'secondary',
  ESTIMATE_PENDING: 'warning',
  ESTIMATE_SENT: 'info',
  APPROVED: 'info',
  IN_PROGRESS: 'warning',
  QUALITY_CHECK: 'info',
  READY_FOR_COLLECTION: 'success',
  COLLECTED: 'success',
  CANCELLED: 'destructive',
}

const repairTypeLabels: Record<string, string> = {
  RESIZE: 'Resize',
  POLISH: 'Polish',
  RHODIUM_PLATE: 'Rhodium Plate',
  STONE_REPLACEMENT: 'Stone Replacement',
  CLASP_REPAIR: 'Clasp Repair',
  CHAIN_REPAIR: 'Chain Repair',
  PRONG_RETIPPING: 'Prong Retipping',
  FULL_RESTORATION: 'Full Restoration',
  CLEANING: 'Cleaning',
  ENGRAVING: 'Engraving',
  OTHER: 'Other',
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

export default function RepairsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [repairTypeFilter, setRepairTypeFilter] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    customer: '',
    itemDescription: '',
    repairType: 'RESIZE',
    issueDescription: '',
    estimatedCost: '',
    priority: 'NORMAL',
    notes: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Creating repair:', formData)
    setIsModalOpen(false)
    setFormData({
      customer: '',
      itemDescription: '',
      repairType: 'RESIZE',
      issueDescription: '',
      estimatedCost: '',
      priority: 'NORMAL',
      notes: '',
    })
  }

  const filteredRepairs = repairs.filter((repair) => {
    const matchesSearch =
      searchQuery === '' ||
      repair.repairNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${repair.customer.firstName} ${repair.customer.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repair.itemDescription.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === '' || repair.status === statusFilter
    const matchesType = repairTypeFilter === '' || repair.repairType === repairTypeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const inProgress = repairs.filter((r) => r.status === 'IN_PROGRESS').length
  const readyForCollection = repairs.filter((r) => r.status === 'READY_FOR_COLLECTION').length
  const pendingApproval = repairs.filter((r) => ['ESTIMATE_PENDING', 'ESTIMATE_SENT'].includes(r.status)).length

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold">Repairs</h1>
          <p className="text-sm lg:text-base text-slate-500">Manage workshop repairs and services</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          New Repair
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 lg:gap-4 lg:grid-cols-4">
        <Card>
          <CardContent className="p-3 lg:p-4">
            <div className="flex items-center space-x-2">
              <Wrench className="h-4 w-4 lg:h-5 lg:w-5 text-blue-500" />
              <p className="text-xs lg:text-sm text-slate-500">Total Active</p>
            </div>
            <p className="mt-1 lg:mt-2 text-xl lg:text-2xl font-bold">{repairs.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 lg:p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 lg:h-5 lg:w-5 text-amber-500" />
              <p className="text-xs lg:text-sm text-slate-500">In Progress</p>
            </div>
            <p className="mt-1 lg:mt-2 text-xl lg:text-2xl font-bold">{inProgress}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 lg:p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 lg:h-5 lg:w-5 text-green-500" />
              <p className="text-xs lg:text-sm text-slate-500">Ready</p>
            </div>
            <p className="mt-1 lg:mt-2 text-xl lg:text-2xl font-bold">{readyForCollection}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 lg:p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-4 w-4 lg:h-5 lg:w-5 text-purple-500" />
              <p className="text-xs lg:text-sm text-slate-500">Pending</p>
            </div>
            <p className="mt-1 lg:mt-2 text-xl lg:text-2xl font-bold">{pendingApproval}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search repairs..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select
          options={statusOptions}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-44"
        />
        <Select
          options={repairTypeOptions}
          value={repairTypeFilter}
          onChange={(e) => setRepairTypeFilter(e.target.value)}
          className="w-40"
        />
      </div>

      {/* Repairs Table - Desktop */}
      <Card className="hidden lg:block">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Repair #</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Est. Cost</TableHead>
                <TableHead>Intake Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRepairs.map((repair) => (
                <TableRow key={repair.id} className="cursor-pointer hover:bg-slate-50">
                  <TableCell className="font-mono font-medium">{repair.repairNumber}</TableCell>
                  <TableCell>
                    {repair.customer.firstName} {repair.customer.lastName}
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs">
                      <p className="font-medium truncate">{repair.itemDescription}</p>
                      <p className="text-xs text-slate-500 truncate">{repair.issueDescription}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{repairTypeLabels[repair.repairType]}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusColors[repair.status]}>
                      {repair.status.replace(/_/g, ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {repair.estimatedCost ? formatCurrency(repair.estimatedCost) : '-'}
                  </TableCell>
                  <TableCell>{formatDate(repair.intakeDate)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Repair Cards - Mobile */}
      <div className="space-y-3 lg:hidden">
        {filteredRepairs.map((repair) => (
          <Card key={repair.id} className="cursor-pointer active:bg-slate-50">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="min-w-0 flex-1 pr-2">
                  <p className="font-mono font-medium text-sm">{repair.repairNumber}</p>
                  <p className="text-sm text-slate-500">
                    {repair.customer.firstName} {repair.customer.lastName}
                  </p>
                </div>
                <Badge variant={statusColors[repair.status]} className="text-xs flex-shrink-0">
                  {repair.status.replace(/_/g, ' ')}
                </Badge>
              </div>
              <p className="text-sm font-medium truncate mb-1">{repair.itemDescription}</p>
              <p className="text-xs text-slate-500 truncate mb-2">{repair.issueDescription}</p>
              <div className="flex items-center justify-between text-sm">
                <Badge variant="outline" className="text-xs">
                  {repairTypeLabels[repair.repairType]}
                </Badge>
                <span className="font-medium">
                  {repair.estimatedCost ? formatCurrency(repair.estimatedCost) : '-'}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* New Repair Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="New Repair" size="lg">
        <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Customer *</label>
            <Select
              options={customerOptions}
              value={formData.customer}
              onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Item Description *</label>
            <Input
              required
              value={formData.itemDescription}
              onChange={(e) => setFormData({ ...formData, itemDescription: e.target.value })}
              placeholder="e.g., 3.5ct Diamond Engagement Ring - Platinum"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Repair Type *</label>
              <Select
                options={repairTypeOptions.filter(o => o.value !== '')}
                value={formData.repairType}
                onChange={(e) => setFormData({ ...formData, repairType: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Priority</label>
              <Select
                options={[
                  { value: 'LOW', label: 'Low' },
                  { value: 'NORMAL', label: 'Normal' },
                  { value: 'HIGH', label: 'High' },
                  { value: 'URGENT', label: 'Urgent' },
                ]}
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Issue Description *</label>
            <Textarea
              required
              value={formData.issueDescription}
              onChange={(e) => setFormData({ ...formData, issueDescription: e.target.value })}
              placeholder="Describe the repair needed..."
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Estimated Cost (GBP)</label>
            <Input
              type="number"
              value={formData.estimatedCost}
              onChange={(e) => setFormData({ ...formData, estimatedCost: e.target.value })}
              placeholder="e.g., 150"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Internal Notes</label>
            <Textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Internal notes for workshop staff..."
              rows={2}
            />
          </div>

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button type="submit" className="w-full sm:w-auto">Create Repair</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
