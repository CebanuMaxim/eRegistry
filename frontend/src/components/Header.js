import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import axios from '../api/axios'

const Header = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const isAdmin = localStorage.getItem('isAdmin')
  const logout = async () => {
    try {
      await axios.post('/users/logout')
      localStorage.removeItem('token')
      localStorage.removeItem('isAdmin')
      navigate('/')
    } catch (error) {}
  }
  const currentLocation = useLocation().pathname

  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        borderBottom: '1px solid gray',
      }}
    >
      <div>
        {!(currentLocation === '/registries') && (
          <Button
            className='btn btn-light my-3'
            onClick={() => navigate('/registries')}
          >
            Go back
          </Button>
        )}
      </div>
      <div>
        {currentLocation !== '/admin' && token && isAdmin && (
          <Button
            className='btn btn-light m-3'
            onClick={() => navigate('/admin')}
          >
            Admin
          </Button>
        )}
        <Button className='btn btn-light my-3' onClick={logout}>
          Logout
        </Button>
      </div>
    </header>
  )
}

export default Header
