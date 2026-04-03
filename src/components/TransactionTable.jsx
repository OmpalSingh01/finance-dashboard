import { Search, Filter, Plus, ArrowUpDown, ArrowUp, ArrowDown, Receipt, TrendingUp, TrendingDown, Calendar, Tag, DollarSign, Download } from 'lucide-react'
import { useState } from 'react'
import useFinanceStore from '../store/useFinanceStore'
import AddTransactionForm from './AddTransactionForm'

export default function TransactionTable() {
  const [exportDuration, setExportDuration] = useState('all')
  const {
    transactions,
    search,
    setSearch,
    filterType,
    setFilterType,
    role,
    showAddForm,
    setShowAddForm,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
  } = useFinanceStore()

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch = tx.category
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchesFilter =
      filterType === 'all' || tx.type === filterType

    return matchesSearch && matchesFilter
  })

  // Sort transactions
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    let aValue, bValue

    switch (sortBy) {
      case 'date':
        aValue = new Date(a.datetime || a.date)
        bValue = new Date(b.datetime || b.date)
        break
      case 'amount':
        aValue = a.amount
        bValue = b.amount
        break
      case 'category':
        aValue = a.category.toLowerCase()
        bValue = b.category.toLowerCase()
        break
      case 'type':
        aValue = a.type
        bValue = b.type
        break
      default:
        return 0
    }

    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1
    return 0
  })

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortOrder('asc')
    }
  }

  const getSortIcon = (column) => {
    if (sortBy !== column) return <ArrowUpDown className="h-4 w-4" />
    return sortOrder === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
  }

  const getTransactionsByDuration = () => {
    const now = new Date()
    const filtered = transactions.filter((tx) => {
      const txDate = new Date(tx.datetime || tx.date)

      switch (exportDuration) {
        case 'month':
          return (
            txDate.getMonth() === now.getMonth() &&
            txDate.getFullYear() === now.getFullYear()
          )
        case '30days': {
          const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
          return txDate >= thirtyDaysAgo
        }
        case '90days': {
          const ninetyDaysAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
          return txDate >= ninetyDaysAgo
        }
        case 'year':
          return txDate.getFullYear() === now.getFullYear()
        case 'all':
        default:
          return true
      }
    })
    return filtered
  }

  const exportToCSV = () => {
    const dataToExport = getTransactionsByDuration()

    if (dataToExport.length === 0) {
      alert('No transactions found for the selected duration')
      return
    }

    // Create CSV header
    const headers = ['Date', 'Category', 'Type', 'Amount']
    const rows = dataToExport.map((tx) => [
      tx.date,
      tx.category,
      tx.type,
      tx.amount,
    ])

    // Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...rows.map((row) =>
        row
          .map((cell) =>
            typeof cell === 'string' && cell.includes(',')
              ? `"${cell}"`
              : cell
          )
          .join(',')
      ),
    ].join('\n')

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)

    const durationLabel = {
      all: 'all',
      month: 'this-month',
      '30days': '30days',
      '90days': '90days',
      year: 'this-year',
    }[exportDuration]

    link.setAttribute('href', url)
    link.setAttribute('download', `transactions-${durationLabel}-${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const getTransactionTypeBadge = (type) => {
    return type === 'income' ? (
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
        <TrendingUp className="h-3 w-3" />
        Income
      </span>
    ) : (
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">
        <TrendingDown className="h-3 w-3" />
        Expense
      </span>
    )
  }

  const categories = ['All Categories', ...new Set(transactions.map(tx => tx.category))]

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
      {/* Header */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Receipt className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Transactions
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {filteredTransactions.length} of {transactions.length} transactions
              </p>
            </div>
          </div>

          {role === 'admin' && (
            <button
              onClick={() => setShowAddForm(true)}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
            >
              <Plus className="h-4 w-4" />
              Add Transaction
            </button>
          )}
        </div>

        {role === 'admin' && (
          <button
            onClick={() => setShowAddForm(true)}
            className="fixed bottom-4 right-4 z-50 inline-flex items-center gap-2 px-4 py-3 text-sm font-semibold bg-blue-600 text-white rounded-full shadow-lg shadow-blue-500/20 transition-all duration-200 hover:bg-blue-700 sm:hidden"
            aria-label="Add transaction"
          >
            <Plus className="h-4 w-4" />
            Add
          </button>
        )}

        {/* Search and Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />

  <select
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none dark:border-slate-600 dark:bg-slate-700 dark:text-white"
  >
    <option value="">All Categories</option>

    {categories.slice(1).map((category) => (
      <option key={category} value={category}>
        {category}
      </option>
    ))}
  </select>
</div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="pl-10 pr-8 py-2 border border-slate-300 rounded-lg bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none dark:border-slate-600 dark:bg-slate-700 dark:text-white"
            >
              <option value="all">All Types</option>
              <option value="income">Income Only</option>
              <option value="expense">Expenses Only</option>
            </select>
          </div>

          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <select
              value={exportDuration}
              onChange={(e) => setExportDuration(e.target.value)}
              className="pl-10 pr-8 py-2 border border-slate-300 rounded-lg bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none dark:border-slate-600 dark:bg-slate-700 dark:text-white"
            >
              <option value="all">All Transactions</option>
              <option value="month">This Month</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
              <option value="year">This Year</option>
            </select>
          </div>

          <button
          onClick={exportToCSV}
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 text-white text-sm font-medium rounded-lg transition-colors duration-200"
        >
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Export CSV</span>
          <span className="sm:hidden">Export</span>
        </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        
        <div className="max-h-[460px] overflow-y-auto backdrop-blur-sm">
          <table className="w-full">
            <thead className="sticky top-0 z-10 bg-slate-50 dark:bg-slate-700/50 backdrop-blur-sm">
            <tr>
              <th
                className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider cursor-pointer hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-600/50 transition-colors"
                onClick={() => handleSort('date')}
              >
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Date
                  {getSortIcon('date')}
                </div>
              </th>
              <th
                className="hidden sm:table-cell px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider cursor-pointer hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-600/50 transition-colors"
                onClick={() => handleSort('category')}
              >
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  Category
                  {getSortIcon('category')}
                </div>
              </th>
              <th
                className="hidden sm:table-cell px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider cursor-pointer hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-600/50 transition-colors"
                onClick={() => handleSort('type')}
              >
                <div className="flex items-center gap-2">
                  Type
                  {getSortIcon('type')}
                </div>
              </th>
              <th
                className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider cursor-pointer hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-600/50 transition-colors"
                onClick={() => handleSort('amount')}
              >
                <div className="flex items-center justify-end gap-2">
                  <DollarSign className="h-4 w-4" />
                  Amount
                  {getSortIcon('amount')}
                </div>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {sortedTransactions.length > 0 ? (
              sortedTransactions.map((tx, index) => (
                <tr
                  key={tx.id}
                  className={`hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors ${
                    index % 2 === 0 ? 'bg-white dark:bg-slate-800' : 'bg-slate-50/50 dark:bg-slate-700/20'
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {(() => {
                      const datePart = new Date(`${tx.date}T00:00:00`)
                      const timePart = tx.datetime ? new Date(tx.datetime) : datePart
                      return (
                        <>
                          <div className="text-sm font-medium text-slate-900 dark:text-white">
                            {datePart.toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            {datePart.toLocaleDateString('en-US', { weekday: 'short' })}, {' '}
                            {timePart.toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: false,
                            })}
                          </div>
                        </>
                      )
                    })()}
                  </td>

                  <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-slate-100 dark:bg-slate-600 rounded-full flex items-center justify-center">
                        <Tag className="h-4 w-4 text-slate-600 dark:text-slate-300" />
                      </div>
                      <span className="text-sm font-medium text-slate-900 dark:text-white">
                        {tx.category}
                      </span>
                    </div>
                  </td>

                  <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap">
                    {getTransactionTypeBadge(tx.type)}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className={`text-lg ${
                      tx.type === 'income'
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-slate-900 dark:text-white'
                    }`}>
                      {tx.type === 'income' ? '+' : '-'}₹{tx.amount.toLocaleString()}
                    </div>
                    <div className="flex items-center justify-end gap-1 sm:hidden mt-1">
                      <Tag className="h-3 w-3 text-slate-500 dark:text-slate-400" />
                      <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                        {tx.category}
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <Receipt className="h-12 w-12 text-slate-400 dark:text-slate-500 mb-4" />
                    <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                      No transactions found
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                      Try adjusting your search or filter criteria
                    </p>
                    <div className="flex gap-2 text-xs text-slate-400 dark:text-slate-500">
                      <span>• {transactions.length} total transactions</span>
                      <span>• {filteredTransactions.length} filtered</span>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      </div>

      {/* Footer with summary */}
      {sortedTransactions.length > 0 && (
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-700/50 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600 dark:text-slate-400">
              Showing {sortedTransactions.length} of {transactions.length} transactions
            </span>
            <div className="flex items-center gap-4">
              <span className="text-slate-600 dark:text-slate-400">
                Income: <span className="font-semibold text-green-600 dark:text-green-400">
                  ₹{sortedTransactions.filter(tx => tx.type === 'income').reduce((sum, tx) => sum + tx.amount, 0).toLocaleString()}
                </span>
              </span>
              <span className="text-slate-600 dark:text-slate-400">
                Expenses: <span className="font-semibold text-red-600 dark:text-red-400">
                  ₹{sortedTransactions.filter(tx => tx.type === 'expense').reduce((sum, tx) => sum + tx.amount, 0).toLocaleString()}
                </span>
              </span>
            </div>
          </div>
        </div>
      )}

      {showAddForm && <AddTransactionForm />}
    </div>
  )
}