import React from 'react'
import axios from '../api/axios'
import { Registry } from '../types'

const addRegistry = async (
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

export default addRegistry
