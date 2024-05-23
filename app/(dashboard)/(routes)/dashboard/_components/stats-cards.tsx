import { getBalanceStatsResponseType } from '@/app/api/stats/balance/route'
import SkeletonWrapper from '@/components/skeleton-wrapper'
import { Card } from '@/components/ui/card'
import { DateToUTCDate, getFormatterForCurrency } from '@/lib/helpers'
import { UserSettings } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { TrendingDown, TrendingUp, Wallet } from 'lucide-react'
import React, { ReactNode, useCallback, useMemo } from 'react'
import CountUp from 'react-countup'

interface StatsCardsProps {
  userSettings: UserSettings
  from: Date
  to: Date
}

export default function StatsCards({userSettings, from, to}: StatsCardsProps) {
  const statsQuery = useQuery<getBalanceStatsResponseType>({
    queryKey: ["overview", "stats", from, to],
    queryFn: () => 
      fetch(
        `/api/stats/balance?from=${DateToUTCDate(from)}&to=${DateToUTCDate(to)}`
      ).then((res) => res.json())
  })

  const formatter = useMemo(() => {
    return getFormatterForCurrency(userSettings.currency)
  },[userSettings.currency])

  const income = statsQuery.data?.income || 0
  const expense = statsQuery.data?.expense || 0

  const balance = income - expense

  return (
    <div className='relative flex w-full flex-wrap gap-2 md:flex-nowrap'>
      <SkeletonWrapper isLoading={statsQuery.isFetching} >
        <StatCard
          formatter={formatter}
          value={income}
          title="Revenus"
          icon={
            <TrendingUp className='h-12 w-12 items-center rounded-lg p-2 text-emerald-500 bg-emerald-400/10' />
          }
        />
      </SkeletonWrapper>

      <SkeletonWrapper isLoading={statsQuery.isFetching} >
        <StatCard
          formatter={formatter}
          value={expense}
          title="Dépenses"
          icon={
            <TrendingDown className='h-12 w-12 items-center rounded-lg p-2 text-rose-500 bg-rose-400/10' />
          }
        />
      </SkeletonWrapper>

      <SkeletonWrapper isLoading={statsQuery.isFetching} >
        <StatCard
          formatter={formatter}
          value={balance}
          title="Solde"
          icon={
            <Wallet className='h-12 w-12 items-center rounded-lg p-2 text-blue-500 bg-blue-400/10' />
          }
        />
      </SkeletonWrapper>
    </div>
  )
}

function StatCard({formatter, value, title, icon}: {
  formatter: Intl.NumberFormat
  value: number
  icon: ReactNode
  title: string
}) {
  const formatFn = useCallback((value: number) => {
    return formatter.format(value)
  },[formatter])

  return (
    <Card className='flex h-24 w-full items-center gap-2 p-4'>
      {icon}
      <div className="flex flex-col gap-0">
        <p className="text-muted-foreground">{title}</p>
        <CountUp
          preserveValue
          redraw={false}
          end={value}
          decimals={2}
          formattingFn={formatFn}
          className="text-xl lg:text-2xl"
        />
      </div>
    </Card>
  
  )
}
