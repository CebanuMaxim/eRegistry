import { useState, useEffect, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import axios from '../api/axios'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('userInfo')) {
      navigate('/registries')
    }
    // eslint-disable-next-line
  }, [])

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault()

    try {
      const response = await axios.post('/users/login', {
        username,
        password,
      })
      localStorage.setItem(
        'userInfo',
        JSON.stringify({
          isAdmin: response.data.isAdmin,
          id: response.data.id,
        })
      )

      navigate('/registries')
    } catch (err) {
      // toast.error(err.response.data.message)
      console.error(err)
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