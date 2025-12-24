import { useState, useEffect } from 'react'
import axios from '../api/axios'
import { isAxiosError } from 'axios'
import { Table } from 'react-bootstrap'
import RegistryItem from '../components/RegistryItem'
import AddRegistry from '../components/AddRegistry'
import { Registry } from '../types'
import {
  addRegistryService,
  editRegistryService,
  deleteRegistryService,
} from '../services/registryServices'
import { useNavigate } from 'react-router-dom'

const Registries = () => {
  const [registries, setRegistries] = useState<Registry[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    async function getRegistries() {
      try {
        const response = await axios.get('/registries')
        if (response.data === '') {
          console.log(response.statusText)
          return
        }

        setRegistries(
          response.data.sort((a: Registry, b: Registry) => {
            const aHasTopPriorityIndex = Number(a.registryIndex) === 1
            const bHasTopPriorityIndex = Number(b.registryIndex) === 1

            // Правило №1: записи с registryIndex === 1 всегда должны быть сверху списка
            if (aHasTopPriorityIndex && !bHasTopPriorityIndex) return -1
            if (!aHasTopPriorityIndex && bHasTopPriorityIndex) return 1

            // Правило №2: внутри одной "группы" сортировка как раньше — по registryId по убыванию
            return Number(b.registryId) - Number(a.registryId)
          })
        )
      } catch (err: unknown) {
        if (isAxiosError(err)) {
          console.log('ERROR! RegistriesView.36: ', err.response?.data?.message)
          alert(err.response?.data?.message || 'An unknown error occurred.')
          await axios.post('/users/logout')
          localStorage.clear()
          navigate('/')
        } else {
          console.log('Unexpected error: ', err)
          alert('An unexpected error occurred.')
        }
      }
    }
    getRegistries()
  }, [navigate])

  const addRegistry = (registry: Registry) =>
    addRegistryService(registry, setRegistries)
  const editRegistry = (updatedRegistry: Registry) =>
    editRegistryService(updatedRegistry, registries)
  const deleteRegistry = (_id: string, registryId: string) =>
    deleteRegistryService(_id, registryId, setRegistries)

  return (
    <>
      <AddRegistry addRegistry={addRegistry} />
      <Table striped>
        <thead>
          <tr className='border-bottom p-3 fw-bolder'>
            <td>Index</td>
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
