import useFinanceStore from '../store/useFinanceStore'

export default function InsightsPanel() {
  const { getInsights, getSummary, transactions } = useFinanceStore()

  const insights = getInsights()
  const summary = getSummary()

  // Calculate monthly insights
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()

  const currentMonthTransactions = transactions.filter(tx => {
    const txDate = new Date(tx.date)
    return txDate.getMonth() === currentMonth && txDate.getFullYear() === currentYear
  })

  const currentMonthIncome = currentMonthTransactions
    .filter(tx => tx.type === 'income')
    .reduce((sum, tx) => sum + tx.amount, 0)

  const currentMonthExpenses = currentMonthTransactions
    .filter(tx => tx.type === 'expense')
    .reduce((sum, tx) => sum + tx.amount, 0)

  const avgTransactionAmount = transactions.length > 0
    ? transactions.reduce((sum, tx) => sum + tx.amount, 0) / transactions.length
    : 0

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-800">
        Smart Insights
      </h2>
      <p className="mb-4 text-sm text-slate-500">
        Useful financial observations based on your activity
      </p>

      <div className="space-y-3 text-sm text-slate-700">
        <p>
          📈 <span className="font-semibold">Highest spending category:</span>{' '}
          {insights.highestCategory} (₹{insights.highestAmount.toLocaleString()})
        </p>

        <p>
          💰 <span className="font-semibold">Current month income:</span>{' '}
          ₹{currentMonthIncome.toLocaleString()}
        </p>

        <p>
          💸 <span className="font-semibold">Current month expenses:</span>{' '}
          ₹{currentMonthExpenses.toLocaleString()}
        </p>

        <p>
          📊 <span className="font-semibold">Average transaction:</span>{' '}
          ₹{avgTransactionAmount.toLocaleString()}
        </p>

        <p>
          🎯 <span className="font-semibold">Total transactions:</span>{' '}
          {insights.totalTransactions}
        </p>

        {summary.balance >= 0 ? (
          <p>
            ✅ <span className="font-semibold text-green-600">Positive balance:</span>{' '}
            ₹{summary.balance.toLocaleString()}
          </p>
        ) : (
          <p>
            ⚠️ <span className="font-semibold text-red-600">Negative balance:</span>{' '}
            ₹{Math.abs(summary.balance).toLocaleString()}
          </p>
        )}
      </div>
    </div>
  )
}