import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Table } from 'react-bootstrap'
import RegistryItem from '../components/RegistryItem'
import AddRegistry from '../components/AddRegistry'
import Header from '../components/Header'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'

const Registries = () => {
  const [loading, setLoading] = useState(false)
  const [registries, setRegistries] = useState([])

  useEffect(() => {
    async function getRegistries() {
      try {
        setLoading(true)
        let registries = await axios.get(
          `${process.env.REACT_APP_API_URL}/registries`
        )

        setRegistries(registries.data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    getRegistries()
    // eslint-disable-next-line
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

    await axios
      .post(`${process.env.REACT_APP_API_URL}/registries`, registry)
      .catch(function (error) {
        console.log(error)
      })
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

    await axios
      .put(`${process.env.REACT_APP_API_URL}/registries/${_id}`, {
        typographyId,
        registryId,
        startDate,
        endDate,
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  function deleteRegistry(_id, registryId) {
    const check = prompt('Please enter registry id:')
    if (check === registryId) {
      axios
        .delete(`${process.env.REACT_APP_API_URL}/registries/${_id}`)
        .catch(function (error) {
          console.log(error)
        })

      setRegistries((prevRegistries) =>
        prevRegistries.filter((item) => item._id !== _id)
      )
    } else {
      alert('Wrong id')
    }
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
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
              {registries.map((registry) => {
                return (
                  <RegistryItem
                    key={registry.registryId}
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
      )}
    </>
  )
}

export default Registries
