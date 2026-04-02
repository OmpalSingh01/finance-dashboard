import { Search, Filter, Plus, ArrowUpDown, ArrowUp, ArrowDown, Receipt, TrendingUp, TrendingDown, Calendar, Tag, IndianRupee } from 'lucide-react'
import useFinanceStore from '../store/useFinanceStore'
import AddTransactionForm from './AddTransactionForm'

export default function TransactionTable() {
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
        aValue = new Date(a.date)
        bValue = new Date(b.date)
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
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
            >
              <Plus className="h-4 w-4" />
              Add Transaction
            </button>
          )}
        </div>

        {/* Search and Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-900 placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400 dark:focus:ring-blue-400"
            />
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
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 dark:bg-slate-700/50">
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
                className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider cursor-pointer hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-600/50 transition-colors"
                onClick={() => handleSort('category')}
              >
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  Category
                  {getSortIcon('category')}
                </div>
              </th>
              <th
                className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider cursor-pointer hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-600/50 transition-colors"
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
                  <IndianRupee className="h-4 w-4" />
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
                    <div className="text-sm font-medium text-slate-900 dark:text-white">
                      {new Date(tx.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {new Date(tx.date).toLocaleDateString('en-US', { weekday: 'short' })}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-slate-100 dark:bg-slate-600 rounded-full flex items-center justify-center">
                        <Tag className="h-4 w-4 text-slate-600 dark:text-slate-300" />
                      </div>
                      <span className="text-sm font-medium text-slate-900 dark:text-white">
                        {tx.category}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    {getTransactionTypeBadge(tx.type)}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="text-sm font-semibold text-slate-900 dark:text-white">
                      ₹{tx.amount.toLocaleString()}
                    </div>
                    <div className={`text-xs ${
                      tx.type === 'income'
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {tx.type === 'income' ? '+' : '-'}₹{tx.amount.toLocaleString()}
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