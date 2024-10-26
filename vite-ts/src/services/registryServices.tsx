import { Registry } from '../types'
import axios from '../api/axios'

export const addRegistryService = async (
  registry: Registry,
  setRegistries: React.Dispatch<React.SetStateAction<Registry[]>>
) => {
  if (registry.endDate === '') {
    registry.endDate = registry.startDate
  }

  try {
    const { data } = await axios.post('/registries', registry)

    setRegistries((prevRegistries: Registry[]) => [data, ...prevRegistries])
  } catch (err) {
    console.error(err)
  }
}

export const editRegistryService = async (
  updatedRegistry: Registry,
  registries: Registry[]
) => {
  const registry = registries.find(
    (registry) => registry._id === updatedRegistry._id
  )
  if (!registry) return

  for (const [key, value] of Object.entries(updatedRegistry)) {
    if (value) registry[key] = value
  }

  try {
    // await axios.put(`/registries/${registry._id}`, registry)

    await fetch(`/api/registries/${registry._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registry),
    })
  } catch (err) {
    console.error(err)
  }
}

export const deleteRegistryService = (
  _id: string,
  registryId: string,
  setRegistries: React.Dispatch<React.SetStateAction<Registry[]>>
) => {
  const check = prompt('Enter registry id:')
  if (check === registryId) {
    try {
      // axios.delete(`/registries/${_id}`)
      fetch(`/api/registries/${_id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })
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
