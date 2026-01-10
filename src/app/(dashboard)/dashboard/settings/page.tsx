'use client'

import { useState } from 'react'
import {
  User,
  Building2,
  Bell,
  Shield,
  CreditCard,
  Globe,
  Palette,
  Mail,
  Smartphone,
  Key,
  Users,
  Store,
  Clock,
  DollarSign,
  FileText,
  Database,
  Webhook,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select } from '@/components/ui/select'

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'company', label: 'Company', icon: Building2 },
  { id: 'users', label: 'Users & Roles', icon: Users },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'integrations', label: 'Integrations', icon: Webhook },
]

const teamMembers = [
  {
    id: '1',
    name: 'James Collins',
    email: 'james@gcollinsandsons.com',
    role: 'ADMIN',
    department: 'Management',
    status: 'active',
    lastActive: '2 hours ago',
  },
  {
    id: '2',
    name: 'Sarah Collins',
    email: 'sarah.collins@gcollinsandsons.com',
    role: 'STORE_MANAGER',
    department: 'Sales',
    status: 'active',
    lastActive: '30 minutes ago',
  },
  {
    id: '3',
    name: 'Thomas Williams',
    email: 'thomas.williams@gcollinsandsons.com',
    role: 'SALES_ASSOCIATE',
    department: 'Sales',
    status: 'active',
    lastActive: '1 hour ago',
  },
  {
    id: '4',
    name: 'Emma Richardson',
    email: 'emma.richardson@gcollinsandsons.com',
    role: 'SALES_ASSOCIATE',
    department: 'Sales',
    status: 'active',
    lastActive: '3 hours ago',
  },
  {
    id: '5',
    name: 'Michael Chen',
    email: 'michael.chen@gcollinsandsons.com',
    role: 'WORKSHOP_MANAGER',
    department: 'Workshop',
    status: 'active',
    lastActive: 'Yesterday',
  },
]

const roleLabels: Record<string, string> = {
  ADMIN: 'Administrator',
  STORE_MANAGER: 'Store Manager',
  SALES_ASSOCIATE: 'Sales Associate',
  WORKSHOP_MANAGER: 'Workshop Manager',
  ACCOUNTANT: 'Accountant',
  VIEWER: 'Viewer',
}

const roleColors: Record<string, 'default' | 'success' | 'warning' | 'secondary'> = {
  ADMIN: 'default',
  STORE_MANAGER: 'success',
  SALES_ASSOCIATE: 'secondary',
  WORKSHOP_MANAGER: 'warning',
  ACCOUNTANT: 'secondary',
  VIEWER: 'secondary',
}

const currencyOptions = [
  { value: 'GBP', label: 'British Pound (£)' },
  { value: 'USD', label: 'US Dollar ($)' },
  { value: 'EUR', label: 'Euro (€)' },
  { value: 'CHF', label: 'Swiss Franc (CHF)' },
]

const timezoneOptions = [
  { value: 'Europe/London', label: 'London (GMT/BST)' },
  { value: 'America/New_York', label: 'New York (EST/EDT)' },
  { value: 'Europe/Paris', label: 'Paris (CET/CEST)' },
  { value: 'Europe/Zurich', label: 'Zurich (CET/CEST)' },
]

const languageOptions = [
  { value: 'en-GB', label: 'English (UK)' },
  { value: 'en-US', label: 'English (US)' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [companySettings, setCompanySettings] = useState({
    name: 'G. Collins & Sons',
    legalName: 'G. Collins & Sons Ltd',
    vatNumber: 'GB 123 4567 89',
    registrationNumber: '01234567',
    email: 'info@gcollinsandsons.com',
    phone: '+44 20 1234 5678',
    website: 'https://gcollinsandsons.com',
    address: '4 Old Bond Street',
    city: 'London',
    postcode: 'W1S 4PD',
    country: 'United Kingdom',
    currency: 'GBP',
    timezone: 'Europe/London',
    language: 'en-GB',
  })

  const [profileSettings, setProfileSettings] = useState({
    firstName: 'James',
    lastName: 'Collins',
    email: 'james@gcollinsandsons.com',
    phone: '+44 7700 900000',
    jobTitle: 'Managing Director',
    department: 'Management',
  })

  const [notifications, setNotifications] = useState({
    emailOrders: true,
    emailInventory: true,
    emailAppointments: true,
    emailRepairs: false,
    pushOrders: true,
    pushAppointments: true,
    smsUrgent: true,
  })

  const renderProfileTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Personal Information</CardTitle>
          <CardDescription>Update your personal details and contact information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">First Name</label>
              <Input
                value={profileSettings.firstName}
                onChange={(e) => setProfileSettings({ ...profileSettings, firstName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Last Name</label>
              <Input
                value={profileSettings.lastName}
                onChange={(e) => setProfileSettings({ ...profileSettings, lastName: e.target.value })}
              />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address</label>
              <Input
                type="email"
                value={profileSettings.email}
                onChange={(e) => setProfileSettings({ ...profileSettings, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone Number</label>
              <Input
                value={profileSettings.phone}
                onChange={(e) => setProfileSettings({ ...profileSettings, phone: e.target.value })}
              />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Job Title</label>
              <Input
                value={profileSettings.jobTitle}
                onChange={(e) => setProfileSettings({ ...profileSettings, jobTitle: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Department</label>
              <Input
                value={profileSettings.department}
                onChange={(e) => setProfileSettings({ ...profileSettings, department: e.target.value })}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button>Save Changes</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Password</CardTitle>
          <CardDescription>Change your account password</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Current Password</label>
            <Input type="password" placeholder="Enter current password" />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">New Password</label>
              <Input type="password" placeholder="Enter new password" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Confirm New Password</label>
              <Input type="password" placeholder="Confirm new password" />
            </div>
          </div>
          <div className="flex justify-end">
            <Button variant="outline">Update Password</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderCompanyTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Company Details</CardTitle>
          <CardDescription>Business information and legal details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Company Name</label>
              <Input
                value={companySettings.name}
                onChange={(e) => setCompanySettings({ ...companySettings, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Legal Name</label>
              <Input
                value={companySettings.legalName}
                onChange={(e) => setCompanySettings({ ...companySettings, legalName: e.target.value })}
              />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">VAT Number</label>
              <Input
                value={companySettings.vatNumber}
                onChange={(e) => setCompanySettings({ ...companySettings, vatNumber: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Company Registration</label>
              <Input
                value={companySettings.registrationNumber}
                onChange={(e) =>
                  setCompanySettings({ ...companySettings, registrationNumber: e.target.value })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Contact Information</CardTitle>
          <CardDescription>Business contact details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                value={companySettings.email}
                onChange={(e) => setCompanySettings({ ...companySettings, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone</label>
              <Input
                value={companySettings.phone}
                onChange={(e) => setCompanySettings({ ...companySettings, phone: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Website</label>
            <Input
              value={companySettings.website}
              onChange={(e) => setCompanySettings({ ...companySettings, website: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Store Address</CardTitle>
          <CardDescription>Primary business location</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Street Address</label>
            <Input
              value={companySettings.address}
              onChange={(e) => setCompanySettings({ ...companySettings, address: e.target.value })}
            />
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">City</label>
              <Input
                value={companySettings.city}
                onChange={(e) => setCompanySettings({ ...companySettings, city: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Postcode</label>
              <Input
                value={companySettings.postcode}
                onChange={(e) => setCompanySettings({ ...companySettings, postcode: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Country</label>
              <Input
                value={companySettings.country}
                onChange={(e) => setCompanySettings({ ...companySettings, country: e.target.value })}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button>Save Changes</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Regional Settings</CardTitle>
          <CardDescription>Currency, timezone, and language preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Default Currency</label>
              <Select
                options={currencyOptions}
                value={companySettings.currency}
                onChange={(e) => setCompanySettings({ ...companySettings, currency: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Timezone</label>
              <Select
                options={timezoneOptions}
                value={companySettings.timezone}
                onChange={(e) => setCompanySettings({ ...companySettings, timezone: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Language</label>
              <Select
                options={languageOptions}
                value={companySettings.language}
                onChange={(e) => setCompanySettings({ ...companySettings, language: e.target.value })}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button>Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderUsersTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg">Team Members</CardTitle>
            <CardDescription>Manage users and their access permissions</CardDescription>
          </div>
          <Button>
            <User className="mr-2 h-4 w-4" />
            Invite User
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-sm font-medium">
                    {member.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-slate-500">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <Badge variant={roleColors[member.role]}>{roleLabels[member.role]}</Badge>
                    <p className="mt-1 text-xs text-slate-500">Last active: {member.lastActive}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Role Permissions</CardTitle>
          <CardDescription>Configure access levels for each role</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Administrator</p>
                  <p className="text-sm text-slate-500">Full system access</p>
                </div>
                <Badge>1 user</Badge>
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Store Manager</p>
                  <p className="text-sm text-slate-500">Sales, inventory, customers</p>
                </div>
                <Badge>1 user</Badge>
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Sales Associate</p>
                  <p className="text-sm text-slate-500">Sales and customer access</p>
                </div>
                <Badge>2 users</Badge>
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Workshop Manager</p>
                  <p className="text-sm text-slate-500">Repairs and manufacturing</p>
                </div>
                <Badge>1 user</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Email Notifications</CardTitle>
          <CardDescription>Configure email alerts and updates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { key: 'emailOrders', label: 'Order updates', desc: 'New orders, status changes, and completions' },
            { key: 'emailInventory', label: 'Inventory alerts', desc: 'Low stock warnings and reorder reminders' },
            { key: 'emailAppointments', label: 'Appointment reminders', desc: 'Upcoming appointments and changes' },
            { key: 'emailRepairs', label: 'Repair updates', desc: 'Repair status changes and completions' },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="font-medium">{item.label}</p>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={notifications[item.key as keyof typeof notifications] as boolean}
                  onChange={(e) =>
                    setNotifications({ ...notifications, [item.key]: e.target.checked })
                  }
                />
                <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-amber-500 peer-checked:after:translate-x-full"></div>
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Push Notifications</CardTitle>
          <CardDescription>Browser and mobile push notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { key: 'pushOrders', label: 'New orders', desc: 'Instant notification for new orders' },
            { key: 'pushAppointments', label: 'Appointment alerts', desc: 'Reminders 30 minutes before' },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="font-medium">{item.label}</p>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={notifications[item.key as keyof typeof notifications] as boolean}
                  onChange={(e) =>
                    setNotifications({ ...notifications, [item.key]: e.target.checked })
                  }
                />
                <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-amber-500 peer-checked:after:translate-x-full"></div>
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">SMS Notifications</CardTitle>
          <CardDescription>Critical alerts via text message</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <p className="font-medium">Urgent alerts only</p>
              <p className="text-sm text-slate-500">High-value orders, security alerts, critical issues</p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                className="peer sr-only"
                checked={notifications.smsUrgent}
                onChange={(e) => setNotifications({ ...notifications, smsUrgent: e.target.checked })}
              />
              <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-amber-500 peer-checked:after:translate-x-full"></div>
            </label>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Two-Factor Authentication</CardTitle>
          <CardDescription>Add an extra layer of security to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 p-4">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-green-600" />
              <div>
                <p className="font-medium text-green-900">2FA is enabled</p>
                <p className="text-sm text-green-700">Your account is protected with authenticator app</p>
              </div>
            </div>
            <Button variant="outline">Manage</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Active Sessions</CardTitle>
          <CardDescription>Manage your active login sessions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                <Globe className="h-5 w-5 text-slate-600" />
              </div>
              <div>
                <p className="font-medium">Chrome on macOS</p>
                <p className="text-sm text-slate-500">London, UK - Current session</p>
              </div>
            </div>
            <Badge variant="success">Active</Badge>
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                <Smartphone className="h-5 w-5 text-slate-600" />
              </div>
              <div>
                <p className="font-medium">Safari on iPhone</p>
                <p className="text-sm text-slate-500">London, UK - 2 hours ago</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Revoke
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">API Keys</CardTitle>
          <CardDescription>Manage API access for integrations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <Key className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="font-medium">E-commerce Integration</p>
                  <p className="text-sm text-slate-500">Created: 15 Jan 2024 - Last used: Today</p>
                </div>
              </div>
              <div className="flex gap-2">
                <code className="rounded bg-slate-100 px-2 py-1 text-xs">gcs_****_7x9k</code>
                <Button variant="outline" size="sm">
                  Regenerate
                </Button>
              </div>
            </div>
            <Button variant="outline">
              <Key className="mr-2 h-4 w-4" />
              Create New API Key
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderBillingTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Current Plan</CardTitle>
          <CardDescription>Your subscription and billing details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between rounded-lg border-2 border-amber-200 bg-amber-50 p-6">
            <div>
              <Badge className="mb-2 bg-amber-500">Enterprise</Badge>
              <p className="text-2xl font-bold">£499/month</p>
              <p className="text-sm text-slate-600">Unlimited users, all features, priority support</p>
            </div>
            <Button variant="outline">Manage Plan</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Payment Method</CardTitle>
          <CardDescription>Manage your billing information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                <CreditCard className="h-5 w-5 text-slate-600" />
              </div>
              <div>
                <p className="font-medium">Visa ending in 4242</p>
                <p className="text-sm text-slate-500">Expires 12/2026</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Update
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Billing History</CardTitle>
          <CardDescription>Download past invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { date: '1 Jan 2024', amount: '£499.00', status: 'Paid' },
              { date: '1 Dec 2023', amount: '£499.00', status: 'Paid' },
              { date: '1 Nov 2023', amount: '£499.00', status: 'Paid' },
            ].map((invoice, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-slate-400" />
                  <div>
                    <p className="font-medium">{invoice.date}</p>
                    <p className="text-sm text-slate-500">{invoice.amount}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="success">{invoice.status}</Badge>
                  <Button variant="outline" size="sm">
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderIntegrationsTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Connected Services</CardTitle>
          <CardDescription>Manage third-party integrations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium">Xero Accounting</p>
                <p className="text-sm text-slate-500">Sync invoices and financial data</p>
              </div>
            </div>
            <Badge variant="success">Connected</Badge>
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                <Mail className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium">Mailchimp</p>
                <p className="text-sm text-slate-500">Email marketing campaigns</p>
              </div>
            </div>
            <Badge variant="success">Connected</Badge>
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                <Store className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Shopify</p>
                <p className="text-sm text-slate-500">E-commerce platform sync</p>
              </div>
            </div>
            <Badge variant="success">Connected</Badge>
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                <Database className="h-5 w-5 text-slate-600" />
              </div>
              <div>
                <p className="font-medium">GIA Diamond Check</p>
                <p className="text-sm text-slate-500">Verify diamond certifications</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Connect
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Webhooks</CardTitle>
          <CardDescription>Configure event notifications to external services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="font-medium">Order Created</p>
                <code className="text-xs text-slate-500">https://api.example.com/webhooks/orders</code>
              </div>
              <Badge variant="success">Active</Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="font-medium">Customer Updated</p>
                <code className="text-xs text-slate-500">https://api.example.com/webhooks/customers</code>
              </div>
              <Badge variant="success">Active</Badge>
            </div>
            <Button variant="outline">
              <Webhook className="mr-2 h-4 w-4" />
              Add Webhook
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileTab()
      case 'company':
        return renderCompanyTab()
      case 'users':
        return renderUsersTab()
      case 'notifications':
        return renderNotificationsTab()
      case 'security':
        return renderSecurityTab()
      case 'billing':
        return renderBillingTab()
      case 'integrations':
        return renderIntegrationsTab()
      default:
        return renderProfileTab()
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-slate-500">Manage your account and system preferences</p>
      </div>

      {/* Settings Layout */}
      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-56 shrink-0">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-amber-50 text-amber-700'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">{renderContent()}</div>
      </div>
    </div>
  )
}
