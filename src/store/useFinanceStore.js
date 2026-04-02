import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { mockTransactions } from '../data/mockTransactions'

const calculateSummary = (transactions) => {
  const income = transactions
    .filter((tx) => tx.type === 'income')
    .reduce((sum, tx) => sum + tx.amount, 0)

  const expenses = transactions
    .filter((tx) => tx.type === 'expense')
    .reduce((sum, tx) => sum + tx.amount, 0)

  return {
    income,
    expenses,
    balance: income - expenses,
  }
}

const getHighestExpenseCategory = (transactions) => {
  const expenseMap = {}

  transactions.forEach((tx) => {
    if (tx.type === 'expense') {
      expenseMap[tx.category] =
        (expenseMap[tx.category] || 0) + tx.amount
    }
  })

  let highestCategory = 'N/A'
  let highestAmount = 0

  for (const category in expenseMap) {
    if (expenseMap[category] > highestAmount) {
      highestAmount = expenseMap[category]
      highestCategory = category
    }
  }

  return {
    highestCategory,
    highestAmount,
  }
}

const useFinanceStore = create(
  persist(
    (set, get) => ({
  // =========================
  // STATE
  // =========================
  transactions: mockTransactions,
  role: 'viewer',
  search: '',
  filterType: 'all',
  showAddForm: false,
  sortBy: 'date',
  sortOrder: 'desc',
  darkMode: false,

  // =========================
  // ACTIONS
  // =========================
  setRole: (role) => set({ role }),

  setSearch: (search) => set({ search }),

  setFilterType: (filterType) => set({ filterType }),

  setShowAddForm: (show) => set({ showAddForm: show }),

  setSortBy: (sortBy) => set({ sortBy }),

  setSortOrder: (sortOrder) => set({ sortOrder }),

  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

  addTransaction: (newTransaction) =>
    set({
      transactions: [...get().transactions, {
        id: Date.now(),
        ...newTransaction
      }],
    }),

  // =========================
  // DERIVED VALUES
  // =========================
  getSummary: () => calculateSummary(get().transactions),
  getInsights: () => {
  const transactions = get().transactions
  const { highestCategory, highestAmount } =
    getHighestExpenseCategory(transactions)

  return {
    highestCategory,
    highestAmount,
    totalTransactions: transactions.length,
  }
},
})),
    {
      name: 'finance-dashboard-storage',
    }
  )

export default useFinanceStore