import { Navigate, useLocation } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const location = useLocation()
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))

  if (location.pathname === '/admin' && userInfo !== 'admin') {
    console.log('admin: ', userInfo !== 'admin')
    return <Navigate to='/' />
  }

  if (!userInfo) {
    return <Navigate to='/' />
  }
  return children
}

export default ProtectedRoute
