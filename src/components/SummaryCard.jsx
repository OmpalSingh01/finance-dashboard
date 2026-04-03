import { Eye, EyeOff, Wallet } from 'lucide-react'
import useFinanceStore from '../store/useFinanceStore'

export default function SummaryCard({ title, value, subText }) {
  const { balanceVisible, toggleBalanceVisibility } = useFinanceStore()

  const isTotalBalance = title === 'Total Balance'

  const displayValue =
    isTotalBalance && !balanceVisible
      ? '••••••'
      : `₹${value.toLocaleString()}`

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800">
      {/* soft glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-slate-700/20" />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm font-medium tracking-wide text-slate-500 dark:text-slate-400">
            {title}
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            {displayValue}
          </h2>

          {subText && (
            <p className="mt-2 text-xs font-medium text-slate-400 dark:text-slate-500">
              {subText}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          {isTotalBalance && (
            <button
              onClick={toggleBalanceVisibility}
              className="rounded-xl p-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700"
              aria-label={balanceVisible ? 'Hide balance' : 'Show balance'}
            >
              {balanceVisible ? (
                <Eye className="h-4 w-4 text-slate-500 dark:text-slate-400" />
              ) : (
                <EyeOff className="h-4 w-4 text-slate-500 dark:text-slate-400" />
              )}
            </button>
          )}

          <div className="rounded-2xl bg-slate-100 p-3 dark:bg-slate-700">
            <Wallet className="h-5 w-5 text-slate-700 dark:text-slate-300" />
          </div>
        </div>
      </div>
    </div>
  )
}