import { useContext } from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import RegistrySchema from '../validation/RegistryYupSchema'
import { RegistryValidationContext } from '../context/Context'
import registryValidation from '../validation/registryValidation'

const AddRegistry = ({ addRegistry }) => {
  const { registry, setRegistry, errors, setErrors } = useContext(
    RegistryValidationContext
  )

  const handleChange = (e) => {
    const { name, value } = e.target
    registryValidation(name, value, errors, setErrors)
    setRegistry((prevRegistry) => ({ ...prevRegistry, [name]: value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!Object.values(errors).every((value) => value === '')) {
      alert(Object.values(errors).join('\n'))
      return
    }
    try {
      await RegistrySchema.validate(registry, { abortEarly: false })
        .then((valid) => {
          // Handle valid input, update state or form
          console.log('Input is valid:', valid)
        })
        .catch((error) => {
          // Handle validation errors
          console.error('Validation error:', error.message)
        })
      setErrors({})
      await addRegistry(registry)
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

  return (
    <Card className='mt-5 mb-3'>
      <Card.Body>
        <Form onSubmit={onSubmit}>
          <Row className='my-3'>
            {Object.entries(registry).map(([key, value], index) => {
              if (key === '_id' || key === 'typography' || key === '__v')
                return null
              return (
                <Col key={index}>
                  <Form.Control
                    placeholder={key}
                    name={key}
                    onChange={handleChange}
                    required
                  />
                  {errors[key] && <div style={errorStyle}>{errors[key]}</div>}
                </Col>
              )
            })}
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
