import { Heart, GitBranch, Mail, Calendar } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-12 border-t border-slate-200 bg-white pt-8 dark:border-slate-700 dark:bg-slate-800">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
              Finance Dashboard
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Your personal financial companion for tracking income, expenses, and spending insights.
            </p>
            <div className="flex items-center space-x-1 text-xs text-slate-400 dark:text-slate-500">
              <Calendar className="h-3 w-3" />
              <span>Last updated: {new Date().toLocaleDateString()}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Quick Actions
            </h4>
            <div className="space-y-2 text-sm">
              <button className="block text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors">
                Export Data
              </button>
              <button className="block text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors">
                Generate Report
              </button>
              <button className="block text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors">
                Budget Planner
              </button>
              <button className="block text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors">
                Financial Goals
              </button>
            </div>
          </div>

          {/* Contact & Social */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Connect
            </h4>
            <div className="space-y-2">
              <a
                href="mailto:support@financedashboard.com"
                className="flex items-center space-x-2 text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>support@financedashboard.com</span>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
              >
                <GitBranch className="h-4 w-4" />
                <span>View on GitHub</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t border-slate-200 pt-6 dark:border-slate-700">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <div className="flex items-center space-x-1 text-sm text-slate-500 dark:text-slate-400">
              <span>© {currentYear} Finance Dashboard. Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>for financial wellness.</span>
            </div>

            <div className="flex items-center space-x-6 text-xs text-slate-400 dark:text-slate-500">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Help Center</span>
            </div>
          </div>

          {/* Version Info */}
          <div className="mt-4 text-center text-xs text-slate-400 dark:text-slate-500">
            Version 1.0.0 • Built with React & Tailwind CSS
          </div>
        </div>
      </div>
    </footer>
  )
}