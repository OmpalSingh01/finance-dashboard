import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from 'recharts'
import useFinanceStore from '../store/useFinanceStore'

const COLORS = [
  '#2563eb',
  '#7c3aed',
  '#059669',
  '#ea580c',
  '#dc2626',
  '#0891b2',
]

export default function ExpensePieChart() {
  const { transactions } = useFinanceStore()

  const expenseMap = {}

  transactions.forEach((tx) => {
    if (tx.type === 'expense') {
      expenseMap[tx.category] = (expenseMap[tx.category] || 0) + tx.amount
    }
  })

  const pieData = Object.entries(expenseMap).map(([name, value]) => ({
    name,
    value,
  }))

  const totalExpense = pieData.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="h-96 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all dark:border-slate-700 dark:bg-slate-800">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
          Spending Breakdown
        </h2>
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
          Total: ₹{totalExpense.toLocaleString()}
        </span>
      </div>

      {pieData.length > 0 ? (
        <ResponsiveContainer width="100%" height="85%">
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={4}
              cornerRadius={8}
              stroke="none"
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
              }}
              formatter={(value) => [`₹${value.toLocaleString()}`, 'Spent']}
            />

            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              wrapperStyle={{ paddingTop: '20px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex h-3/4 items-center justify-center">
          <p className="text-slate-500 dark:text-slate-400">
            No expense data available
          </p>
        </div>
      )}
    </div>
  )
}