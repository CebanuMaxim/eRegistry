import { createContext } from 'react'
import { FilteredActsContextType } from '../types'

export const ActValidationContext = createContext()

export const RegistryValidationContext = createContext()

export const FilteredActsContext = createContext<FilteredActsContextType>({
  filteredActs: [],
  setFilteredActs: () => {},
})
