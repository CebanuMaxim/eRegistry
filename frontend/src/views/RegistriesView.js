import { useState, useEffect } from 'react'
import axios from '../api/axios'
import { Table } from 'react-bootstrap'
import RegistryItem from '../components/RegistryItem'
import AddRegistry from '../components/AddRegistry'
import { toast } from 'react-toastify'

const Registries = () => {
  const [registries, setRegistries] = useState([])

  useEffect(() => {
    async function getRegistries() {
      try {
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
  }, [])

  const addRegistry = async (typographyId, registryId, startDate, endDate) => {
    if (typographyId === '' || registryId === '' || startDate === '') {
      toast.error('Please fill all the fields')
      return
    }
    if (endDate === '') {
      endDate = '--.--.----'
    }
    const registry = {}
    registry.typographyId = typographyId
    registry.registryId = registryId
    registry.startDate = startDate
    registry.endDate = endDate

    setRegistries([registry, ...registries])

    try {
      await axios.post('/registries', registry)
    } catch (err) {
      console.log(err)
    }
  }

  const editRegistry = async (
    _id,
    newTypographyId,
    newRegistryId,
    newStartDate,
    newEndDate
  ) => {
    const registry = registries.find((registry) => registry._id === _id)

    if (newTypographyId) registry.typographyId = newTypographyId
    if (newRegistryId) registry.registryId = newRegistryId
    if (newStartDate) registry.startDate = newStartDate
    if (newEndDate) registry.endDate = newEndDate

    const { typographyId, registryId, startDate, endDate } = registry

    try {
      await axios.put(`/registries/${_id}`, {
        typographyId,
        registryId,
        startDate,
        endDate,
      })
    } catch (err) {
      console.log(err)
    }
  }

  const deleteRegistry = (_id, registryId) => {
    const check = prompt('Please enter registry id:')
    if (check === registryId) {
      try {
        axios.delete(`/registries/${_id}`)
      } catch (err) {
        console.log(err)
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
      <AddRegistry addRegistry={addRegistry} />
    </>
  )
}

export default Registries
