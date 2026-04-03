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
  const [range, setRange] = useState('lastMonth')

  const filteredTransactions = useMemo(() => {
    const now = new Date()

    return transactions.filter((tx) => {
      const txDate = new Date(tx.date)

      switch (range) {
        case 'lastMonth': {
          const lastMonth = new Date()
          lastMonth.setMonth(now.getMonth() - 1)
          return (
            txDate.getMonth() === lastMonth.getMonth() &&
            txDate.getFullYear() === lastMonth.getFullYear()
          )
        }

        case 'lastYear':
          return txDate.getFullYear() === now.getFullYear() - 1

        case '2025':
          return txDate.getFullYear() === 2025

        case '2024':
          return txDate.getFullYear() === 2024

        default:
          return true
      }
    })
  }, [transactions, range])

  const sortedTransactions = [...filteredTransactions].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  )

  const chartData = sortedTransactions.reduce((acc, tx) => {
    const lastBalance = acc.length > 0 ? acc[acc.length - 1].balance : 0
    const newBalance =
      lastBalance + (tx.type === 'income' ? tx.amount : -tx.amount)

    acc.push({
      date: new Date(tx.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
      balance: newBalance,
    })

    return acc
  }, [])

  return (
    <div className="h-96 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
          Balance Trend
        </h2>

        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
        >
          <option value="lastMonth">Last Month</option>
          <option value="lastYear">Last Year</option>
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
              stroke="#e2e8f0"
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
              contentStyle={{
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
              }}
              formatter={(value) => [`₹${value.toLocaleString()}`, 'Balance']}
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
          <p className="text-slate-500 dark:text-slate-400">
            No transaction data available
          </p>
        </div>
      )}
    </div>
  )
}