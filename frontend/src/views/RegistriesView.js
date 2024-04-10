import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../api/axios'
import { Table } from 'react-bootstrap'
import RegistryItem from '../components/RegistryItem'
import AddRegistry from '../components/AddRegistry'

const Registries = () => {
  const [registries, setRegistries] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    async function getRegistries() {
      try {
        // const token = localStorage.getItem('token')

        // axios.interceptors.response.use(
        //   (response) => {
        //     return response
        //   },
        //   async (error) => {
        //     if (
        //       error.response &&
        //       error.response.status === 401 &&
        //       error.response.data.message === 'Token expired'
        //     ) {
        //       // Handle token expiration (e.g., log out the user)
        //       console.log('Token expired. Logging out...')
        //       localStorage.removeItem('toke')
        //       localStorage.removeItem('isAdmin')
        //       navigate('/')
        //     }
        //     return Promise.reject(error)
        //   }
        // )

        // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

        let response = await axios.get('/registries')

        setRegistries(
          response.data
            .sort(function (a, b) {
              return a.registryId - b.registryId
            })
            .reverse()
        )
      } catch (err) {
        console.error(err)
      }
    }
    getRegistries()
  }, [navigate])

  const addRegistry = async (registry) => {
    if (registry.endDate === '') {
      registry.endDate = '--.--.----'
    }

    try {
      const { data } = await axios.post('/registries', registry)

      console.log('1: ', data)
      setRegistries([data, ...registries])
      console.log('2: ', data)
    } catch (err) {
      console.error(err)
    }
  }

  const editRegistry = async (updatedRegistry) => {
    const registry = registries.find(
      (registry) => registry._id === updatedRegistry._id
    )

    for (const [key, value] of Object.entries(updatedRegistry)) {
      if (value) registry[key] = value
    }
    try {
      await axios.put(`/registries/${registry._id}`, registry)
    } catch (err) {
      console.error(err)
    }
  }

  const deleteRegistry = (_id, registryId) => {
    const check = prompt('Enter registry id:')
    if (check === registryId) {
      try {
        axios.delete(`/registries/${_id}`)
      } catch (err) {
        console.error(err)
      }
      setRegistries((prevRegistries) =>
        prevRegistries.filter((item) => item._id !== _id)
      )
    } else {
      alert('Wrong id')
    }
  }

  return (
    <>
      <AddRegistry addRegistry={addRegistry} />
      <Table striped>
        <thead>
          <tr className='border-bottom p-3 fw-bolder'>
            <td>Registry Number</td>
            <td>Start date</td>
            <td>End date</td>
            <td></td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {registries.map((registry, i) => {
            return (
              <RegistryItem
                key={i}
                registry={registry}
                editRegistry={editRegistry}
                deleteRegistry={deleteRegistry}
              />
            )
          })}
        </tbody>
      </Table>
    </>
  )
}

export default Registries
