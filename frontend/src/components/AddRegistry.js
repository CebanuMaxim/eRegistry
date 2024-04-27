import { useState, useRef } from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import * as yup from 'yup'
import { dateFormatToMD } from '../utils/formatDateHandler'

const isValidCalendarDay = (value) => {
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
}

const DATE_FORMAT_REGEX =
  /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(19|20)\d{2}$/

const AddRegistrySchema = yup.object().shape({
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
    .matches(DATE_FORMAT_REGEX, 'Invalid date format. Please use DD.MM.YYYY')
    .required('End Date is required'),
})

const AddRegistry = ({ addRegistry }) => {
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

  const ref = useRef()
  const takeFocus = () => {
    ref.current.focus()
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setRegistry((prevRegistry) => ({ ...prevRegistry, [name]: value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      await AddRegistrySchema.validate(registry, { abortEarly: false })
      setErrors({})
      await addRegistry(registry)
      takeFocus()
    } catch (validationErrors) {
      const allErrors = {}
      validationErrors.inner.forEach((error) => {
        allErrors[error.path] = error.message
      })
      setErrors(allErrors)
    }
  }

  const errorStyle = {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: '0.25rem',
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(registry.startDate)) {
    registry.startDate = dateFormatToMD(registry.startDate)
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(registry.endDate)) {
    registry.endDate = dateFormatToMD(registry.endDate)
  }

  return (
    <Card className='mt-5 mb-3'>
      <Card.Body>
        <Form onSubmit={onSubmit}>
          <Row className='my-3'>
            <Col>
              <Form.Control
                autoFocus
                placeholder='Typography Id'
                name='typographyId'
                value={registry.typographyId}
                onChange={handleChange}
                ref={ref}
                required
              />
              {errors.typographyId && (
                <div style={errorStyle}>{errors.typographyId}</div>
              )}
            </Col>
            <Col>
              <Form.Control
                placeholder='Registry Id'
                name='registryId'
                value={registry.registryId}
                onChange={handleChange}
                required
              />
              {errors.registryId && (
                <div style={errorStyle}>{errors.registryId}</div>
              )}
            </Col>
            <Col>
              <Form.Control
                placeholder='Start Date'
                name='startDate'
                value={registry.startDate}
                onChange={handleChange}
                required
              />
              {errors.startDate && (
                <div style={errorStyle}>{errors.startDate}</div>
              )}
            </Col>
            <Col>
              <Form.Control
                placeholder='End Date'
                name='endDate'
                value={registry.endDate}
                onChange={handleChange}
              />
              {errors.endDate && <div style={errorStyle}>{errors.endDate}</div>}
            </Col>
          </Row>
          <Row>
            <Col className='d-grid'>
              <Button type='submit' variant='secondary'>
                Add Registry
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default AddRegistry
