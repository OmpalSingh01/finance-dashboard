export default function SummaryCard({ title, value, subText }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <p className="text-sm font-medium text-slate-500">{title}</p>

      <h2 className="mt-3 text-3xl font-bold text-slate-800">
        ₹{value.toLocaleString()}
      </h2>

      {subText && (
        <p className="mt-2 text-xs text-slate-400">{subText}</p>
      )}
    </div>
  )
}