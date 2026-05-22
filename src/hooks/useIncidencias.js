import { useState, useEffect, useCallback } from 'react'
import {
  getIncidencias,
  createIncidencia,
  updateIncidencia,
  deleteIncidencia,
} from '../services/incidenciasService'
import Swal from 'sweetalert2'

export function useIncidencias() {
  const [incidencias, setIncidencias] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchAll = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getIncidencias()
      setIncidencias(data)
    } catch (err) {
      setError('No se pudo conectar con la API. Verifica tu conexión.')
      Swal.fire({
        icon: 'error',
        title: 'Error de conexión',
        text: 'No se pudo cargar las incidencias. Intenta de nuevo.',
        background: '#151820',
        color: '#e2e8f0',
        confirmButtonColor: '#e8ff47',
        confirmButtonText: '<span style="color:#0d0f12">Reintentar</span>',
      })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  const addIncidencia = async (payload) => {
    try {
      const nueva = await createIncidencia(payload)
      setIncidencias((prev) => [...prev, nueva])
      return { ok: true }
    } catch {
      return { ok: false, message: 'Error al crear la incidencia.' }
    }
  }

  const editIncidencia = async (id, payload) => {
    try {
      const actualizada = await updateIncidencia(id, payload)
      setIncidencias((prev) =>
        prev.map((inc) => (inc.id === id ? actualizada : inc))
      )
      return { ok: true }
    } catch {
      return { ok: false, message: 'Error al actualizar la incidencia.' }
    }
  }

  const removeIncidencia = async (id) => {
    const result = await Swal.fire({
      title: '¿Eliminar incidencia?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '<span style="color:#0d0f12">Sí, eliminar</span>',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#ff4757',
      cancelButtonColor: '#1e2330',
      background: '#151820',
      color: '#e2e8f0',
    })

    if (!result.isConfirmed) return { ok: false, cancelled: true }

    try {
      await deleteIncidencia(id)
      setIncidencias((prev) => prev.filter((inc) => inc.id !== id))
      Swal.fire({
        icon: 'success',
        title: 'Eliminada',
        text: 'La incidencia fue eliminada correctamente.',
        background: '#151820',
        color: '#e2e8f0',
        confirmButtonColor: '#e8ff47',
        confirmButtonText: '<span style="color:#0d0f12">OK</span>',
        timer: 2000,
        showConfirmButton: false,
      })
      return { ok: true }
    } catch {
      return { ok: false, message: 'Error al eliminar la incidencia.' }
    }
  }

  return {
    incidencias,
    loading,
    error,
    fetchAll,
    addIncidencia,
    editIncidencia,
    removeIncidencia,
  }
}

