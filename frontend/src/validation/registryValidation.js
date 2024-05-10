export default function registryValidation(name, value, errors, setErrors) {
  const checkInput = (inputName, pattern, message) => {
    if (name === inputName && !pattern.test(value)) {
      setErrors((prevErrors) => ({ ...prevErrors, [inputName]: message }))
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [inputName]: '' }))
    }
  }

  switch (name) {
    case 'typographyId':
      checkInput(name, /^\d{7}$/, 'typographyId must be 7-digits string')
      break
    case 'registryId':
      checkInput(name, /^\d{4}$/, 'registryId must be 4-digits string')
      break
    case 'startDate':
      checkInput(
        name,
        /^\d{2}.\d{2}.\d{4}$/,
        'Invalid date format. Please use DD.MM.YYYY'
      )
      break
    case 'endDate':
      checkInput(
        name,
        /^\d{2}.\d{2}.\d{4}$/,
        'Invalid date format. Please use DD.MM.YYYY'
      )
      break
    default:
      break
  }
  return errors
}
