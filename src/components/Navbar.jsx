import { useState } from 'react'
import { Menu, X, BarChart3, Moon, Sun } from 'lucide-react'
import useFinanceStore from '../store/useFinanceStore'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { darkMode, setDarkMode, role, setRole } = useFinanceStore()

  const toggleTheme = () => setDarkMode(!darkMode)
  const toggleRole = () => setRole(role === 'user' ? 'admin' : 'user')

  return (
    <nav
  className={`sticky top-0 z-50 border-b backdrop-blur-xl ${
    darkMode
      ? 'border-slate-700 bg-slate-900/80'
      : 'border-slate-200 bg-white/80'
  } shadow-sm`}
>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-blue-600 p-2.5 shadow-sm">
            <BarChart3 className="h-5 w-5 text-white" />
          </div>

          <div className="hidden sm:block">
            <h2
              className={`text-lg font-bold tracking-tight ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              FinTrack
            </h2>
            <p
              className={`text-xs font-medium ${
                darkMode ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              Smart Finance by ZORVYN
            </p>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {['Overview', 'Transactions', 'Insights'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                darkMode
                  ? 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {item}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Theme */}
          <button
            onClick={toggleTheme}
            className={`rounded-xl p-2 transition-all ${
              darkMode
                ? 'bg-slate-800 hover:bg-slate-700'
                : 'bg-slate-100 hover:bg-slate-200'
            }`}
          >
            {darkMode ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 text-slate-600" />
            )}
          </button>

          {/* Role */}
          <button
            onClick={toggleRole}
            className={`hidden sm:flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
              role === 'admin'
                ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400'
                : 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-current" />
            {role === 'admin' ? 'Admin' : 'User'}
          </button>

          {/* Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-xl p-2 transition-all hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden"
          >
            {mobileMenuOpen ? (
              <X className={`h-5 w-5 ${darkMode ? 'text-white' : 'text-slate-900'}`} />
            ) : (
              <Menu className={`h-5 w-5 ${darkMode ? 'text-white' : 'text-slate-900'}`} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className={`border-t px-4 pb-4 pt-3 md:hidden ${
            darkMode
              ? 'border-slate-700 bg-slate-900/95'
              : 'border-slate-200 bg-white/95'
          } backdrop-blur-xl`}
        >
          {['Overview', 'Transactions', 'Insights'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`mb-2 block rounded-xl px-3 py-2 text-sm font-medium transition-all ${
                darkMode
                  ? 'text-slate-300 hover:bg-slate-800'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              {item}
            </a>
          ))}

          <button
            onClick={toggleRole}
            className={`mt-2 w-full rounded-xl px-3 py-2 text-left text-sm font-medium ${
              role === 'admin'
                ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400'
                : 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
            }`}
          >
            {role === 'admin' ? 'Admin Mode' : 'User Mode'}
          </button>
        </div>
      )}
    </nav>
  )
}