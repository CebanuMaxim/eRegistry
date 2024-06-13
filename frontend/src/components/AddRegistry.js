import { useContext } from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import RegistrySchema from '../validation/RegistryYupSchema'
import { RegistryValidationContext } from '../context/Context'
import inputValidation from '../validation/inputValidation'
import { errorStyle } from './Styles'

const AddRegistry = ({ addRegistry }) => {
  const { registry, setRegistry, errors, setErrors } = useContext(
    RegistryValidationContext
  )

  const handleChange = (e) => {
    const { name, value } = e.target
    inputValidation(name, value, errors, setErrors)
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
          console.log('Input is valid:', valid)
        })
        .catch((error) => {
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

  return (
    <Card className='mt-5 mb-3'>
      <Card.Body>
        <Form onSubmit={onSubmit}>
          <Row className='my-3'>
            {Object.keys(registry).map((key, index) => {
              if ([key === '_id', 'typography', '__v'].includes(key))
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
