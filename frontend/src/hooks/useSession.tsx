import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosAPI from '../api/axios'
import axios, { isAxiosError } from 'axios'

export default function useSession(page: string) {
  const navigate = useNavigate()

  useEffect(() => {
    const logoutUser = async () => {
      try {
        await axios.post('/users/logout')
        localStorage.clear()
        navigate('/')
      } catch (error) {
        console.log(error)
      }
    }

    const checkSession = async () => {
      try {
        await axiosAPI.get('/registries')
      } catch (error: unknown) {
        if (isAxiosError(error)) {
          console.error(error.response?.data?.message)

          if (
            error.response?.status === 401 &&
            error.response?.data?.message ===
              'Session expired. Please log in again.'
          ) {
            logoutUser()
            localStorage.clear()
            navigate('/')
            alert('Your session has expired. Please log in again.')
          }
        } else {
          // Handle non-Axios errors
          console.error('An unexpected error occurred:', error)
        }
      }
    }
    checkSession()
    const interval = setInterval(checkSession, 1 * 60 * 60 * 1000)
    return () => clearInterval(interval)
  }, [navigate, page])
}
