import { Navigate, Outlet } from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedRoute = () => {
  const token = localStorage.getItem('token')
  Cookies.remove()
  return token ? <Outlet /> : <Navigate to='/' replace />
}

export default ProtectedRoute
