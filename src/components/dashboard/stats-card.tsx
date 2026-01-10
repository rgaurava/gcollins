'use client'

import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface StatsCardProps {
  title: string
  value: string
  change?: number
  changeLabel?: string
  icon: LucideIcon
  iconColor?: string
}

export function StatsCard({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  iconColor = 'text-slate-600',
}: StatsCardProps) {
  const isPositive = change && change > 0
  const isNegative = change && change < 0

  return (
    <Card>
      <CardContent className="p-3 lg:p-6">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p className="text-xs lg:text-sm font-medium text-slate-500 truncate">{title}</p>
            <p className="mt-1 lg:mt-2 text-lg lg:text-3xl font-bold truncate">{value}</p>
            {change !== undefined && (
              <div className="mt-1 lg:mt-2 flex flex-wrap items-center text-xs lg:text-sm gap-1">
                {isPositive && (
                  <>
                    <TrendingUp className="h-3 w-3 lg:h-4 lg:w-4 text-green-500 flex-shrink-0" />
                    <span className="text-green-500">+{change}%</span>
                  </>
                )}
                {isNegative && (
                  <>
                    <TrendingDown className="h-3 w-3 lg:h-4 lg:w-4 text-red-500 flex-shrink-0" />
                    <span className="text-red-500">{change}%</span>
                  </>
                )}
                {change === 0 && <span className="text-slate-500">0%</span>}
                {changeLabel && (
                  <span className="text-slate-500 hidden sm:inline">{changeLabel}</span>
                )}
              </div>
            )}
          </div>
          <div className={cn('rounded-full bg-slate-100 p-2 lg:p-3 flex-shrink-0', iconColor)}>
            <Icon className="h-4 w-4 lg:h-6 lg:w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
