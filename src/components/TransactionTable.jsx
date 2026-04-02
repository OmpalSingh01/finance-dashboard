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

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">
            Transactions
          </h2>
          <p className="text-sm text-slate-500">
            Search and filter financial activities
          </p>
        </div>

        {role === 'admin' && (
          <button
            onClick={() => setShowAddForm(true)}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm text-white hover:opacity-90"
          >
            + Add Transaction
          </button>
        )}
      </div>

      {/* Search + Filter */}
      <div className="mb-4 flex flex-col gap-3 md:flex-row">
        <input
          type="text"
          placeholder="Search by category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:ring-2 focus:ring-slate-300"
        />

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="rounded-lg border border-slate-300 px-4 py-2"
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-slate-200 text-left text-sm text-slate-500">
              <th
                className="pb-3 cursor-pointer hover:text-slate-700 select-none"
                onClick={() => handleSort('date')}
              >
                Date {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th
                className="pb-3 cursor-pointer hover:text-slate-700 select-none"
                onClick={() => handleSort('category')}
              >
                Category {sortBy === 'category' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th
                className="pb-3 cursor-pointer hover:text-slate-700 select-none"
                onClick={() => handleSort('type')}
              >
                Type {sortBy === 'type' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th
                className="pb-3 cursor-pointer hover:text-slate-700 select-none"
                onClick={() => handleSort('amount')}
              >
                Amount {sortBy === 'amount' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
            </tr>
          </thead>

          <tbody>
            {sortedTransactions.length > 0 ? (
              sortedTransactions.map((tx) => (
                <tr
                  key={tx.id}
                  className="border-b border-slate-100"
                >
                  <td className="py-3">{tx.date}</td>
                  <td>{tx.category}</td>
                  <td className="capitalize">{tx.type}</td>
                  <td className="text-right font-medium">
                    ₹{tx.amount.toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                    colSpan="4"
                    className="py-8 text-center"
                >
                    <div className="flex flex-col items-center justify-center">
                    <p className="text-lg font-medium text-slate-500">
                        No transactions found
                    </p>
                    <p className="text-sm text-slate-400">
                        Try changing search or filter criteria
                    </p>
                    </div>
                </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>

      {showAddForm && <AddTransactionForm />}
    </div>
  )
}