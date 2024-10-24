export default function actValidation(name, value, errors, setErrors) {
  const checkInput = (inputName, pattern, message) => {
    if (name === inputName) {
      if (!pattern.test(value) && value !== '') {
        setErrors((prevErrors) => ({ ...prevErrors, [inputName]: message }))
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, [inputName]: '' }))
      }
    }
  }

  switch (name) {
    // Registry conditions
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
    // Act conditions
    case 'actId':
      checkInput(name, /^\d+$/, 'actId must be 4-digits string')
      break
    case 'date':
      checkInput(
        name,
        /^\d{2}.\d{2}.\d{4}$/,
        'date must be DD.MM.YYYY format valid calendar day'
      )
      break
    case 'firstname':
      checkInput(name, /^[a-zA-Z]+$/, 'Username must contain only letters')
      break
    case 'lastname':
      checkInput(name, /^[a-zA-Z]+$/, 'Lastname must contain only letters')
      break
    case 'idnp':
      checkInput(name, /^\d{13}$/, 'idnp must be a 13-digit number')
      break
    case 'stateFee':
      checkInput(name, /^(0|0.5|1|5)$/, 'Possible values: 0, 0.1, 1, 5')
      break
    case 'notaryFee':
      checkInput(
        name,
        /^(0|395|399|400|445)$/,
        'Possible values: 0, 395, 399, 400, 445'
      )
      break
    case 'actName':
    default:
      break
  }
  return errors
}