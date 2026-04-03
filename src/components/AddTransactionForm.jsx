import { useState } from 'react'
import useFinanceStore from '../store/useFinanceStore'

export default function AddTransactionForm() {
  const { addTransaction, setShowAddForm } = useFinanceStore()
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    amount: '',
    category: '',
    type: 'expense'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.amount || !formData.category) return

    const created = new Date()
    const selectedDate = new Date(formData.date)
    selectedDate.setHours(created.getHours(), created.getMinutes(), created.getSeconds(), created.getMilliseconds())

    addTransaction({
      ...formData,
      amount: parseFloat(formData.amount),
      datetime: selectedDate.toISOString(),
      date: selectedDate.toISOString().split('T')[0],
    })

    setFormData({
      date: new Date().toISOString().split('T')[0],
      amount: '',
      category: '',
      type: 'expense'
    })
    setShowAddForm(false)
  }

  const handleCancel = () => {
    setShowAddForm(false)
    setFormData({
      date: new Date().toISOString().split('T')[0],
      amount: '',
      category: '',
      type: 'expense'
    })
  }

  const categories = formData.type === 'expense' ? ['Food', 'Transportation', 'Entertainment', 'Utilities', 'Healthcare', 'Shopping', 'Education', 'Rent', 'Insurance', 'Other'] : ['Salary', 'Freelance', 'Business', 'Investment', 'Gift', 'Other']

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/20 backdrop-blur-sm p-4 transition-all duration-300">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-700 dark:bg-slate-800 max-h-[90vh] overflow-y-auto">
        <h2 className="mb-4 text-lg font-semibold text-slate-800 dark:text-white">
          Add New Transaction
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1 dark:text-slate-300">
              Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:ring-blue-400 transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1 dark:text-slate-300">
              Amount (₹)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              placeholder="Enter amount"
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:ring-blue-400 dark:placeholder-slate-400 transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1 dark:text-slate-300">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:ring-blue-400 transition-colors"
              required
            >
              <option value="">Select Category</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1 dark:text-slate-300">
              Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value, category: '' })}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:ring-blue-400 transition-colors"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="submit"
              className="w-full sm:flex-1 rounded-lg bg-blue-600 px-4 py-3 text-white font-medium hover:bg-blue-700 transition-colors duration-200 dark:bg-blue-700 dark:hover:bg-blue-600"
            >
              Add Transaction
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="w-full sm:flex-1 rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-700 font-medium hover:bg-slate-50 transition-colors duration-200 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}