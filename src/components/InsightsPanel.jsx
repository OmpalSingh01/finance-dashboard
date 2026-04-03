import { useState } from 'react'
import {
  TrendingUp,
  TrendingDown,
  Target,
  DollarSign,
  PieChart,
  Calendar,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Wallet,
  CreditCard,
  PiggyBank,
} from 'lucide-react'
import useFinanceStore from '../store/useFinanceStore'

function InsightRow({ label, value, icon: Icon, color = '' }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3 dark:bg-slate-700/50">
      <div className="flex items-center gap-2">
        <Icon className={`h-4 w-4 ${color}`} />
        <span className="text-sm text-slate-700 dark:text-slate-300">
          {label}
        </span>
      </div>
      <span className="font-semibold text-slate-900 dark:text-white">
        {value}
      </span>
    </div>
  )
}

export default function InsightsPanel() {
  const { getInsights, getSummary, transactions } = useFinanceStore()
  const [showFinancial, setShowFinancial] = useState(true)
  const [showCategory, setShowCategory] = useState(false)

  const insights = getInsights()
  const summary = getSummary()

  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()

  const currentMonthTransactions = transactions.filter((tx) => {
    const txDate = new Date(tx.date)
    return (
      txDate.getMonth() === currentMonth &&
      txDate.getFullYear() === currentYear
    )
  })

  const currentMonthIncome = currentMonthTransactions
    .filter((tx) => tx.type === 'income')
    .reduce((sum, tx) => sum + tx.amount, 0)

  const currentMonthExpenses = currentMonthTransactions
    .filter((tx) => tx.type === 'expense')
    .reduce((sum, tx) => sum + tx.amount, 0)

  const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1
  const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear

  const prevMonthTransactions = transactions.filter((tx) => {
    const txDate = new Date(tx.date)
    return (
      txDate.getMonth() === prevMonth && txDate.getFullYear() === prevYear
    )
  })

  const prevMonthExpenses = prevMonthTransactions
    .filter((tx) => tx.type === 'expense')
    .reduce((sum, tx) => sum + tx.amount, 0)

  const avgTransactionAmount = transactions.length
    ? transactions.reduce((sum, tx) => sum + tx.amount, 0) /
      transactions.length
    : 0

  const expenseToIncomeRatio = currentMonthIncome
    ? ((currentMonthExpenses / currentMonthIncome) * 100).toFixed(1)
    : '0.0'

  const savingsRate = currentMonthIncome
    ? (((currentMonthIncome - currentMonthExpenses) / currentMonthIncome) *
        100).toFixed(1)
    : '0.0'

  const categoryFrequency = {}
  transactions.forEach((tx) => {
    if (tx.type === 'expense') {
      categoryFrequency[tx.category] =
        (categoryFrequency[tx.category] || 0) + 1
    }
  })

  const mostFrequentCategory =
    Object.entries(categoryFrequency).sort(([, a], [, b]) => b - a)[0]?.[0] ||
    'N/A'

  const largestExpense = transactions
    .filter((tx) => tx.type === 'expense')
    .sort((a, b) => b.amount - a.amount)[0]

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const dailyAvgSpending = currentMonthExpenses
    ? currentMonthExpenses / daysInMonth
    : 0

  const incomeSources = new Set(
    transactions
      .filter((tx) => tx.type === 'income')
      .map((tx) => tx.category)
  ).size

  const expenseCategories = new Set(
    transactions
      .filter((tx) => tx.type === 'expense')
      .map((tx) => tx.category)
  ).size

  const spendingTrend =
    prevMonthExpenses === 0
      ? currentMonthExpenses > 0
        ? 100
        : 0
      : (((currentMonthExpenses - prevMonthExpenses) /
          prevMonthExpenses) *
          100).toFixed(1)

  const getSavingsRateColor = (rate) => {
    const numRate = parseFloat(rate)
    if (numRate >= 20)
      return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20'
    if (numRate >= 10)
      return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20'
    return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20'
  }

  const getExpenseRatioColor = (ratio) => {
    const numRatio = parseFloat(ratio)
    if (numRatio <= 70)
      return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20'
    if (numRatio <= 90)
      return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20'
    return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20'
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="mb-6">
        <div className="mb-2 flex items-center gap-3">
          <div className="rounded-lg bg-blue-50 p-2 dark:bg-blue-900/20">
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

      <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-4 dark:border-blue-800 dark:from-blue-900/20 dark:to-indigo-900/20">
          <div className="mb-2 flex items-center justify-between">
            <PiggyBank className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <span className={`rounded-full px-2 py-1 text-xs font-medium ${getSavingsRateColor(savingsRate)}`}>
              {savingsRate}%
            </span>
          </div>
          <p className="mb-1 text-xs text-slate-600 dark:text-slate-400">Savings Rate</p>
          <p className="text-lg font-bold text-slate-900 dark:text-white">{savingsRate}%</p>
        </div>

        <div className="rounded-xl border border-purple-100 bg-gradient-to-br from-purple-50 to-pink-50 p-4 dark:border-purple-800 dark:from-purple-900/20 dark:to-pink-900/20">
          <div className="mb-2 flex items-center justify-between">
            <PieChart className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            <span className={`rounded-full px-2 py-1 text-xs font-medium ${getExpenseRatioColor(expenseToIncomeRatio)}`}>
              {expenseToIncomeRatio}%
            </span>
          </div>
          <p className="mb-1 text-xs text-slate-600 dark:text-slate-400">Expense Ratio</p>
          <p className="text-lg font-bold text-slate-900 dark:text-white">{expenseToIncomeRatio}%</p>
        </div>

        <div className="rounded-xl border border-green-100 bg-gradient-to-br from-green-50 to-emerald-50 p-4 dark:border-green-800 dark:from-green-900/20 dark:to-emerald-900/20">
          <div className="mb-2 flex items-center justify-between">
            {parseFloat(spendingTrend) > 0 ? (
              <TrendingUp className="h-5 w-5 text-red-500" />
            ) : (
              <TrendingDown className="h-5 w-5 text-green-500" />
            )}
            <span
              className={`rounded-full px-2 py-1 text-xs font-medium ${
                parseFloat(spendingTrend) > 0
                  ? 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20'
                  : 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20'
              }`}
            >
              {parseFloat(spendingTrend) > 0 ? '+' : ''}
              {spendingTrend}%
            </span>
          </div>
          <p className="mb-1 text-xs text-slate-600 dark:text-slate-400">Monthly Trend</p>
          <p className="text-lg font-bold text-slate-900 dark:text-white">vs Last Month</p>
        </div>

        <div className="rounded-xl border border-orange-100 bg-gradient-to-br from-orange-50 to-amber-50 p-4 dark:border-orange-800 dark:from-orange-900/20 dark:to-amber-900/20">
          <div className="mb-2 flex items-center justify-between">
            <Calendar className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            <span className="rounded-full bg-orange-50 px-2 py-1 text-xs font-medium text-orange-600 dark:bg-orange-900/20 dark:text-orange-400">
              Daily
            </span>
          </div>
          <p className="mb-1 text-xs text-slate-600 dark:text-slate-400">Avg Spending</p>
          <p className="text-lg font-bold text-slate-900 dark:text-white">
            ₹{dailyAvgSpending.toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <button
            onClick={() => setShowFinancial(!showFinancial)}
            className="flex w-full items-center justify-between text-left text-sm font-semibold text-slate-900 dark:text-white"
          >
            <span className="flex items-center gap-2">
              <Wallet className="h-4 w-4" /> Financial Overview
            </span>
            <span>{showFinancial ? '−' : '+'}</span>
          </button>

          <div className={`overflow-hidden transition-all duration-300 ${showFinancial ? 'max-h-[500px]' : 'max-h-0'}`}>
            <div className="space-y-3">
              <InsightRow label="Monthly Income" value={`₹${currentMonthIncome.toLocaleString()}`} icon={DollarSign} color="text-green-600 dark:text-green-400" />
              <InsightRow label="Monthly Expenses" value={`₹${currentMonthExpenses.toLocaleString()}`} icon={CreditCard} color="text-red-600 dark:text-red-400" />
              <InsightRow label="Avg Transaction" value={`₹${avgTransactionAmount.toLocaleString()}`} icon={Target} color="text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => setShowCategory(!showCategory)}
            className="flex w-full items-center justify-between text-left text-sm font-semibold text-slate-900 dark:text-white"
          >
            <span className="flex items-center gap-2">
              <PieChart className="h-4 w-4" /> Category Insights
            </span>
            <span>{showCategory ? '−' : '+'}</span>
          </button>

          <div className={`overflow-hidden transition-all duration-300 ${showCategory ? 'max-h-[700px]' : 'max-h-0'}`}>
            <div className="space-y-3">
              <InsightRow label="Top Category" value={`${insights.highestCategory} • ₹${insights.highestAmount.toLocaleString()}`} icon={PieChart} />
              <InsightRow label="Most Frequent" value={mostFrequentCategory} icon={PieChart} />
              <InsightRow label="Income Sources" value={`${incomeSources} ${incomeSources === 1 ? 'source' : 'sources'}`} icon={DollarSign} />
              <InsightRow label="Expense Categories" value={`${expenseCategories} categories`} icon={CreditCard} />
              {largestExpense && (
                <InsightRow
                  label="Largest Expense"
                  value={`₹${largestExpense.amount.toLocaleString()} • ${largestExpense.category}`}
                  icon={AlertTriangle}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-xl border-2 border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100 p-4 dark:border-slate-600 dark:from-slate-700/50 dark:to-slate-600/50">
        {summary.balance >= 0 ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">
                  Positive Balance: ₹{summary.balance.toLocaleString()}
                </p>
                {parseFloat(savingsRate) >= 20 && (
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">
                    🎉 Excellent saving habits!
                  </p>
                )}
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {insights.totalTransactions} transactions
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">
                  Negative Balance: ₹{Math.abs(summary.balance).toLocaleString()}
                </p>
                <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                  Consider reviewing your expenses
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {insights.totalTransactions} transactions
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
