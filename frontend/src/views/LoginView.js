import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Toast } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import axios from 'axios'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
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

      localStorage.setItem('userInfo', JSON.stringify(res.data.username))
      navigate('/registries')
    } catch (err) {
      console.log(err)
      setShow(true)
    }
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='username'>
          <Form.Control
            type='text'
            placeholder='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='password'>
          <Form.Control
            type='password'
            placeholder='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button type='submit' variant='link'>
            Sign In
          </Button>
          <Button variant='link' onClick={() => navigate('/register')}>
            Register
          </Button>
        </div>
      </Form>
      <Toast
        className='my-3 text-white'
        onClose={() => setShow(false)}
        show={show}
        bg={'danger'}
        delay={1500}
        animation={true}
        autohide
      >
        <Toast.Body>Wrong username or password</Toast.Body>
      </Toast>
    </FormContainer>
  )
}

export default Login
