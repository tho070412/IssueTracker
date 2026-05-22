import { useState, useEffect } from 'react'

const EMPTY_FORM = {
  titulo: '',
  descripcion: '',
  estado: 'Pendiente',
  prioridad: 'Media',
}

export default function IssueForm({ initial = null, onSubmit, onCancel, loading }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (initial) {
      setForm({
        titulo: initial.titulo || '',
        descripcion: initial.descripcion || '',
        estado: initial.estado || 'Pendiente',
        prioridad: initial.prioridad || 'Media',
      })
    } else {
      setForm(EMPTY_FORM)
    }
    setErrors({})
  }, [initial])

  const validate = () => {
    const errs = {}
    if (!form.titulo.trim()) errs.titulo = 'El título es obligatorio.'
    if (!form.descripcion.trim()) errs.descripcion = 'La descripción es obligatoria.'
    return errs
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Titulo */}
      <div>
        <label className="block text-xs font-mono text-muted mb-1.5 uppercase tracking-wider">
          Título *
        </label>
        <input
          name="titulo"
          value={form.titulo}
          onChange={handleChange}
          placeholder="Ej: Error al cargar el módulo de pagos"
          className="input-field"
        />
        {errors.titulo && (
          <p className="text-danger text-xs mt-1 font-mono">{errors.titulo}</p>
        )}
      </div>

      {/* Descripcion */}
      <div>
        <label className="block text-xs font-mono text-muted mb-1.5 uppercase tracking-wider">
          Descripción *
        </label>
        <textarea
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
          rows={3}
          placeholder="Describe el problema con detalle..."
          className="input-field resize-none"
        />
        {errors.descripcion && (
          <p className="text-danger text-xs mt-1 font-mono">{errors.descripcion}</p>
        )}
      </div>

      {/* Estado + Prioridad */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-mono text-muted mb-1.5 uppercase tracking-wider">
            Estado
          </label>
          <select
            name="estado"
            value={form.estado}
            onChange={handleChange}
            className="input-field"
          >
            <option value="Pendiente">Pendiente</option>
            <option value="En Progreso">En Progreso</option>
            <option value="Resuelto">Resuelto</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-mono text-muted mb-1.5 uppercase tracking-wider">
            Prioridad
          </label>
          <select
            name="prioridad"
            value={form.prioridad}
            onChange={handleChange}
            className="input-field"
          >
            <option value="Baja">Baja</option>
            <option value="Media">Media</option>
            <option value="Alta">Alta</option>
          </select>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={onCancel} className="btn-ghost">
          Cancelar
        </button>
        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? 'Guardando...' : initial ? 'Actualizar' : 'Crear incidencia'}
        </button>
      </div>
    </form>
  )
}

