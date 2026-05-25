export function getStatusBadgeClass(estado) {
  const map = {
    Pendiente: 'badge-pendiente',
    'En Progreso': 'badge-progreso',
    Resuelto: 'badge-resuelto',
  }
  return map[estado] || 'badge-pendiente'
}

export function getPriorityBadgeClass(prioridad) {
  const map = {
    Baja: 'badge-baja',
    Media: 'badge-media',
    Alta: 'badge-alta',
  }
  return map[prioridad] || 'badge-baja'
}

export function formatDate(dateStr) {
  if (!dateStr) return '—'
  try {
    return new Date(dateStr).toLocaleDateString('es-CO', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return dateStr
  }
}
