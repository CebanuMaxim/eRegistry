import { useState, useEffect } from 'react'
import axios from '../api/axios'
import { Table } from 'react-bootstrap'
import RegistryItem from '../components/RegistryItem'
import AddRegistry from '../components/AddRegistry'

const Registries = () => {
  const [registries, setRegistries] = useState([])

  useEffect(() => {
    async function getRegistries() {
      try {
        let response = await axios.get('/registries')
        console.log(response)
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
  }, [])

  const addRegistry = async (registry) => {
    if (registry.endDate === '') {
      registry.endDate = '--.--.----'
    }

    setRegistries([registry, ...registries])

    try {
      await axios.post('/registries', registry)
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
    console.log(registry)
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
