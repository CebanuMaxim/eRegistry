import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../api/axios'
import { isAxiosError } from 'axios'

export default function useSession(page: string) {
  const navigate = useNavigate()

  useEffect(() => {
    // Create a new Date object for the current time
    const currentDate = new Date()

    // Correctly defined options with valid values for DateTimeFormatOptions
    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'Europe/Chisinau',
      year: 'numeric', // Use 'numeric' instead of generic string
      month: 'long', // Use 'long', 'short', or 'narrow' as valid values
      day: 'numeric', // 'numeric' for full number
      hour: '2-digit', // '2-digit' for padded two-digit format
      minute: '2-digit',
      second: '2-digit',
      hour12: false, // Set to true for 12-hour format
    }

    // Format the date and time for Moldova
    const formatter = new Intl.DateTimeFormat('en-US', options)

    // Log the current time in Moldova
    // console.log('Current time in Moldova:', formatter.format(currentDate))

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
      console.log(page, ' : ', formatter.format(currentDate))

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
            alert('Your session has expired. Please log in again.')
          }
        } else {
          console.error('An unexpected error occurred:', error)
        }
      }
    }
    checkSession()
    const interval = setInterval(checkSession, 1 * 60 * 60 * 1000)
    return () => clearInterval(interval)
  }, [navigate, page])
}
