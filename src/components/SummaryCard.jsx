export default function SummaryCard({ title, value, subText }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>

      <h2 className="mt-3 text-3xl font-bold text-slate-800 dark:text-white">
        ₹{value.toLocaleString()}
      </h2>

      {subText && (
        <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">{subText}</p>
      )}
    </div>
  )
}