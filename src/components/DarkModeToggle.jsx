import { Moon, Sun } from 'lucide-react'
import useFinanceStore from '../store/useFinanceStore'

export default function DarkModeToggle() {
  const { darkMode, toggleDarkMode } = useFinanceStore()

  return (
    <button
      onClick={toggleDarkMode}
      className="rounded-lg border border-slate-200 bg-white p-2 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
      aria-label="Toggle dark mode"
    >
      {darkMode ? (
        <Sun className="h-5 w-5 text-slate-600 dark:text-slate-300" />
      ) : (
        <Moon className="h-5 w-5 text-slate-600 dark:text-slate-300" />
      )}
    </button>
  )
}