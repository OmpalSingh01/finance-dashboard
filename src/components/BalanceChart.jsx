import {
  LineChart,
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

  // Sort transactions by date
  const sortedTransactions = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date))

  // Calculate cumulative balance over time
  const chartData = sortedTransactions.reduce((acc, tx) => {
    const lastBalance = acc.length > 0 ? acc[acc.length - 1].balance : 0
    const newBalance = lastBalance + (tx.type === 'income' ? tx.amount : -tx.amount)

    acc.push({
      date: new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      balance: newBalance
    })

    return acc
  }, [])

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm h-96">
      <h2 className="mb-4 text-lg font-semibold text-slate-800">
        Balance Trend
      </h2>

      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="date" />
          <YAxis />

          <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, 'Balance']} />

          <Line
            type="monotone"
            dataKey="balance"
            stroke="#0f172a"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}