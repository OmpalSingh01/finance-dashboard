import useFinanceStore from '../store/useFinanceStore'

export default function RoleSwitcher() {
  const { role, setRole } = useFinanceStore()

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between dark:border-slate-700 dark:bg-slate-800">
      <div>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
          User Access Control
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Simulate dashboard access by role
        </p>
      </div>

      <div className="w-full md:w-auto min-w-0 overflow-visible">
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full max-w-[220px] md:w-48 rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 dark:border-slate-600 dark:bg-slate-700 dark:text-white z-50 relative"
        >
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>
      </div>
    </div>
  )
}