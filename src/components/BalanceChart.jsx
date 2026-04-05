import { useMemo, useState } from 'react'
import {
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'
import useFinanceStore from '../store/useFinanceStore'

export default function BalanceChart() {
  const { transactions } = useFinanceStore()
  const [range, setRange] = useState('all')

  const getTxDate = (tx) => new Date(tx.date || tx.datetime)

  const filteredTransactions = useMemo(() => {
    const now = new Date()

    return transactions.filter((tx) => {
      const txDate = getTxDate(tx)

      if (isNaN(txDate)) return false

      switch (range) {
        case 'all':
          return true

        case 'lastMonth': {
          const startOfLastMonth = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            1
          )

          const endOfLastMonth = new Date(
            now.getFullYear(),
            now.getMonth(),
            0,
            23,
            59,
            59
          )

          return txDate >= startOfLastMonth && txDate <= endOfLastMonth
        }

        case 'lastYear':
          return txDate.getFullYear() === now.getFullYear() - 1

        case '2026':
          return txDate.getFullYear() === 2026

        case '2025':
          return txDate.getFullYear() === 2025

        case '2024':
          return txDate.getFullYear() === 2024

        default:
          return true
      }
    })
  }, [transactions, range])

  const chartData = useMemo(() => {
    const sortedTransactions = [...filteredTransactions].sort(
      (a, b) => getTxDate(a).getTime() - getTxDate(b).getTime()
    )

    return sortedTransactions.reduce((acc, tx) => {
  const lastBalance =
    acc.length > 0 ? acc[acc.length - 1].balance : 0

  const newBalance =
    lastBalance + (tx.type === 'income' ? tx.amount : -tx.amount)

  const txDate = getTxDate(tx)

  acc.push({
    date: txDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    }),
    fullDate: txDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }),
    balance: newBalance,
  })

  return acc
    }, [])
  }, [filteredTransactions])

  return (
    <div className="h-96 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
          Balance Trend
        </h2>

        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
        >
          <option value="all">All</option>
          <option value="lastMonth">Last Month</option>
          <option value="lastYear">Last Year</option>
          <option value="2026">2026</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
        </select>
      </div>

      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height="85%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#2563eb" stopOpacity={0.03} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#334155"
              opacity={0.2}
            />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
            />

            <Tooltip
              labelFormatter={(label, payload) =>
                payload?.[0]?.payload?.fullDate || label
              }
              formatter={(value) => [
                `₹${Number(value).toLocaleString()}`,
                'Balance',
              ]}
            />

            <Area
                type="monotone"
                dataKey="balance"
                stroke="none"
                fill="url(#balanceGradient)"
                tooltipType="none"
              />

              <Line
                type="monotone"
                dataKey="balance"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
                activeDot={{ r: 6 }}
              />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex h-3/4 items-center justify-center">
          <p className="text-slate-500 dark:text-zinc-400">
            No transaction data available
          </p>
        </div>
      )}
    </div>
  )
}