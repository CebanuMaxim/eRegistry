import { Navigate, Outlet } from 'react-router-dom'

const AdminRoute = () => {
  const isAdmin = localStorage.getItem('isAdmin')

  return isAdmin ? <Outlet /> : <Navigate to='/' replace />
}
export default AdminRoute
