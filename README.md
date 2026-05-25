# IssueTracker — Sistema de Gestión de Incidencias

Aplicación web SPA (Single Page Application) desarrollada en React para que equipos de soporte técnico puedan gestionar reportes de errores (bugs) de forma eficiente.




## 🛠️ Stack tecnológico

| Tecnología | Uso |
|---|---|
| React 18 + Vite | Framework y bundler |
| react-router-dom v6 | Enrutamiento SPA |
| Tailwind CSS v3 | Estilos |
| SweetAlert2 | Alertas y confirmaciones |
| Axios | Peticiones HTTP |
| JSON | API REST simulada |
| LocalStorage | Persistencia de sesión |

## 📁 Estructura del proyecto

```
src/
├── components/      # Componentes reutilizables
│   ├── FilterBar.jsx
│   ├── IssueCard.jsx
│   ├── IssueForm.jsx
│   ├── Modal.jsx
│   ├── Navbar.jsx
│   ├── ProtectedRoute.jsx
│   ├── Spinner.jsx
│   └── StatsBar.jsx
├── hooks/
│   └── useIncidencias.js   # Lógica CRUD centralizada
├── layouts/
│   └── DashboardLayout.jsx
├── pages/
│   ├── LoginPage.jsx
│   └── DashboardPage.jsx
├── services/
│   └── incidenciasService.js  # Capa de comunicación con la API
└── utils/
    ├── auth.js      # Manejo de sesión (LocalStorage)
    └── helpers.js   # Funciones auxiliares
```

## ⚙️ Instalación y ejecución local

### 1. Clonar el repositorio

```bash
git clone https://github.com/tho070412/IssueTracker.git
cd issue-tracker
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar la API

`src/services/incidenciasService.js`

```js
const BASE_URL = 'http://localhost:3001/incidencias'
```
**Para activar la API**
json-server --watch db.json --port 3001

**Estructura del recurso en MockAPI:**

| Campo | Tipo |
|---|---|
| `titulo` | String |
| `descripcion` | String |
| `estado` | String (`Pendiente` / `En Progreso` / `Resuelto`) |
| `prioridad` | String (`Baja` / `Media` / `Alta`) |

### 4. Correr en desarrollo

```bash
npm run dev
```

La app estará disponible en `http://localhost:5173`

### 5. Build para producción

```bash
npm run build
```

## 🌿 Flujo de Git (GitFlow)

```
main          ← código estable en producción
  └── develop ← rama de integración
        ├── feature/login-view
        ├── feature/crud-incidencias
        └── feature/ui-improvements
```

## ✨ Funcionalidades

- 🔐 Login simulado con persistencia en LocalStorage
- 🛡️ Rutas protegidas (redirige a /login si no hay sesión)
- 📋 Listado de incidencias con tarjetas
- ➕ Crear incidencia con validación de campos
- ✏️ Editar cualquier campo de una incidencia
- 🗑️ Eliminar con confirmación via SweetAlert2
- 📊 Panel de estadísticas en tiempo real
- 🔍 Filtros por estado y prioridad
- ⏳ Spinner de carga durante peticiones HTTP
- 📱 Diseño responsivo (móvil y escritorio)
- ⚠️ Manejo de errores con alertas amigables

## 👤 Autor

Thomas Rodriguez Londoño

