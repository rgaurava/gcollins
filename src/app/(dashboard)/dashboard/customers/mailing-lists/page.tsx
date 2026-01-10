'use client'

import { useState } from 'react'
import {
  Mail,
  Users,
  Download,
  Filter,
  Home,
  Gift,
  Calendar,
  CheckCircle,
  Circle,
  Search,
  Plus,
  FileText,
  Printer,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
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

// Household-grouped customer data for mailing
const households = [
  {
    id: '1',
    householdName: 'The Windsor Family',
    primaryContact: 'Elizabeth Windsor',
    members: [
      { name: 'Elizabeth Windsor', email: 'elizabeth.windsor@email.com', vipLevel: 'PLATINUM' },
      { name: 'Philip Windsor', email: 'philip.windsor@email.com', vipLevel: 'PLATINUM' },
    ],
    address: {
      line1: 'Buckingham Palace',
      line2: 'Westminster',
      city: 'London',
      postcode: 'SW1A 1AA',
      country: 'United Kingdom',
    },
    preferences: {
      christmasCard: true,
      birthdayCard: true,
      eventInvites: true,
      newsletter: true,
      catalogues: true,
    },
    lifetimeValue: 485000,
    lastPurchase: '2025-01-05',
    tags: ['VIP', 'Collector', 'Royal'],
  },
  {
    id: '2',
    householdName: 'The Harrison Family',
    primaryContact: 'James Harrison',
    members: [
      { name: 'James Harrison', email: 'james.harrison@company.com', vipLevel: 'GOLD' },
      { name: 'Catherine Harrison', email: 'catherine.harrison@email.com', vipLevel: 'GOLD' },
    ],
    address: {
      line1: '15 Eaton Square',
      line2: 'Belgravia',
      city: 'London',
      postcode: 'SW1W 9DD',
      country: 'United Kingdom',
    },
    preferences: {
      christmasCard: true,
      birthdayCard: true,
      eventInvites: true,
      newsletter: true,
      catalogues: false,
    },
    lifetimeValue: 156000,
    lastPurchase: '2025-01-08',
    tags: ['Corporate', 'Watch Collector'],
  },
  {
    id: '3',
    householdName: 'Ms Sophie Chen',
    primaryContact: 'Sophie Chen',
    members: [{ name: 'Sophie Chen', email: 'sophie.chen@email.com', vipLevel: 'SILVER' }],
    address: {
      line1: 'Flat 42, The Shard',
      line2: '32 London Bridge Street',
      city: 'London',
      postcode: 'SE1 9SG',
      country: 'United Kingdom',
    },
    preferences: {
      christmasCard: true,
      birthdayCard: false,
      eventInvites: true,
      newsletter: true,
      catalogues: true,
    },
    lifetimeValue: 78500,
    lastPurchase: '2025-01-02',
    tags: ['Young Professional'],
  },
  {
    id: '4',
    householdName: 'The Roberts Family',
    primaryContact: 'Michael Roberts',
    members: [
      { name: 'Michael Roberts', email: 'michael.roberts@email.com', vipLevel: 'COLLECTOR' },
      { name: 'Victoria Roberts', email: 'victoria.roberts@email.com', vipLevel: 'COLLECTOR' },
      { name: 'Alexander Roberts', email: 'alex.roberts@email.com', vipLevel: 'STANDARD' },
    ],
    address: {
      line1: 'Hartington House',
      line2: 'Chester Road',
      city: 'Knutsford',
      postcode: 'WA16 0HQ',
      country: 'United Kingdom',
    },
    preferences: {
      christmasCard: true,
      birthdayCard: true,
      eventInvites: true,
      newsletter: false,
      catalogues: true,
    },
    lifetimeValue: 1250000,
    lastPurchase: '2025-01-09',
    tags: ['VIP', 'Patek Collector', 'Multi-Generation'],
  },
  {
    id: '5',
    householdName: 'Mr & Mrs Thompson',
    primaryContact: 'David Thompson',
    members: [
      { name: 'David Thompson', email: 'david.thompson@email.com', vipLevel: 'GOLD' },
      { name: 'Sarah Thompson', email: 'sarah.thompson@email.com', vipLevel: 'GOLD' },
    ],
    address: {
      line1: '8 Park Lane',
      line2: 'Mayfair',
      city: 'London',
      postcode: 'W1K 1QA',
      country: 'United Kingdom',
    },
    preferences: {
      christmasCard: true,
      birthdayCard: true,
      eventInvites: true,
      newsletter: true,
      catalogues: true,
    },
    lifetimeValue: 95000,
    lastPurchase: '2024-12-28',
    tags: ['Anniversary Buyers'],
  },
  {
    id: '6',
    householdName: 'Ms Emma Davis',
    primaryContact: 'Emma Davis',
    members: [{ name: 'Emma Davis', email: 'emma.davis@email.com', vipLevel: 'STANDARD' }],
    address: {
      line1: '23 Kings Road',
      line2: 'Chelsea',
      city: 'London',
      postcode: 'SW3 4UD',
      country: 'United Kingdom',
    },
    preferences: {
      christmasCard: false,
      birthdayCard: false,
      eventInvites: true,
      newsletter: true,
      catalogues: false,
    },
    lifetimeValue: 12500,
    lastPurchase: '2024-12-15',
    tags: ['New Customer'],
  },
  {
    id: '7',
    householdName: 'The Al-Rashid Family',
    primaryContact: 'Sheikh Ahmed Al-Rashid',
    members: [
      { name: 'Sheikh Ahmed Al-Rashid', email: 'ahmed@al-rashid.ae', vipLevel: 'COLLECTOR' },
      { name: 'Sheikha Fatima Al-Rashid', email: 'fatima@al-rashid.ae', vipLevel: 'COLLECTOR' },
    ],
    address: {
      line1: 'Villa 42, Emirates Hills',
      line2: '',
      city: 'Dubai',
      postcode: '',
      country: 'United Arab Emirates',
    },
    preferences: {
      christmasCard: false,
      birthdayCard: true,
      eventInvites: true,
      newsletter: true,
      catalogues: true,
    },
    lifetimeValue: 2850000,
    lastPurchase: '2025-01-03',
    tags: ['International', 'Ultra VIP', 'Bespoke'],
  },
  {
    id: '8',
    householdName: 'The Nakamura Family',
    primaryContact: 'Kenji Nakamura',
    members: [
      { name: 'Kenji Nakamura', email: 'kenji.nakamura@email.jp', vipLevel: 'PLATINUM' },
      { name: 'Yuki Nakamura', email: 'yuki.nakamura@email.jp', vipLevel: 'PLATINUM' },
    ],
    address: {
      line1: '3-1-1 Ginza',
      line2: 'Chuo-ku',
      city: 'Tokyo',
      postcode: '104-0061',
      country: 'Japan',
    },
    preferences: {
      christmasCard: true,
      birthdayCard: true,
      eventInvites: true,
      newsletter: true,
      catalogues: true,
    },
    lifetimeValue: 680000,
    lastPurchase: '2024-12-20',
    tags: ['International', 'Watch Enthusiast'],
  },
]

// Mailing list definitions
const mailingLists = [
  {
    id: 'christmas',
    name: 'Christmas Cards 2025',
    icon: Gift,
    description: 'Annual Christmas card recipients',
    count: households.filter((h) => h.preferences.christmasCard).length,
    lastUsed: '2024-12-15',
    color: 'text-red-500',
  },
  {
    id: 'birthday',
    name: 'Birthday Cards',
    icon: Calendar,
    description: 'Customers who receive birthday cards',
    count: households.filter((h) => h.preferences.birthdayCard).length,
    lastUsed: '2025-01-08',
    color: 'text-pink-500',
  },
  {
    id: 'events',
    name: 'Event Invitations',
    icon: Mail,
    description: 'Trunk shows, exhibitions, and special events',
    count: households.filter((h) => h.preferences.eventInvites).length,
    lastUsed: '2025-01-02',
    color: 'text-purple-500',
  },
  {
    id: 'newsletter',
    name: 'Newsletter Subscribers',
    icon: FileText,
    description: 'Monthly newsletter and updates',
    count: households.filter((h) => h.preferences.newsletter).length,
    lastUsed: '2025-01-01',
    color: 'text-blue-500',
  },
  {
    id: 'catalogues',
    name: 'Catalogue Recipients',
    icon: FileText,
    description: 'Annual catalogue and lookbook mailings',
    count: households.filter((h) => h.preferences.catalogues).length,
    lastUsed: '2024-11-15',
    color: 'text-amber-500',
  },
]

const vipOptions = [
  { value: '', label: 'All VIP Levels' },
  { value: 'COLLECTOR', label: 'Collector' },
  { value: 'PLATINUM', label: 'Platinum' },
  { value: 'GOLD', label: 'Gold' },
  { value: 'SILVER', label: 'Silver' },
  { value: 'STANDARD', label: 'Standard' },
]

const countryOptions = [
  { value: '', label: 'All Countries' },
  { value: 'United Kingdom', label: 'United Kingdom' },
  { value: 'United Arab Emirates', label: 'UAE' },
  { value: 'Japan', label: 'Japan' },
  { value: 'United States', label: 'USA' },
]

const vipColors: Record<string, 'default' | 'secondary' | 'warning' | 'info' | 'destructive'> = {
  STANDARD: 'secondary',
  SILVER: 'default',
  GOLD: 'warning',
  PLATINUM: 'info',
  COLLECTOR: 'destructive',
}

export default function MailingListsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedList, setSelectedList] = useState('christmas')
  const [vipFilter, setVipFilter] = useState('')
  const [countryFilter, setCountryFilter] = useState('')
  const [selectedHouseholds, setSelectedHouseholds] = useState<string[]>([])

  // Filter households based on selected mailing list
  const getListFilter = (household: (typeof households)[0]) => {
    switch (selectedList) {
      case 'christmas':
        return household.preferences.christmasCard
      case 'birthday':
        return household.preferences.birthdayCard
      case 'events':
        return household.preferences.eventInvites
      case 'newsletter':
        return household.preferences.newsletter
      case 'catalogues':
        return household.preferences.catalogues
      default:
        return true
    }
  }

  const filteredHouseholds = households.filter((household) => {
    const matchesSearch =
      searchQuery === '' ||
      household.householdName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      household.primaryContact.toLowerCase().includes(searchQuery.toLowerCase()) ||
      household.address.city.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesList = getListFilter(household)
    const matchesVip =
      vipFilter === '' || household.members.some((m) => m.vipLevel === vipFilter)
    const matchesCountry = countryFilter === '' || household.address.country === countryFilter

    return matchesSearch && matchesList && matchesVip && matchesCountry
  })

  const toggleSelectAll = () => {
    if (selectedHouseholds.length === filteredHouseholds.length) {
      setSelectedHouseholds([])
    } else {
      setSelectedHouseholds(filteredHouseholds.map((h) => h.id))
    }
  }

  const toggleSelect = (id: string) => {
    setSelectedHouseholds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Mailing Lists</h1>
          <p className="text-slate-500">
            Manage correspondence lists with household grouping
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Create List
          </Button>
          <Button variant="outline" disabled={selectedHouseholds.length === 0}>
            <Printer className="mr-2 h-4 w-4" />
            Print Labels
          </Button>
          <Button disabled={selectedHouseholds.length === 0}>
            <Download className="mr-2 h-4 w-4" />
            Export Selected ({selectedHouseholds.length})
          </Button>
        </div>
      </div>

      {/* Mailing List Cards */}
      <div className="grid gap-4 md:grid-cols-5">
        {mailingLists.map((list) => {
          const Icon = list.icon
          return (
            <Card
              key={list.id}
              className={`cursor-pointer transition-all ${
                selectedList === list.id
                  ? 'ring-2 ring-amber-500 bg-amber-50'
                  : 'hover:shadow-md'
              }`}
              onClick={() => setSelectedList(list.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <Icon className={`h-5 w-5 ${list.color}`} />
                  {selectedList === list.id && (
                    <CheckCircle className="h-4 w-4 text-amber-500" />
                  )}
                </div>
                <p className="mt-2 font-medium text-sm">{list.name}</p>
                <p className="text-2xl font-bold">{list.count}</p>
                <p className="text-xs text-slate-500 mt-1">households</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Info Banner */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Home className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <p className="font-medium text-blue-900">Household Grouping Active</p>
              <p className="text-sm text-blue-700">
                Family members at the same address are grouped together to avoid sending
                duplicate cards. Each household receives one piece of correspondence addressed
                to the primary contact or family name.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search households..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select
          options={vipOptions}
          value={vipFilter}
          onChange={(e) => setVipFilter(e.target.value)}
          className="w-40"
        />
        <Select
          options={countryOptions}
          value={countryFilter}
          onChange={(e) => setCountryFilter(e.target.value)}
          className="w-40"
        />
      </div>

      {/* Households Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <button
                    onClick={toggleSelectAll}
                    className="flex items-center justify-center"
                  >
                    {selectedHouseholds.length === filteredHouseholds.length &&
                    filteredHouseholds.length > 0 ? (
                      <CheckCircle className="h-4 w-4 text-amber-500" />
                    ) : (
                      <Circle className="h-4 w-4 text-slate-300" />
                    )}
                  </button>
                </TableHead>
                <TableHead>Household</TableHead>
                <TableHead>Members</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>VIP Level</TableHead>
                <TableHead>Lifetime Value</TableHead>
                <TableHead>Tags</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHouseholds.map((household) => (
                <TableRow
                  key={household.id}
                  className={`cursor-pointer ${
                    selectedHouseholds.includes(household.id) ? 'bg-amber-50' : ''
                  }`}
                  onClick={() => toggleSelect(household.id)}
                >
                  <TableCell>
                    {selectedHouseholds.includes(household.id) ? (
                      <CheckCircle className="h-4 w-4 text-amber-500" />
                    ) : (
                      <Circle className="h-4 w-4 text-slate-300" />
                    )}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{household.householdName}</p>
                      <p className="text-xs text-slate-500">
                        Primary: {household.primaryContact}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-slate-400" />
                      <span>{household.members.length}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{household.address.line1}</p>
                      <p className="text-slate-500">
                        {household.address.city}, {household.address.postcode}
                      </p>
                      {household.address.country !== 'United Kingdom' && (
                        <p className="text-slate-500">{household.address.country}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {[...new Set(household.members.map((m) => m.vipLevel))].map((level) => (
                        <Badge key={level} variant={vipColors[level]} className="text-xs">
                          {level}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {formatCurrency(household.lifetimeValue)}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {household.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {household.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{household.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 text-sm">
              <span>
                <strong>{filteredHouseholds.length}</strong> households
              </span>
              <span>
                <strong>
                  {filteredHouseholds.reduce((sum, h) => sum + h.members.length, 0)}
                </strong>{' '}
                total members
              </span>
              <span>
                UK:{' '}
                <strong>
                  {
                    filteredHouseholds.filter((h) => h.address.country === 'United Kingdom')
                      .length
                  }
                </strong>
              </span>
              <span>
                International:{' '}
                <strong>
                  {
                    filteredHouseholds.filter((h) => h.address.country !== 'United Kingdom')
                      .length
                  }
                </strong>
              </span>
            </div>
            <p className="text-sm text-slate-500">
              Total value:{' '}
              <strong>
                {formatCurrency(
                  filteredHouseholds.reduce((sum, h) => sum + h.lifetimeValue, 0)
                )}
              </strong>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
