import { Navigate, Outlet } from 'react-router-dom'
// import Cookies from 'js-cookie'

const ProtectedRoute = () => {
  // console.log(Cookies.get())
  const token = localStorage.getItem('userInfo')

  return token ? <Outlet /> : <Navigate to='/' replace />
}

export default ProtectedRoute
