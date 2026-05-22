import { getStatusBadgeClass, getPriorityBadgeClass } from '../utils/helpers'

export default function IssueCard({ incidencia, onEdit, onDelete }) {
  const { id, titulo, descripcion, estado, prioridad } = incidencia

  return (
    <div className="card group">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <span className="text-muted font-mono text-xs block mb-1">
            #{id}
          </span>
          <h3 className="text-slate-100 font-semibold text-sm leading-snug truncate">
            {titulo}
          </h3>
        </div>
        <span className={getPriorityBadgeClass(prioridad)}>{prioridad}</span>
      </div>

      {/* Description */}
      <p className="text-muted text-sm leading-relaxed line-clamp-2 mb-4">
        {descripcion || 'Sin descripción.'}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <span className={getStatusBadgeClass(estado)}>{estado}</span>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(incidencia)}
            className="btn-ghost text-xs py-1 px-3"
          >
            Editar
          </button>
          <button
            onClick={() => onDelete(id)}
            className="btn-danger text-xs py-1 px-3"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}
