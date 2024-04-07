import axios from 'axios'

export default axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true, // Send cookies with cross-origin requests
})
