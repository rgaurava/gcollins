'use client'

import { useState } from 'react'
import { Plus, Search, Calendar, Clock, User, Video, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select } from '@/components/ui/select'
import { Modal } from '@/components/ui/modal'
import { Textarea } from '@/components/ui/textarea'
import { formatDateTime, formatDate } from '@/lib/utils'

// Mock appointment data
const appointments = [
  {
    id: '1',
    title: 'Engagement Ring Consultation',
    type: 'BESPOKE_DESIGN',
    status: 'SCHEDULED',
    startTime: new Date('2025-01-10T15:00:00'),
    endTime: new Date('2025-01-10T16:00:00'),
    duration: 60,
    customer: { firstName: 'David', lastName: 'Thompson', email: 'david.thompson@email.com' },
    host: { firstName: 'Sarah', lastName: 'Collins' },
    location: 'Showroom',
    notes: 'Looking for a 2ct round brilliant, platinum setting',
  },
  {
    id: '2',
    title: 'Watch Collection Viewing',
    type: 'VIEWING',
    status: 'CONFIRMED',
    startTime: new Date('2025-01-10T16:30:00'),
    endTime: new Date('2025-01-10T17:30:00'),
    duration: 60,
    customer: { firstName: 'Marcus', lastName: 'Lee', email: 'marcus.lee@email.com' },
    host: { firstName: 'Thomas', lastName: 'Williams' },
    location: 'Showroom',
    notes: 'Interested in Patek Philippe Nautilus collection',
  },
  {
    id: '3',
    title: 'Anniversary Gift Selection',
    type: 'CONSULTATION',
    status: 'SCHEDULED',
    startTime: new Date('2025-01-11T10:00:00'),
    endTime: new Date('2025-01-11T11:00:00'),
    duration: 60,
    customer: { firstName: 'Emma', lastName: 'Davis', email: 'emma.davis@email.com' },
    host: { firstName: 'Sarah', lastName: 'Collins' },
    location: 'Showroom',
    notes: '25th anniversary, budget around £15,000',
  },
  {
    id: '4',
    title: 'Custom Necklace Design Review',
    type: 'BESPOKE_DESIGN',
    status: 'IN_PROGRESS',
    startTime: new Date('2025-01-10T14:00:00'),
    endTime: new Date('2025-01-10T14:45:00'),
    duration: 45,
    customer: { firstName: 'Sophie', lastName: 'Chen', email: 'sophie.chen@email.com' },
    host: { firstName: 'Sarah', lastName: 'Collins' },
    location: 'Workshop',
    notes: 'Reviewing CAD designs for emerald pendant',
  },
  {
    id: '5',
    title: 'Virtual Consultation - US Client',
    type: 'VIRTUAL_CONSULTATION',
    status: 'SCHEDULED',
    startTime: new Date('2025-01-11T19:00:00'),
    endTime: new Date('2025-01-11T19:30:00'),
    duration: 30,
    customer: { firstName: 'Jennifer', lastName: 'Smith', email: 'jennifer.smith@email.com' },
    host: { firstName: 'Thomas', lastName: 'Williams' },
    location: 'Virtual',
    meetingLink: 'https://zoom.us/j/123456789',
    notes: 'Engagement ring inquiry, referred by existing client',
  },
  {
    id: '6',
    title: 'Repair Collection',
    type: 'REPAIR_COLLECTION',
    status: 'SCHEDULED',
    startTime: new Date('2025-01-11T11:30:00'),
    endTime: new Date('2025-01-11T12:00:00'),
    duration: 30,
    customer: { firstName: 'Elizabeth', lastName: 'Windsor', email: 'elizabeth.windsor@email.com' },
    host: { firstName: 'Sarah', lastName: 'Collins' },
    location: 'Showroom',
    notes: 'Collecting resized engagement ring',
  },
]

const typeOptions = [
  { value: '', label: 'All Types' },
  { value: 'CONSULTATION', label: 'Consultation' },
  { value: 'BESPOKE_DESIGN', label: 'Bespoke Design' },
  { value: 'VIEWING', label: 'Viewing' },
  { value: 'COLLECTION', label: 'Collection' },
  { value: 'REPAIR_DROP_OFF', label: 'Repair Drop-off' },
  { value: 'REPAIR_COLLECTION', label: 'Repair Collection' },
  { value: 'VALUATION', label: 'Valuation' },
  { value: 'VIRTUAL_CONSULTATION', label: 'Virtual Consultation' },
]

const statusOptions = [
  { value: '', label: 'All Statuses' },
  { value: 'SCHEDULED', label: 'Scheduled' },
  { value: 'CONFIRMED', label: 'Confirmed' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'CANCELLED', label: 'Cancelled' },
  { value: 'NO_SHOW', label: 'No Show' },
]

const statusColors: Record<string, 'default' | 'success' | 'warning' | 'info' | 'destructive'> = {
  SCHEDULED: 'default',
  CONFIRMED: 'info',
  IN_PROGRESS: 'warning',
  COMPLETED: 'success',
  CANCELLED: 'destructive',
  NO_SHOW: 'destructive',
}

const typeLabels: Record<string, string> = {
  CONSULTATION: 'Consultation',
  BESPOKE_DESIGN: 'Bespoke Design',
  VIEWING: 'Viewing',
  COLLECTION: 'Collection',
  REPAIR_DROP_OFF: 'Repair Drop-off',
  REPAIR_COLLECTION: 'Repair Collection',
  VALUATION: 'Valuation',
  VIRTUAL_CONSULTATION: 'Virtual',
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

const hostOptions = [
  { value: '', label: 'Select Host' },
  { value: 'sarah-collins', label: 'Sarah Collins' },
  { value: 'thomas-williams', label: 'Thomas Williams' },
]

const locationOptions = [
  { value: 'Showroom', label: 'Showroom' },
  { value: 'Workshop', label: 'Workshop' },
  { value: 'Virtual', label: 'Virtual' },
  { value: 'Private Suite', label: 'Private Suite' },
]

export default function AppointmentsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    customer: '',
    type: 'CONSULTATION',
    host: '',
    date: '',
    time: '',
    duration: '60',
    location: 'Showroom',
    notes: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Creating appointment:', formData)
    setIsModalOpen(false)
    setFormData({
      title: '',
      customer: '',
      type: 'CONSULTATION',
      host: '',
      date: '',
      time: '',
      duration: '60',
      location: 'Showroom',
      notes: '',
    })
  }

  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch =
      searchQuery === '' ||
      apt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${apt.customer.firstName} ${apt.customer.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = typeFilter === '' || apt.type === typeFilter
    const matchesStatus = statusFilter === '' || apt.status === statusFilter

    return matchesSearch && matchesType && matchesStatus
  })

  const todayAppointments = appointments.filter((apt) => {
    const today = new Date()
    return apt.startTime.toDateString() === today.toDateString()
  })

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold">Appointments</h1>
          <p className="text-sm lg:text-base text-slate-500">Schedule and manage customer appointments</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Book Appointment
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 lg:gap-4 lg:grid-cols-4">
        <Card>
          <CardContent className="p-3 lg:p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 lg:h-5 lg:w-5 text-blue-500" />
              <p className="text-xs lg:text-sm text-slate-500">Today</p>
            </div>
            <p className="mt-1 lg:mt-2 text-xl lg:text-2xl font-bold">{todayAppointments.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 lg:p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 lg:h-5 lg:w-5 text-amber-500" />
              <p className="text-xs lg:text-sm text-slate-500">This Week</p>
            </div>
            <p className="mt-1 lg:mt-2 text-xl lg:text-2xl font-bold">12</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 lg:p-4">
            <div className="flex items-center space-x-2">
              <Video className="h-4 w-4 lg:h-5 lg:w-5 text-purple-500" />
              <p className="text-xs lg:text-sm text-slate-500">Virtual</p>
            </div>
            <p className="mt-1 lg:mt-2 text-xl lg:text-2xl font-bold">3</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 lg:p-4">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 lg:h-5 lg:w-5 text-green-500" />
              <p className="text-xs lg:text-sm text-slate-500">Bespoke</p>
            </div>
            <p className="mt-1 lg:mt-2 text-xl lg:text-2xl font-bold">5</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search appointments..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select
          options={typeOptions}
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="w-44"
        />
        <Select
          options={statusOptions}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-36"
        />
      </div>

      {/* Appointments List */}
      <div className="space-y-3">
        {filteredAppointments.map((apt) => (
          <Card key={apt.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-amber-100 flex-shrink-0">
                    {apt.type === 'VIRTUAL_CONSULTATION' ? (
                      <Video className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600" />
                    ) : (
                      <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-sm sm:text-base truncate">{apt.title}</h3>
                    <p className="text-sm text-slate-500">
                      {apt.customer.firstName} {apt.customer.lastName}
                    </p>
                    <div className="mt-2 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-slate-500">
                      <div className="flex items-center">
                        <Clock className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="truncate">{formatDateTime(apt.startTime)} ({apt.duration} min)</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                        {apt.location}
                      </div>
                      <div className="hidden sm:flex items-center">
                        <User className="mr-1 h-4 w-4" />
                        {apt.host.firstName} {apt.host.lastName}
                      </div>
                    </div>
                    {apt.notes && (
                      <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-2">{apt.notes}</p>
                    )}
                  </div>
                </div>
                <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2 flex-shrink-0">
                  <Badge variant={statusColors[apt.status]} className="text-xs">
                    {apt.status.replace('_', ' ')}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {typeLabels[apt.type]}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Book Appointment Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Book Appointment" size="lg">
        <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Appointment Title *</label>
            <Input
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Engagement Ring Consultation"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Customer *</label>
              <Select
                options={customerOptions}
                value={formData.customer}
                onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Appointment Type *</label>
              <Select
                options={typeOptions.filter(o => o.value !== '')}
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Host *</label>
              <Select
                options={hostOptions}
                value={formData.host}
                onChange={(e) => setFormData({ ...formData, host: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Location *</label>
              <Select
                options={locationOptions}
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Date *</label>
              <Input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Time *</label>
              <Input
                type="time"
                required
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Duration</label>
              <Select
                options={[
                  { value: '30', label: '30 min' },
                  { value: '45', label: '45 min' },
                  { value: '60', label: '1 hour' },
                  { value: '90', label: '1.5 hours' },
                  { value: '120', label: '2 hours' },
                ]}
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
            <Textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Customer preferences, special requests, etc..."
              rows={3}
            />
          </div>

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button type="submit" className="w-full sm:w-auto">Book Appointment</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
