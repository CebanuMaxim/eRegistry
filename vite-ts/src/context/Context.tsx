import { createContext } from 'react'
import {
  ActValidationContextType,
  FilteredActsContextType,
  RegistryValidationContextType,
} from '../types'

export const ActValidationContext = createContext<ActValidationContextType>({
  act: {
    actId: '',
    lastname: '',
    firstname: '',
    idnp: '',
    date: '',
    actName: '',
    stateFee: Number(''),
    notaryFee: Number(''),
    registry: '',
    _id: '',
  },
  setAct: () => {},
  errors: { actId: '', date: '' },
  setErrors: () => {},
})

export const RegistryValidationContext =
  createContext<RegistryValidationContextType>({
    registry: {
      typographyId: '',
      registryId: '',
      startDate: '',
      endDate: '',
    },
    setRegistry: () => {},
    errors: { typographyId: '', registryId: '', startDate: '', endDate: '' },
    setErrors: () => {},
  })

export const FilteredActsContext = createContext<FilteredActsContextType>({
  filteredActs: [],
  setFilteredActs: () => {},
})
