import { useState, useRef } from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { dateFormatToMD } from '../utils/formatDateHandler'
import RegistrySchema from '../validation/RegistrySchema'

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
      await RegistrySchema.validate(registry, { abortEarly: false })
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
