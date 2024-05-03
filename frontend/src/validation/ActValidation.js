import { useValidation } from './ActValidationContext'
import moment from 'moment'

const useActValidation = (name, value) => {
  const { errors, setErrors } = useValidation()

  const checkInput = (inputName, pattern, message) => {
    if (name === inputName && !pattern.test(value)) {
      if (
        (name === 'startDate' || name === 'endDate') &&
        !moment(value, 'DD.MM.YYYY', true).isValid()
      ) {
        console.log('notValidDate')
      }
      setErrors((prevErrors) => ({ ...prevErrors, [inputName]: message }))
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [inputName]: '' }))
    }
  }

  switch (name) {
    case 'typographyId':
      checkInput(
        name,
        value,
        'typographyId',
        /^\d{7}$/,
        'typographyId must be 7-digits string'
      )
      break
    case 'registryId':
      checkInput(
        name,
        value,
        'registryId',
        /^\d{4}$/,
        'registryId must be 4-digits string'
      )
      break
    case 'startDate':
      checkInput(
        name,
        value,
        'startDate',
        /^\d{2}.\d{2}.\d{4}$/,
        'Invalid date format. Please use DD.MM.YYYY'
      )
      break
    case 'endDate':
      checkInput(
        name,
        value,
        'endDate',
        /^\d{2}.\d{2}.\d{4}$/,
        'Invalid date format. Please use DD.MM.YYYY'
      )
      break
    default:
      break
  }
  return errors
}

export default useActValidation
