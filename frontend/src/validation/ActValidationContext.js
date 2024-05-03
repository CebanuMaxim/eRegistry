// ValidationContext.js
import React, { createContext, useContext, useState } from 'react'

const ActValidationContext = createContext()

export const useValidation = () => useContext(ActValidationContext)

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
