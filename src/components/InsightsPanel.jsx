import { TrendingUp, TrendingDown, Target, DollarSign, PieChart, Calendar, AlertTriangle, CheckCircle, BarChart3, Wallet, CreditCard, PiggyBank } from 'lucide-react'
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

  const getSavingsRateColor = (rate) => {
    const numRate = parseFloat(rate)
    if (numRate >= 20) return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20'
    if (numRate >= 10) return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20'
    return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20'
  }

  const getExpenseRatioColor = (ratio) => {
    const numRatio = parseFloat(ratio)
    if (numRatio <= 70) return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20'
    if (numRatio <= 90) return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20'
    return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20'
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Smart Insights
          </h2>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Advanced financial analysis and personalized recommendations
        </p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {/* Savings Rate */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-100 dark:border-blue-800">
          <div className="flex items-center justify-between mb-2">
            <PiggyBank className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSavingsRateColor(savingsRate)}`}>
              {savingsRate}%
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Savings Rate</p>
          <p className="text-lg font-bold text-slate-900 dark:text-white">
            {savingsRate}%
          </p>
        </div>

        {/* Expense Ratio */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4 border border-purple-100 dark:border-purple-800">
          <div className="flex items-center justify-between mb-2">
            <PieChart className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getExpenseRatioColor(expenseToIncomeRatio)}`}>
              {expenseToIncomeRatio}%
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Expense Ratio</p>
          <p className="text-lg font-bold text-slate-900 dark:text-white">
            {expenseToIncomeRatio}%
          </p>
        </div>

        {/* Spending Trend */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border border-green-100 dark:border-green-800">
          <div className="flex items-center justify-between mb-2">
            {parseFloat(spendingTrend) > 0 ? (
              <TrendingUp className="h-5 w-5 text-red-500" />
            ) : (
              <TrendingDown className="h-5 w-5 text-green-500" />
            )}
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              parseFloat(spendingTrend) > 0
                ? 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20'
                : 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20'
            }`}>
              {spendingTrend > 0 ? '+' : ''}{spendingTrend}%
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Monthly Trend</p>
          <p className="text-lg font-bold text-slate-900 dark:text-white">
            vs Last Month
          </p>
        </div>

        {/* Daily Average */}
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl p-4 border border-orange-100 dark:border-orange-800">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            <span className="px-2 py-1 rounded-full text-xs font-medium text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20">
              Daily
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Avg Spending</p>
          <p className="text-lg font-bold text-slate-900 dark:text-white">
            ₹{dailyAvgSpending.toLocaleString(undefined, {maximumFractionDigits: 0})}
          </p>
        </div>
      </div>

      {/* Detailed Insights */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Financial Overview */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <Wallet className="h-4 w-4" />
            Financial Overview
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span className="text-sm text-slate-700 dark:text-slate-300">Monthly Income</span>
              </div>
              <span className="font-semibold text-slate-900 dark:text-white">
                ₹{currentMonthIncome.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-red-600 dark:text-red-400" />
                <span className="text-sm text-slate-700 dark:text-slate-300">Monthly Expenses</span>
              </div>
              <span className="font-semibold text-slate-900 dark:text-white">
                ₹{currentMonthExpenses.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm text-slate-700 dark:text-slate-300">Avg Transaction</span>
              </div>
              <span className="font-semibold text-slate-900 dark:text-white">
                ₹{avgTransactionAmount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Category Insights */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            Category Insights
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
              <span className="text-sm text-slate-700 dark:text-slate-300">Top Category</span>
              <div className="text-right">
                <div className="font-semibold text-slate-900 dark:text-white">{insights.highestCategory}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  ₹{insights.highestAmount.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
              <span className="text-sm text-slate-700 dark:text-slate-300">Most Frequent</span>
              <span className="font-semibold text-slate-900 dark:text-white">{mostFrequentCategory}</span>
            </div>

            <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
              <span className="text-sm text-slate-700 dark:text-slate-300">Income Sources</span>
              <span className="font-semibold text-slate-900 dark:text-white">
                {incomeSources} {incomeSources === 1 ? 'source' : 'sources'}
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
              <span className="text-sm text-slate-700 dark:text-slate-300">Expense Categories</span>
              <span className="font-semibold text-slate-900 dark:text-white">{expenseCategories} categories</span>
            </div>

            {largestExpense && (
              <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                <span className="text-sm text-slate-700 dark:text-slate-300">Largest Expense</span>
                <div className="text-right">
                  <div className="font-semibold text-slate-900 dark:text-white">
                    ₹{largestExpense.amount.toLocaleString()}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {largestExpense.category}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Balance Status Banner */}
      <div className="mt-6 p-4 rounded-xl border-2 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-700/50 dark:to-slate-600/50 border-slate-200 dark:border-slate-600">
        {summary.balance >= 0 ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">
                  Positive Balance: ₹{summary.balance.toLocaleString()}
                </p>
                {parseFloat(savingsRate) >= 20 && (
                  <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                    🎉 Excellent saving habits!
                  </p>
                )}
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {insights.totalTransactions} transactions
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">
                  Negative Balance: ₹{Math.abs(summary.balance).toLocaleString()}
                </p>
                <p className="text-sm text-yellow-600 dark:text-yellow-400 font-medium">
                  Consider reviewing your expenses
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {insights.totalTransactions} transactions
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}