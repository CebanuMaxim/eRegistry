import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Loader from '../components/Loader'
import { Tabs, Tab, Table } from 'react-bootstrap'
import axios from 'axios'

const Admin = () => {
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState([])

  useEffect(() => {
    async function getUsers() {
      try {
        setLoading(true)
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/users`)
        setUsers(res.data)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    getUsers()
  }, [])

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          {users.map((user) => {
            return (
              <div key={user._id}>
                <strong>{user.username}</strong>

                <div>{user.password}</div>
              </div>
            )
          })}
        </>
      )}
    </>
  )
}

export default Admin
