import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  const token = localStorage.getItem('userInfo')

  return token ? <Outlet /> : <Navigate to='/' replace />
}

export default ProtectedRoute
