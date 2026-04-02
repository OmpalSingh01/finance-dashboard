import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import useFinanceStore from '../store/useFinanceStore'

const COLORS = ['#0f172a', '#475569', '#94a3b8', '#cbd5e1', '#e2e8f0']

export default function ExpensePieChart() {
  const { transactions } = useFinanceStore()

  // Group expenses by category
  const expenseMap = {}
  transactions.forEach((tx) => {
    if (tx.type === 'expense') {
      expenseMap[tx.category] = (expenseMap[tx.category] || 0) + tx.amount
    }
  })

  const pieData = Object.entries(expenseMap).map(([name, value]) => ({
    name,
    value
  }))

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm h-96">
      <h2 className="mb-4 text-lg font-semibold text-slate-800">
        Spending Breakdown
      </h2>

      {pieData.length > 0 ? (
        <ResponsiveContainer width="100%" height="85%">
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, 'Amount']} />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex h-3/4 items-center justify-center">
          <p className="text-slate-500">No expense data available</p>
        </div>
      )}
    </div>
  )
}