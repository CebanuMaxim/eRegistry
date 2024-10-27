import { ChangeEvent, FormEvent, useContext } from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import RegistrySchema from '../validation/RegistryYupSchema'
import { RegistryValidationContext } from '../context/Context'
import inputValidation from '../validation/inputValidation'
import { AddRegistryProps, Registry } from '../types'
import { errorStyle } from './Styles'

const AddRegistry: React.FC<AddRegistryProps> = ({ addRegistry }) => {
  const { registry, setRegistry, errors, setErrors } = useContext(
    RegistryValidationContext
  )

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    inputValidation(name, value, errors, setErrors)
    setRegistry((prevRegistry: Registry) => ({
      ...prevRegistry,
      [name]: value,
    }))
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!Object.values(errors).every((value) => value === '')) {
      alert(Object.values(errors).join('\n'))
      return
    }
    try {
      await RegistrySchema.validate(registry, { abortEarly: false })
      setErrors({
        typographyId: '',
        registryId: '',
        startDate: '',
        endDate: '',
      })
      await addRegistry(registry)
    } catch (err) {
      const error = err as Error
      console.error(error)
      // const allErrors: Record<string, string> = {}
      // error.inner.forEach((error) => {
      //   allErrors[error.path] = error.message
      // })
      // setErrors(allErrors)
    }
  }
  return (
    <Card className='mt-5 mb-3'>
      <Card.Body>
        <Form onSubmit={onSubmit}>
          <Row className='my-3'>
            {Object.keys(registry).map((key, index) => {
              if (['_id', 'typography', '__v'].includes(key)) return null

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
