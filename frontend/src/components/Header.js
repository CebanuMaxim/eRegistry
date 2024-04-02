import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import axios from '../api/axios'

const Header = () => {
  const navigate = useNavigate()

  const userInfo = JSON.parse(localStorage.getItem('userInfo'))

  const logout = async () => {
    try {
      await axios.post('/users/logout')
      localStorage.removeItem('userInfo')
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
        {currentLocation !== '/admin' && userInfo && userInfo.isAdmin && (
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
