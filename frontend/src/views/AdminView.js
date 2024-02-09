import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import axios from 'axios'
import { Form, Button, Toast, Table } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'

const Admin = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [show, setShow] = useState(false)
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
      setShow(true)
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
      <Header />
      <Table striped bordered size='sm'>
        <thead>
          <tr>
            <th>Username</th>
            <th>Is admin</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user._id}>
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
    </>
  )
}

export default Admin
