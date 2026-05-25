import axios from 'axios'

const BASE_URL = 'https://issue-tracker-api-0xxv.onrender.com/incidencias'

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

export async function getIncidencias() {
  const { data } = await api.get('/')
  return data
}

export async function createIncidencia(payload) {
  const { data } = await api.post('/', payload)
  return data
}

export async function updateIncidencia(id, payload) {
  const { data } = await api.put(`/${id}`, payload)
  return data
}

export async function deleteIncidencia(id) {
  const { data } = await api.delete(`/${id}`)
  return data
}

