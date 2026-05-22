import { useState, useMemo } from 'react'
import DashboardLayout from '../layouts/DashboardLayout'
import { useIncidencias } from '../hooks/useIncidencias'
import IssueCard from '../components/IssueCard'
import IssueForm from '../components/IssueForm'
import Modal from '../components/Modal'
import Spinner from '../components/Spinner'
import FilterBar from '../components/FilterBar'
import StatsBar from '../components/StatsBar'
import Swal from 'sweetalert2'

export default function DashboardPage() {
  const {
    incidencias,
    loading,
    error,
    fetchAll,
    addIncidencia,
    editIncidencia,
    removeIncidencia,
  } = useIncidencias()

  const [showModal, setShowModal] = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [saving, setSaving] = useState(false)
  const [filtroEstado, setFiltroEstado] = useState('Todos')
  const [filtroPrioridad, setFiltroPrioridad] = useState('Todas')

  const filtered = useMemo(() => {
    return incidencias.filter((inc) => {
      const byEstado = filtroEstado === 'Todos' || inc.estado === filtroEstado
      const byPrioridad = filtroPrioridad === 'Todas' || inc.prioridad === filtroPrioridad
      return byEstado && byPrioridad
    })
  }, [incidencias, filtroEstado, filtroPrioridad])

  const openCreate = () => {
    setEditTarget(null)
    setShowModal(true)
  }

  const openEdit = (incidencia) => {
    setEditTarget(incidencia)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditTarget(null)
  }

  const handleSubmit = async (formData) => {
    setSaving(true)
    let result

    if (editTarget) {
      result = await editIncidencia(editTarget.id, formData)
    } else {
      result = await addIncidencia(formData)
    }

    setSaving(false)

    if (result.ok) {
      closeModal()
      Swal.fire({
        icon: 'success',
        title: editTarget ? 'Actualizada' : 'Creada',
        text: editTarget
          ? 'La incidencia fue actualizada correctamente.'
          : 'Nueva incidencia registrada.',
        background: '#151820',
        color: '#e2e8f0',
        timer: 2000,
        showConfirmButton: false,
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: result.message,
        background: '#151820',
        color: '#e2e8f0',
        confirmButtonColor: '#e8ff47',
        confirmButtonText: '<span style="color:#0d0f12">OK</span>',
      })
    }
  }

  return (
    <DashboardLayout>
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-mono font-bold text-slate-100 text-lg tracking-tight">
            Panel de Incidencias
          </h1>
          <p className="text-muted text-sm mt-0.5">
            Gestiona y da seguimiento a los reportes de errores
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={fetchAll} className="btn-ghost text-xs">
            ↻ Actualizar
          </button>
          <button onClick={openCreate} className="btn-primary">
            + Nueva incidencia
          </button>
        </div>
      </div>

      {/* Stats */}
      {!loading && !error && (
        <div className="mb-6">
          <StatsBar incidencias={incidencias} />
        </div>
      )}

      {/* Filters */}
      {!loading && !error && incidencias.length > 0 && (
        <div className="mb-5">
          <FilterBar
            filtroEstado={filtroEstado}
            filtroPrioridad={filtroPrioridad}
            onEstado={setFiltroEstado}
            onPrioridad={setFiltroPrioridad}
            total={filtered.length}
          />
        </div>
      )}

      {/* Content */}
      {loading && <Spinner label="Cargando incidencias..." />}

      {!loading && error && (
        <div className="text-center py-16">
          <p className="text-danger font-mono text-sm mb-4">{error}</p>
          <button onClick={fetchAll} className="btn-ghost">
            Reintentar
          </button>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="text-center py-20 border border-dashed border-border rounded-sm">
          <p className="text-muted font-mono text-sm mb-1">
            {incidencias.length === 0
              ? 'No hay incidencias registradas.'
              : 'Ninguna incidencia coincide con los filtros.'}
          </p>
          {incidencias.length === 0 && (
            <button onClick={openCreate} className="btn-primary mt-4 text-sm">
              Registrar primera incidencia
            </button>
          )}
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((inc) => (
            <IssueCard
              key={inc.id}
              incidencia={inc}
              onEdit={openEdit}
              onDelete={removeIncidencia}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <Modal
          title={editTarget ? 'Editar incidencia' : 'Nueva incidencia'}
          onClose={closeModal}
        >
          <IssueForm
            initial={editTarget}
            onSubmit={handleSubmit}
            onCancel={closeModal}
            loading={saving}
          />
        </Modal>
      )}
    </DashboardLayout>
  )
}

