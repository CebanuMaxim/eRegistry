import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import axios from 'axios'
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
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/login`,
        {
          username,
          password,
        }
      )
      const { username: user, isAdmin } = res.data
      localStorage.setItem('userInfo', JSON.stringify({ user, isAdmin }))
      navigate('/registries')
    } catch (err) {
      toast.error(err.response.data.message)
    }
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='username'>
          <Form.Control
            autoFocus
            type='text'
            placeholder='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='password'>
          <Form.Control
            type='password'
            placeholder='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button type='submit' variant='link'>
            Sign In
          </Button>
        </div>
      </Form>
    </FormContainer>
  )
}

export default Login
