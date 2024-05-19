import React, { useState } from 'react'
import {
  ActValidationContext,
  // ActsValidationContext,
  RegistryValidationContext,
} from './Context'

export const ActValidationProvider = ({ children }) => {
  const [act, setAct] = useState({
    actId: '',
    date: '',
    firstname: '',
    lastname: '',
    idnp: '',
    actName: '',
    stateFee: '',
    notaryFee: '',
  })

  const [errors, setErrors] = useState({
    actId: '',
    date: '',
    firstname: '',
    lastname: '',
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
// export const ActsValidationProvider = ({ children }) => {
//   const [acts, setActs] = useState([])

//   return (
//     <ActsValidationContext.Provider value={{ acts, setActs }}>
//       {children}
//     </ActsValidationContext.Provider>
//   )
// }

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
