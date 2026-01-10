import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(
  amount: number | string | null | undefined,
  currency: string = 'GBP'
): string {
  if (amount === null || amount === undefined) return 'POA'

  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount

  const currencyMap: Record<string, { locale: string; currency: string }> = {
    GBP: { locale: 'en-GB', currency: 'GBP' },
    USD: { locale: 'en-US', currency: 'USD' },
    EUR: { locale: 'de-DE', currency: 'EUR' },
    CHF: { locale: 'de-CH', currency: 'CHF' },
  }

  const config = currencyMap[currency] || currencyMap.GBP

  return new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: config.currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(numAmount)
}

export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return '-'
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(d)
}

export function formatDateTime(date: Date | string | null | undefined): string {
  if (!date) return '-'
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d)
}

export function generateOrderNumber(): string {
  const date = new Date()
  const year = date.getFullYear().toString().slice(-2)
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
  return `GCS-${year}${month}-${random}`
}

export function generateSKU(prefix: string = 'PRD'): string {
  const random = Math.floor(Math.random() * 100000).toString().padStart(5, '0')
  return `${prefix}-${random}`
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length) + '...'
}

export function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
}

export function calculateVATAmount(amount: number, vatRate: number = 20): number {
  return amount * (vatRate / 100)
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}
