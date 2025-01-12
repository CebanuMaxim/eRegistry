import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../api/axios'
import { isAxiosError } from 'axios'
export default function useSession(page: string) {
  const navigate = useNavigate()

  useEffect(() => {
    const logoutUser = async () => {
      try {
        await axios.post('/users/logout')
        localStorage.clear()
        navigate('/')
        alert('Your session has expired. Please log in again.')
      } catch (error) {
        console.log(error)
      }
    }

    const checkSession = async () => {
      try {
        await axios.get('/registries')
      } catch (error) {
        console.error(error)
        if (isAxiosError(error)) {
          if (
            error.response?.status === 401 &&
            error.response?.data?.message ===
              'Session expired. Please log in again.'
          ) {
            logoutUser()
          }
        } else {
          console.error('An unexpected error occurred:', error)
        }
      }
    }
    checkSession()
    const interval = setInterval(checkSession, 1 * 60 * 1000)
    return () => clearInterval(interval)
  }, [navigate, page])
}
