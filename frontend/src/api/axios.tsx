import axios from 'axios'

// eslint-disable-next-line react-refresh/only-export-components
export default axios.create({
  baseURL: 'http://localhost:5000/api',
  // baseURL: 'http://registru/api',
  withCredentials: true, // Send cookies with cross-origin requests
})
