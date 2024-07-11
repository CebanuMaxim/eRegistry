import React, { useState } from 'react'
import {
  ActValidationContext,
  RegistryValidationContext,
  FilteredActsContext,
} from './Context'

export const ActValidationProvider = ({ children }) => {
  const [act, setAct] = useState({
    actId: '',
    date: '',
    actName: '',
    lastname: '',
    firstname: '',
    idnp: '',
    stateFee: '',
    notaryFee: '',
  })

  const [errors, setErrors] = useState({
    actId: '',
    date: '',
    lastname: '',
    firstname: '',
    idnp: '',
    actName: '',
    stateFee: '',
    notaryFee: '',
  })

  return (
    <ActValidationContext.Provider value={{ act, setAct, errors, setErrors }}>
      {children}
    </ActValidationContext.Provider>
  )
}

export const FilteredActsProvider = ({ children }) => {
  const [filteredActs, setFilteredActs] = useState([])

  return (
    <FilteredActsContext.Provider value={{ filteredActs, setFilteredActs }}>
      {children}
    </FilteredActsContext.Provider>
  )
}

export const RegistryValidationProvider = ({ children }) => {
  const [registry, setRegistry] = useState({
    typographyId: '',
    registryId: '',
    startDate: '',
    endDate: '',
  })

  const [errors, setErrors] = useState({
    typographyId: '',
    registryId: '',
    startDate: '',
    endDate: '',
  })
  return (
    <RegistryValidationContext.Provider
      value={{ registry, setRegistry, errors, setErrors }}
    >
      {children}
    </RegistryValidationContext.Provider>
  )
}
