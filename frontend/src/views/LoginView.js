import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import axios from '../api/axios'
import { toast } from 'react-toastify'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const userInfo = localStorage.getItem('userInfo')

  useEffect(() => {
    if (userInfo) {
      navigate('/registries')
    }
  }, [navigate, userInfo])

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/users/login', {
        username,
        password,
      })
      console.log(response)
      const { username: user, isAdmin } = response.data

      localStorage.setItem('userInfo', JSON.stringify({ user, isAdmin }))
      navigate('/registries')
    } catch (err) {
      toast.error(err.response.data.message)
    }
  }

  return (
    <FormContainer>
      <Form onSubmit={submitHandler} style={{ marginTop: '200px' }}>
        <Form.Group
          className='my-2'
          controlId='username'
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Form.Control
            autoFocus
            type='text'
            autoComplete='off'
            placeholder='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              border: 'none',
              boxShadow: 'inset 0 0 5px #ddd',
              width: '300px',
            }}
          ></Form.Control>
        </Form.Group>

        <Form.Group
          className='my-2'
          controlId='password'
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Form.Control
            type='password'
            placeholder='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              border: 'none',
              boxShadow: 'inset 0 0 5px #ddd',
              width: '300px',
            }}
          ></Form.Control>
        </Form.Group>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            type='submit'
            variant='link'
            style={{ color: 'cornflowerblue' }}
          >
            Sign In
          </Button>
        </div>
      </Form>
    </FormContainer>
  )
}

export default Login
