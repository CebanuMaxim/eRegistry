import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosAPI from '../api/axios'
import { isAxiosError } from 'axios'

const GRACE_PERIOD_MS = 5 * 60 * 1000 // 5 minutes

export function useSession(page: string) {
  const navigate = useNavigate()
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    /**
     * Logs out the user, clears session data, and redirects to the login page.
     */
    const logoutUser = () => {
      console.log('SESSION')

      localStorage.clear()
      navigate('/')
      alert('Your session has expired. Please log in again.')
    }

    /**
     * Checks if the user's session is still valid.
     * If the session has expired (HTTP 401), a grace period starts before logging out.
     */
    const checkSession = async () => {
      try {
        await axiosAPI.get('/registries') // Attempt to fetch protected data
        localStorage.removeItem('sessionExpiredAt') // Reset expiration if request succeeds
      } catch (error: unknown) {
        if (isAxiosError(error)) {
          console.error(error.response?.data?.message)

          if (
            error.response?.status === 401 &&
            error.response?.data?.message ===
              'Session expired. Please log in again.'
          ) {
            const sessionExpiredAt = localStorage.getItem('sessionExpiredAt')

            if (!sessionExpiredAt) {
              // First time detecting expiration → Start the grace period
              localStorage.setItem(
                'sessionExpiredAt',
                String(Date.now() + GRACE_PERIOD_MS)
              )
              alert(
                'Your session has expired. You have 5 minutes to refresh or log in again before being logged out automatically.'
              )
            } else if (Date.now() >= Number(sessionExpiredAt)) {
              // Grace period is over → Force logout
              logoutUser()
            }
          }
        } else {
          console.error('An unexpected error occurred:', error)
        }
      }
    }

    checkSession()

    intervalRef.current = setInterval(checkSession, 60 * 1000) // Check every 1 minute

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [navigate, page])

  return null
}
