export default function actValidation(
  name: string,
  value: string,
  errors: Record<string, string>,
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>
) {
  const checkInput = (inputName: string, pattern: RegExp, message: string) => {
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
      checkInput(name, /^\d+$/, 'only digits are allowed')
      break
    case 'date':
      checkInput(
        name,
        /^\d{2}.\d{2}.(20)\d{2}$/,
        'date must be DD.MM.YYYY format valid calendar day'
      )
      break
    case 'firstname':
      checkInput(
        name,
        /^[\p{L}\p{M}-]+$/u,
        'Username must contain only letters'
      )
      break
    case 'lastname':
      checkInput(
        name,
        /^[\p{L}\p{M}-]+$/u,
        'Lastname must contain only letters'
      )
      break
    case 'idnp':
      checkInput(
        name,
        /^\d{13}$|^[A-Z]{3}-[A-Z]{1,2}-\d{1,8}$/,
        'idnp must be a 13-digit string'
      )
      break
    case 'stateFee':
      checkInput(name, /^[\d.]+$/, 'only digits are allowed')
      break
    case 'notaryFee':
      checkInput(name, /^[\d]+$/, 'only digits are allowed')
      break
    case 'actName':
    default:
      break
  }

  return errors
}
