import { Navigate, Outlet, useLocation } from 'react-router-dom'

const ProtectedRoute = () => {
  const location = useLocation()
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))

  if (location.pathname === '/admin' && userInfo !== 'admin') {
    return <Navigate to='/' replace />
  }

  return userInfo ? <Outlet /> : <Navigate to='/' replace />

  // if (!userInfo) {
  //   return <Navigate to='/' />
  // }
}

export default ProtectedRoute
