import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import axios from 'axios'
import { toast } from 'react-toastify'

const Register = () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    if (!(password === confirmPassword)) {
      toast.error('Passwords not matching')
      return
    }
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/users`, {
        name,
        password,
      })

      localStorage.setItem('userInfo', JSON.stringify(res.data.name))
      navigate('/registries')
    } catch (err) {
      console.log(err)
      toast.error(err.response.data || err.error)
    }
  }

  return (
    <FormContainer>
      <h1>Sign Up</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='name'>
          <Form.Control
            type='text'
            placeholder='username'
            value={name}
            onChange={(e) => setName(e.target.value)}
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

        <Form.Group className='my-2' controlId='confirmPassword'>
          <Form.Control
            type='password'
            placeholder='confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button type='submit' variant='primary'>
            Register
          </Button>
          <Button variant='link' onClick={() => navigate('/')}>
            Login
          </Button>
        </div>
      </Form>
    </FormContainer>
  )
}

export default Register
