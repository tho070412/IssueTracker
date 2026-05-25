import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveSession, isAuthenticated } from '../utils/auth'
import { useEffect } from 'react'

const ROLES = ['Administrador', 'Developer', 'QA', 'DevOps', 'Soporte']

export default function LoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ nombre: '', rol: 'Administrador' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isAuthenticated()) navigate('/dashboard', { replace: true })
  }, [navigate])

  const validate = () => {
    const errs = {}
    if (!form.nombre.trim()) errs.nombre = 'Ingresa tu nombre.'
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    setTimeout(() => {
      saveSession({ nombre: form.nombre.trim(), rol: form.rol })
      navigate('/dashboard', { replace: true })
    }, 600)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4">
      {/* Background grid */}
      <div
        className="fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(#e8ff47 1px, transparent 1px), linear-gradient(90deg, #e8ff47 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative w-full max-w-sm animate-slide-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-2.5 h-2.5 rounded-full bg-accent" />
            <span className="font-mono font-bold text-xl text-slate-100 tracking-tight">
              ISSUE<span className="text-accent">TRACKER</span>
            </span>
          </div>
          <p className="text-muted text-sm font-mono">
            Sistema de Gestión de Incidencias
          </p>
        </div>

        {/* Card */}
        <div className="bg-surface border border-border rounded-sm p-6 shadow-2xl">
          <h1 className="font-mono text-xs text-muted uppercase tracking-widest mb-6">
            — Acceso al sistema
          </h1>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-muted mb-1.5 uppercase tracking-wider">
                Nombre
              </label>
              <input
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Tu nombre completo"
                autoFocus
                className="input-field"
              />
              {errors.nombre && (
                <p className="text-danger text-xs mt-1 font-mono">{errors.nombre}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-mono text-muted mb-1.5 uppercase tracking-wider">
                Rol
              </label>
              <select
                name="rol"
                value={form.rol}
                onChange={handleChange}
                className="input-field"
              >
                {ROLES.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full mt-2 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-3 h-3 border border-bg border-t-transparent rounded-full animate-spin" />
                  Ingresando...
                </>
              ) : (
                'Ingresar'
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-muted text-xs font-mono mt-4">
          v1.0.0 
        </p>
      </div>
    </div>
  )
}
