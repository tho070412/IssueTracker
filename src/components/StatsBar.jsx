export default function StatsBar({ incidencias }) {
  const total = incidencias.length
  const pendiente = incidencias.filter((i) => i.estado === 'Pendiente').length
  const progreso = incidencias.filter((i) => i.estado === 'En Progreso').length
  const resuelto = incidencias.filter((i) => i.estado === 'Resuelto').length
  const alta = incidencias.filter((i) => i.prioridad === 'Alta').length

  const stats = [
    { label: 'Total', value: total, color: 'text-slate-300' },
    { label: 'Pendiente', value: pendiente, color: 'text-warning' },
    { label: 'En Progreso', value: progreso, color: 'text-info' },
    { label: 'Resuelto', value: resuelto, color: 'text-success' },
    { label: 'Alta Prioridad', value: alta, color: 'text-danger' },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
      {stats.map((s) => (
        <div key={s.label} className="bg-surface border border-border rounded-sm px-4 py-3">
          <p className="text-muted font-mono text-xs uppercase tracking-wider mb-1">
            {s.label}
          </p>
          <p className={`font-mono font-bold text-2xl ${s.color}`}>{s.value}</p>
        </div>
      ))}
    </div>
  )
}