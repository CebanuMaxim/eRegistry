import * as yup from 'yup'

const DATE_FORMAT_REGEX =
  /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(19|20)\d{2}$/

const RegistrySchema = yup.object().shape({
  typographyId: yup
    .string()
    .matches(/^\d{7}$/, 'typographyId must be a 7-digit number')
    .required('Typography Id is required'),
  registryId: yup
    .string()
    .matches(/^\d{4}$/, 'typographyId must be a 4-digit number')
    .required('Registry Id is required'),
  startDate: yup
    .string()
    .test('valid-calendar-day', 'Invalid calendar day', (value) => {
      // Skip validation if the value is empty
      if (!value) return true

      // Parse the date string into day, month, and year components
      const [day, month, year] = value.split('.').map(Number)

      // Create a Date object and set the day, month, and year
      const date = new Date(year, month - 1, day) // Month is zero-based in JavaScript Date object

      // Check if the parsed date components match the original values and the date object is valid
      return (
        date.getDate() === day && // Ensure day matches the original value
        date.getMonth() + 1 === month && // Ensure month matches the original value
        date.getFullYear() === year // Ensure year matches the original value
      )
    })
    .matches(DATE_FORMAT_REGEX, 'Invalid date format. Please use DD.MM.YYYY')
    .required('Start Date is required'),
  endDate: yup
    .string()
    .test('valid-calendar-day', 'Invalid calendar day', (value) => {
      // Skip validation if the value is empty
      if (!value) return true

      // Parse the date string into day, month, and year components
      const [day, month, year] = value.split('.').map(Number)

      // Create a Date object and set the day, month, and year
      const date = new Date(year, month - 1, day) // Month is zero-based in JavaScript Date object

      // Check if the parsed date components match the original values and the date object is valid
      return (
        date.getDate() === day && // Ensure day matches the original value
        date.getMonth() + 1 === month && // Ensure month matches the original value
        date.getFullYear() === year // Ensure year matches the original value
      )
    })
    .matches(DATE_FORMAT_REGEX, 'Invalid date format. Please use DD.MM.YYYY'),
})

export default RegistrySchema
