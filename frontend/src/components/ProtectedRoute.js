import { Navigate, Outlet, useLocation } from 'react-router-dom'

const ProtectedRoute = () => {
  const location = useLocation()
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))

  if (location.pathname === '/admin' && !userInfo.isAdmin)
    <Navigate to='/' replace />

  return userInfo ? <Outlet /> : <Navigate to='/' replace />
}

export default ProtectedRoute
