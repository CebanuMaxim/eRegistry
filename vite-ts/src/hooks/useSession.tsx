import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
export const useSession = () => {
  const navigate = useNavigate()
  const logoutUser = async () => {
    try {
      await axios.post('/api/users/logout') // Log out the user by clearing the cookie
      window.location.href = '/login' // Redirect to login page
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await axios.get('/registries')
        console.log('RESPONSE: ', res)
      } catch (error) {
        console.log('ERROR', error)
        if (axios.isAxiosError(error)) {
          console.log('asdasdasd')
          if (
            error.response?.status === 401 &&
            error.response?.data?.message ===
              'Session expired. Please log in again.'
          ) {
            console.log('Your session has expired. Please log in again.')
            logoutUser()
            alert('Your session has expired. Please log in again.')
            navigate('/login')
          }
        } else {
          console.error('An unexpected error occurred:', error)
        }
      }
      console.log('LOGGG')
    }
    checkSession()
    const interval = setInterval(checkSession, 5 * 60 * 1000) // Check session every 5 minutes
    return () => clearInterval(interval)
  }, [navigate])
}
