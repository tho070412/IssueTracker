import { useNavigate } from 'react-router-dom'
import { getSession, clearSession } from '../utils/auth'
import Swal from 'sweetalert2'

export default function Navbar() {
  const navigate = useNavigate()
  const session = getSession()

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: '¿Cerrar sesión?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: '<span style="color:#0d0f12">Salir</span>',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#e8ff47',
      cancelButtonColor: '#1e2330',
      background: '#151820',
      color: '#e2e8f0',
    })
    if (result.isConfirmed) {
      clearSession()
      navigate('/login')
    }
  }

  return (
    <nav className="border-b border-border bg-surface sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="font-mono font-bold text-slate-100 tracking-tight">
            ISSUE<span className="text-accent">TRACKER</span>
          </span>
        </div>

        {/* Session info */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono">
            <span className="text-muted">USER</span>
            <span className="text-slate-300">{session?.nombre}</span>
            <span className="text-border">|</span>
            <span className="text-muted">ROL</span>
            <span className="text-accent">{session?.rol}</span>
          </div>
          <button onClick={handleLogout} className="btn-ghost text-xs">
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  )
}
