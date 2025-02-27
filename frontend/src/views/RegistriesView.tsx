import { useState, useEffect } from 'react'
import axios from '../api/axios'
import { Table } from 'react-bootstrap'
import RegistryItem from '../components/RegistryItem'
import AddRegistry from '../components/AddRegistry'
import { Registry } from '../types'
import {
  addRegistryService,
  editRegistryService,
  deleteRegistryService,
} from '../services/registryServices'
import { useSession } from '../hooks/useSession'

const Registries = () => {
  useSession('RegistriesView')
  const [registries, setRegistries] = useState<Registry[]>([])

  useEffect(() => {
    async function getRegistries() {
      try {
        const response = await axios.get('/registries')
        if (response.data === '') {
          console.log(response.statusText)
          return
        }
        setRegistries(
          response.data
            .sort(function (a: Registry, b: Registry) {
              return Number(a.registryId) - Number(b.registryId)
            })
            .reverse()
        )
      } catch (err) {
        console.error(err)
      }
    }
    getRegistries()
  }, [])

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
