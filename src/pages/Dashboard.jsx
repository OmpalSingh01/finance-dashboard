import SummaryCard from '../components/SummaryCard'
import useFinanceStore from '../store/useFinanceStore'
import BalanceChart from '../components/BalanceChart'
import ExpensePieChart from '../components/ExpensePieChart'
import TransactionTable from '../components/TransactionTable'
import RoleSwitcher from '../components/RoleSwitcher'
import InsightsPanel from '../components/InsightsPanel'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export default function Dashboard() {
  const { getSummary, transactions, darkMode } = useFinanceStore()
  const summary = getSummary()

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-900 text-white' : 'bg-slate-100'}`}>
      <Navbar />
      <div className="p-4 md:p-8">
        <div className="mx-auto max-w-7xl space-y-8">
          {/* Page Header */}
          <div id="overview">
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
              Dashboard
            </h1>
            <p className={`text-sm mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Track your income, expenses, and spending insights
            </p>
          </div>

          <RoleSwitcher />

          {/* Summary Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <SummaryCard
              title="Total Balance"
              value={summary.balance}
              subText={`${transactions.length} transactions`}
            />

            <SummaryCard
              title="Income"
              value={summary.income}
              subText="All credited amounts"
            />

            <SummaryCard
              title="Expenses"
              value={summary.expenses}
              subText="All debited amounts"
            />
          </div>

          {/* Charts */}
          <div className="grid gap-6 lg:grid-cols-2">
            <BalanceChart />
            <ExpensePieChart />
          </div>

          <div id="transactions">
            <TransactionTable />
          </div>
          
          <div id="insights">
            <InsightsPanel />
          </div>

          <Footer />
        </div>
      </div>
    </div>
  )
}