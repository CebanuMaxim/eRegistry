import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import axios from 'axios'

const Header = () => {
  const navigate = useNavigate()
  const { isAdmin } = JSON.parse(localStorage.getItem('userInfo'))

  const logout = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/users/logout`)
      localStorage.removeItem('userInfo')
      navigate('/')
    } catch (error) {}
  }

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>
        {!(useLocation().pathname === '/registries') && (
          <Button className='btn btn-light my-3' onClick={() => navigate(-1)}>
            Go back
          </Button>
        )}

        <Button className='btn btn-light my-3' onClick={logout}>
          Logout
        </Button>
      </div>
      {isAdmin && (
        <Button
          className='btn btn-light my-3'
          onClick={() => navigate('/admin')}
        >
          Admin
        </Button>
      )}
    </header>
  )
}

export default Header
