import useFinanceStore from '../store/useFinanceStore'

export default function RoleSwitcher() {
  const { role, setRole } = useFinanceStore()

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="text-lg font-semibold text-slate-800">
          User Access Control
        </h2>
        <p className="text-sm text-slate-500">
          Simulate dashboard access by role
        </p>
      </div>

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="rounded-lg border border-slate-300 px-4 py-2"
      >
        <option value="viewer">Viewer</option>
        <option value="admin">Admin</option>
      </select>
    </div>
  )
}