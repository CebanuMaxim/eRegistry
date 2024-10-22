import React, { useState } from 'react'
import {
  ActValidationContext,
  RegistryValidationContext,
  FilteredActsContext,
} from './Context'
import { Act, Registry, ProviderProps } from '../types'

export const ActValidationProvider: React.FC<ProviderProps> = ({
  children,
}) => {
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

export const FilteredActsProvider: React.FC<ProviderProps> = ({ children }) => {
  const [filteredActs, setFilteredActs] = useState<Act[]>([])

  return (
    <FilteredActsContext.Provider value={{ filteredActs, setFilteredActs }}>
      {children}
    </FilteredActsContext.Provider>
  )
}

export const RegistryValidationProvider: React.FC<ProviderProps> = ({
  children,
}) => {
  const [registry, setRegistry] = useState<Registry>({
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
