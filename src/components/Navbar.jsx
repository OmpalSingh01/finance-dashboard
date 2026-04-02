import { useState } from 'react'
import { Menu, X, BarChart3, Moon, Sun, LogOut } from 'lucide-react'
import useFinanceStore from '../store/useFinanceStore'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { darkMode, setDarkMode, role, setRole } = useFinanceStore()

  const toggleTheme = () => {
    setDarkMode(!darkMode)
  }

  const toggleRole = () => {
    setRole(role === 'user' ? 'admin' : 'user')
  }

  return (
    <nav className={`sticky top-0 z-40 border-b ${
      darkMode
        ? 'bg-slate-800 border-slate-700'
        : 'bg-white border-slate-200'
    } shadow-sm`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <h2 className={`text-lg font-bold ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}>
                FinTrack
              </h2>
              <p className={`text-xs ${
                darkMode ? 'text-slate-400' : 'text-slate-500'
              }`}>
                Smart Finance
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#overview" className={`text-sm font-medium transition-colors ${
              darkMode
                ? 'text-slate-300 hover:text-white'
                : 'text-slate-700 hover:text-slate-900'
            }`}>
              Overview
            </a>
            <a href="#transactions" className={`text-sm font-medium transition-colors ${
              darkMode
                ? 'text-slate-300 hover:text-white'
                : 'text-slate-700 hover:text-slate-900'
            }`}>
              Transactions
            </a>
            <a href="#insights" className={`text-sm font-medium transition-colors ${
              darkMode
                ? 'text-slate-300 hover:text-white'
                : 'text-slate-700 hover:text-slate-900'
            }`}>
              Insights
            </a>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                darkMode
                  ? 'bg-slate-700 hover:bg-slate-600'
                  : 'bg-slate-100 hover:bg-slate-200'
              }`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-slate-600" />
              )}
            </button>

            {/* Role Indicator & Switcher */}
            <button
              onClick={toggleRole}
              className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                role === 'admin'
                  ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
                  : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
              }`}
              title="Click to switch role"
            >
              <span className="w-2 h-2 bg-current rounded-full"></span>
              {role === 'admin' ? 'Admin' : 'User'}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className={`h-5 w-5 ${darkMode ? 'text-white' : 'text-slate-900'}`} />
              ) : (
                <Menu className={`h-5 w-5 ${darkMode ? 'text-white' : 'text-slate-900'}`} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={`md:hidden pb-4 pt-2 border-t ${
            darkMode ? 'border-slate-700' : 'border-slate-200'
          }`}>
            <a href="#overview" className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors mb-2 ${
              darkMode
                ? 'text-slate-300 hover:bg-slate-700'
                : 'text-slate-700 hover:bg-slate-100'
            }`}>
              Overview
            </a>
            <a href="#transactions" className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors mb-2 ${
              darkMode
                ? 'text-slate-300 hover:bg-slate-700'
                : 'text-slate-700 hover:bg-slate-100'
            }`}>
              Transactions
            </a>
            <a href="#insights" className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors mb-2 ${
              darkMode
                ? 'text-slate-300 hover:bg-slate-700'
                : 'text-slate-700 hover:bg-slate-100'
            }`}>
              Insights
            </a>
            
            {/* Mobile Role Switcher */}
            <button
              onClick={toggleRole}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                role === 'admin'
                  ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
                  : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
              }`}
            >
              <span className="inline-block w-2 h-2 bg-current rounded-full mr-2"></span>
              {role === 'admin' ? 'Admin Mode' : 'User Mode'}
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
