import React, { useState, useEffect } from 'react'
import axios from 'axios'
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
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/users`
        )
        setUsers(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    getUsers()
  }, [])

  const submitHandler = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
    } else {
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/users`, {
          username,
          password,
          isAdmin,
        })
        const usr = { username, password, isAdmin }
        setUsers([...users, usr])
      } catch (error) {
        console.log(error)
        toast.error('All fields have to be ')
      }
    }
  }

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/users/${id}`)
      setUsers(users.filter((user) => user._id !== id))
    } catch (error) {
      console.log(error)
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
            />
          </Form.Group>

          <Form.Group className='my-3' controlId='password'>
            <Form.Control
              type='password'
              placeholder='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className='my-3' controlId='confirmPassword'>
            <Form.Control
              type='password'
              placeholder='confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
