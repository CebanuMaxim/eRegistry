import { useState, useEffect } from 'react'
import axios from '../api/axios'
import { Form, Button, Table } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { toast } from 'react-toastify'

const Admin = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get('/users')
        setUsers(response.data)
      } catch (err) {
        console.error(err)
      }
    }
    getUsers()
  }, [])

  const submitHandler = async (e) => {
    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    try {
      await axios.post('/users', {
        username,
        password,
        isAdmin,
      })
    } catch (err) {
      console.error(err)
    }
  }

  const deleteUser = async (id) => {
    try {
      await axios.delete(`/users/${id}`)
      setUsers(users.filter((user) => user._id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <Table striped>
        <thead>
          <tr>
            <th>Username</th>
            <th>Is admin</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => {
            return (
              <tr key={i}>
                <td>{user.username}</td>
                <td>{String(user.isAdmin)}</td>
                <td>
                  <Button
                    onClick={() => deleteUser(user._id)}
                    variant='link'
                    size='sm'
                  >
                    delete
                  </Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
      <FormContainer>
        <h2>Register new user</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group className='my-3' controlId='username'>
            <Form.Control
              type='text'
              placeholder='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className='my-3' controlId='password'>
            <Form.Control
              type='password'
              placeholder='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className='my-3' controlId='confirmPassword'>
            <Form.Control
              type='password'
              placeholder='confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='isAdmin'>
            <Form.Check
              type='checkbox'
              label='Is Admin'
              value={isAdmin}
              onChange={() => setIsAdmin(!isAdmin)}
            />
          </Form.Group>

          <div>
            <Button type='submit' variant='secondary'>
              Register
            </Button>
          </div>
        </Form>
      </FormContainer>
    </>
  )
}

export default Admin
