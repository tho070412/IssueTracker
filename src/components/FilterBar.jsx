const ESTADOS = ['Todos', 'Pendiente', 'En Progreso', 'Resuelto']
const PRIORIDADES = ['Todas', 'Baja', 'Media', 'Alta']

export default function FilterBar({ filtroEstado, filtroPrioridad, onEstado, onPrioridad, total }) {
  return (
    <div className="flex flex-wrap gap-3 items-center justify-between">
      <div className="flex flex-wrap gap-2">
        <div className="flex gap-1 bg-surface border border-border rounded-sm p-1">
          {ESTADOS.map((e) => (
            <button
              key={e}
              onClick={() => onEstado(e)}
              className={`text-xs font-mono px-3 py-1 rounded-sm transition-all duration-150 ${
                filtroEstado === e
                  ? 'bg-accent text-bg font-bold'
                  : 'text-muted hover:text-slate-300'
              }`}
            >
              {e}
            </button>
          ))}
        </div>
        <div className="flex gap-1 bg-surface border border-border rounded-sm p-1">
          {PRIORIDADES.map((p) => (
            <button
              key={p}
              onClick={() => onPrioridad(p)}
              className={`text-xs font-mono px-3 py-1 rounded-sm transition-all duration-150 ${
                filtroPrioridad === p
                  ? 'bg-accent text-bg font-bold'
                  : 'text-muted hover:text-slate-300'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
      <span className="text-muted font-mono text-xs">
        {total} incidencia{total !== 1 ? 's' : ''}
      </span>
    </div>
  )
}
