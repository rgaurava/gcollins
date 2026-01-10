// Re-export Prisma types for convenience
export type {
  User,
  Customer,
  Product,
  Order,
  Vendor,
  Appointment,
  Repair,
  Stone,
  Watch,
  Category,
  Collection,
  InventoryItem,
  PurchaseOrder,
} from '@prisma/client'

// Extended types with relations
export interface CustomerWithRelations {
  id: string
  email: string | null
  firstName: string
  lastName: string
  phone: string | null
  whatsappNumber: string | null
  preferredContact: string
  addressLine1: string | null
  addressLine2: string | null
  city: string | null
  county: string | null
  postcode: string | null
  country: string
  customerType: string
  vipLevel: string
  source: string | null
  lifetimeValue: number
  totalOrders: number
  lastPurchaseDate: Date | null
  createdAt: Date
  updatedAt: Date
  assignedTo?: {
    id: string
    firstName: string
    lastName: string
  } | null
  orders?: OrderSummary[]
  interactions?: InteractionSummary[]
}

export interface OrderSummary {
  id: string
  orderNumber: string
  status: string
  totalAmount: number
  currency: string
  placedAt: Date
}

export interface InteractionSummary {
  id: string
  type: string
  subject: string
  createdAt: Date
}

export interface ProductWithRelations {
  id: string
  sku: string
  name: string
  slug: string
  description: string | null
  shortDescription: string | null
  price: number | null
  costPrice: number | null
  isPOA: boolean
  currency: string
  productType: string
  status: string
  metalType: string | null
  metalPurity: string | null
  isFeatured: boolean
  isNew: boolean
  isOnSale: boolean
  createdAt: Date
  updatedAt: Date
  category?: {
    id: string
    name: string
    slug: string
  } | null
  collection?: {
    id: string
    name: string
    slug: string
  } | null
  images?: ProductImageData[]
  inventoryItems?: InventoryItemSummary[]
}

export interface ProductImageData {
  id: string
  url: string
  altText: string | null
  sortOrder: number
  isPrimary: boolean
}

export interface InventoryItemSummary {
  id: string
  quantity: number
  reservedQty: number
  status: string
  location: {
    id: string
    name: string
    type: string
  }
}

export interface DashboardStats {
  totalRevenue: number
  revenueChange: number
  totalOrders: number
  ordersChange: number
  totalCustomers: number
  customersChange: number
  avgOrderValue: number
  aovChange: number
}

export interface TopProduct {
  id: string
  name: string
  sku: string
  totalSold: number
  revenue: number
  imageUrl?: string
}

export interface RecentOrder {
  id: string
  orderNumber: string
  customer: {
    firstName: string
    lastName: string
  }
  totalAmount: number
  currency: string
  status: string
  placedAt: Date
}

export interface LowStockItem {
  id: string
  name: string
  sku: string
  quantity: number
  location: string
}

export interface UpcomingAppointment {
  id: string
  title: string
  type: string
  startTime: Date
  customer: {
    firstName: string
    lastName: string
  }
  host: {
    firstName: string
    lastName: string
  }
}

// Form types
export interface CustomerFormData {
  email?: string
  firstName: string
  lastName: string
  phone?: string
  whatsappNumber?: string
  preferredContact: string
  addressLine1?: string
  addressLine2?: string
  city?: string
  county?: string
  postcode?: string
  country: string
  customerType: string
  vipLevel: string
  source?: string
  dateOfBirth?: Date
  anniversary?: Date
  assignedToId?: string
}

export interface ProductFormData {
  sku: string
  name: string
  description?: string
  shortDescription?: string
  price?: number
  costPrice?: number
  isPOA: boolean
  currency: string
  productType: string
  status: string
  categoryId?: string
  collectionId?: string
  metalType?: string
  metalPurity?: string
  isFeatured: boolean
  isNew: boolean
  isOnSale: boolean
}

export interface OrderFormData {
  customerId: string
  orderType: string
  channel: string
  items: OrderItemFormData[]
  shippingName?: string
  shippingLine1?: string
  shippingLine2?: string
  shippingCity?: string
  shippingCounty?: string
  shippingPostcode?: string
  shippingCountry?: string
  customerNotes?: string
  internalNotes?: string
}

export interface OrderItemFormData {
  productId?: string
  variantId?: string
  sku: string
  name: string
  quantity: number
  unitPrice: number
  customization?: Record<string, unknown>
}

// API Response types
export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

// Filter types
export interface CustomerFilters {
  search?: string
  customerType?: string
  vipLevel?: string
  assignedToId?: string
}

export interface ProductFilters {
  search?: string
  categoryId?: string
  collectionId?: string
  productType?: string
  status?: string
  metalType?: string
  minPrice?: number
  maxPrice?: number
}

export interface OrderFilters {
  search?: string
  status?: string
  orderType?: string
  channel?: string
  customerId?: string
  dateFrom?: Date
  dateTo?: Date
}
