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
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">{title}</p>
            <p className="mt-2 text-3xl font-bold">{value}</p>
            {change !== undefined && (
              <div className="mt-2 flex items-center text-sm">
                {isPositive && (
                  <>
                    <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                    <span className="text-green-500">+{change}%</span>
                  </>
                )}
                {isNegative && (
                  <>
                    <TrendingDown className="mr-1 h-4 w-4 text-red-500" />
                    <span className="text-red-500">{change}%</span>
                  </>
                )}
                {change === 0 && <span className="text-slate-500">0%</span>}
                {changeLabel && (
                  <span className="ml-1 text-slate-500">{changeLabel}</span>
                )}
              </div>
            )}
          </div>
          <div className={cn('rounded-full bg-slate-100 p-3', iconColor)}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
