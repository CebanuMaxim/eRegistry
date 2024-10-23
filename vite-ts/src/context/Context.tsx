import { createContext } from 'react'
import {
  FilteredActsContextType,
  RegistryValidationContextType,
} from '../types'

export const ActValidationContext = createContext({})

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
