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

  // Calculate previous month data
  const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1
  const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear

  const prevMonthTransactions = transactions.filter(tx => {
    const txDate = new Date(tx.date)
    return txDate.getMonth() === prevMonth && txDate.getFullYear() === prevYear
  })

  const prevMonthExpenses = prevMonthTransactions
    .filter(tx => tx.type === 'expense')
    .reduce((sum, tx) => sum + tx.amount, 0)

  // Enhanced calculations
  const avgTransactionAmount = transactions.length > 0
    ? transactions.reduce((sum, tx) => sum + tx.amount, 0) / transactions.length
    : 0

  // Expense-to-Income ratio
  const expenseToIncomeRatio = currentMonthIncome > 0
    ? (currentMonthExpenses / currentMonthIncome * 100).toFixed(1)
    : 0

  // Savings rate
  const savingsRate = currentMonthIncome > 0
    ? ((currentMonthIncome - currentMonthExpenses) / currentMonthIncome * 100).toFixed(1)
    : 0

  // Most frequent category
  const categoryFrequency = {}
  transactions.forEach(tx => {
    if (tx.type === 'expense') {
      categoryFrequency[tx.category] = (categoryFrequency[tx.category] || 0) + 1
    }
  })
  const mostFrequentCategory = Object.entries(categoryFrequency)
    .sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A'

  // Largest transaction
  const largestExpense = transactions
    .filter(tx => tx.type === 'expense')
    .sort((a, b) => b.amount - a.amount)[0]

  // Daily average spending (current month)
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const dailyAvgSpending = currentMonthExpenses / daysInMonth

  // Income diversity
  const incomeSources = new Set(
    transactions.filter(tx => tx.type === 'income').map(tx => tx.category)
  ).size

  // Expense categories count
  const expenseCategories = new Set(
    transactions.filter(tx => tx.type === 'expense').map(tx => tx.category)
  ).size

  // Spending trend
  const spendingTrend = prevMonthExpenses > 0
    ? ((currentMonthExpenses - prevMonthExpenses) / prevMonthExpenses * 100).toFixed(1)
    : 0

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
        Smart Insights
      </h2>
      <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
        Advanced financial analysis and recommendations
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Primary Insights */}
        <div className="space-y-3">
          <p>
            📈 <span className="font-semibold">Top spending category:</span>{' '}
            {insights.highestCategory} (₹{insights.highestAmount.toLocaleString()})
          </p>

          <p>
            🎯 <span className="font-semibold">Most frequent category:</span>{' '}
            {mostFrequentCategory}
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
        </div>

        {/* Advanced Insights */}
        <div className="space-y-3">
          <p>
            📈 <span className="font-semibold">Monthly spending trend:</span>{' '}
            <span className={spendingTrend > 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}>
              {spendingTrend > 0 ? '+' : ''}{spendingTrend}%
            </span>{' '}
            vs last month
          </p>

          <p>
            💾 <span className="font-semibold">Savings rate:</span>{' '}
            <span className={parseFloat(savingsRate) >= 20 ? 'text-green-600 dark:text-green-400' : parseFloat(savingsRate) >= 10 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'}>
              {savingsRate}%
            </span>
          </p>

          <p>
            📊 <span className="font-semibold">Expense-to-income ratio:</span>{' '}
            <span className={parseFloat(expenseToIncomeRatio) <= 70 ? 'text-green-600 dark:text-green-400' : parseFloat(expenseToIncomeRatio) <= 90 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'}>
              {expenseToIncomeRatio}%
            </span>
          </p>

          <p>
            💵 <span className="font-semibold">Daily avg spending:</span>{' '}
            ₹{dailyAvgSpending.toLocaleString(undefined, {maximumFractionDigits: 0})}
          </p>

          <p>
            🎪 <span className="font-semibold">Income sources:</span>{' '}
            {incomeSources} {incomeSources === 1 ? 'source' : 'sources'}
          </p>

          <p>
            🏷️ <span className="font-semibold">Expense categories:</span>{' '}
            {expenseCategories} categories
          </p>

          {largestExpense && (
            <p>
              💥 <span className="font-semibold">Largest expense:</span>{' '}
              ₹{largestExpense.amount.toLocaleString()} ({largestExpense.category})
            </p>
          )}
        </div>
      </div>

      {/* Balance Status */}
      <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
        {summary.balance >= 0 ? (
          <p className="text-center">
            ✅ <span className="font-semibold text-green-600 dark:text-green-400">Positive balance:</span>{' '}
            ₹{summary.balance.toLocaleString()}
            {parseFloat(savingsRate) >= 20 && (
              <span className="ml-2 text-sm text-green-600 dark:text-green-400">🎉 Great saving habits!</span>
            )}
          </p>
        ) : (
          <p className="text-center">
            ⚠️ <span className="font-semibold text-red-600 dark:text-red-400">Negative balance:</span>{' '}
            ₹{Math.abs(summary.balance).toLocaleString()}
            <span className="ml-2 text-sm text-yellow-600 dark:text-yellow-400">Consider reviewing expenses</span>
          </p>
        )}
      </div>
    </div>
  )
}