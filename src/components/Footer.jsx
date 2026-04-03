import { Heart, GitBranch, Mail, Calendar, Shield, FileText, HelpCircle } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-12 border-t border-slate-200 bg-white/80 backdrop-blur-sm pt-8 dark:border-slate-700 dark:bg-slate-800/80">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
        <div className="space-y-3">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold tracking-tight text-slate-800 dark:text-white">
              FIN TRACK
            </h3>

            <p className="text-xs font-medium tracking-wide text-slate-500 dark:text-slate-400">
              A product of Zorvyn
            </p>
          </div>

          <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">
            Your personal financial companion for tracking income, expenses,
            and intelligent spending insights.
          </p>

          <div className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
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
              {[
                'Export Data',
                'Generate Report',
                'Budget Planner',
                'Financial Goals',
              ].map((item) => (
                <button
                  key={item}
                  className="block transition-colors text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Connect
            </h4>

            <div className="space-y-2">
              <a
                href="mailto:support@financedashboard.com"
                className="flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
              >
                <Mail className="h-4 w-4" />
                <span>support@financedashboard.com</span>
              </a>

              <a
                href="https://github.com/OmpalSingh01/finance-dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
              >
                <GitBranch className="h-4 w-4" />
                <span>View on GitHub</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 border-t border-slate-200 pt-6 dark:border-slate-700">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
              <span>© {currentYear} Finance Dashboard. Made with</span>
              <Heart className="h-4 w-4 fill-current text-red-500" />
              <span>for financial wellness.</span>
            </div>

            <div className="flex flex-wrap items-center gap-5 text-xs text-slate-400 dark:text-slate-500">
              <button className="flex items-center gap-1 hover:text-slate-600 dark:hover:text-slate-300">
                <Shield className="h-3 w-3" />
                Privacy
              </button>

              <button className="flex items-center gap-1 hover:text-slate-600 dark:hover:text-slate-300">
                <FileText className="h-3 w-3" />
                Terms
              </button>

              <button className="flex items-center gap-1 hover:text-slate-600 dark:hover:text-slate-300">
                <HelpCircle className="h-3 w-3" />
                Help
              </button>
            </div>
          </div>

          {/* Version */}
          <div className="mt-4 text-center">
            <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 mb-4 text-xs font-medium text-slate-500 dark:bg-slate-700 dark:text-slate-400">
              Version 2.0.0 • React + Tailwind
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}