import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import App from './App'
import Registries from './views/RegistriesView'
import Acts from './views/ActsView'
import Login from './views/LoginView'
import Admin from './views/AdminView'
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'
import 'bootstrap/dist/css/bootstrap.min.css'
import Confirmations from './views/ConfirmationsView'
import Reports from './views/ReportsView'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<Login />} />
      <Route path='' element={<ProtectedRoute />}>
        <Route path='/registries' element={<Registries />} />
        <Route path='/regisrtry/:id' element={<Acts />} />
      </Route>
      <Route path='' element={<AdminRoute />}>
        <Route path='/admin' element={<Admin />} />
        <Route
          path='/confirmations/:id/:typographyId/:registryId/:registryIndex'
          element={<Confirmations />}
        />
        <Route path='/reports' element={<Reports />} />
      </Route>
      <Route path='*' element={<h1>Page Not Found</h1>} />
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
