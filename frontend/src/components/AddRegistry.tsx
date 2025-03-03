import { ChangeEvent, FormEvent, useContext } from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import RegistrySchema from '../validation/RegistryYupSchema'
import { RegistryValidationContext } from '../context/Context'
import inputValidation from '../validation/inputValidation'
import {
  AddRegistryProps,
  Registry,
  RegistryValidationContextType,
} from '../types'
import { errorStyle } from './Styles'

const AddRegistry: React.FC<AddRegistryProps> = ({ addRegistry }) => {
  const { registry, setRegistry, errors, setErrors } =
    useContext<RegistryValidationContextType>(RegistryValidationContext)

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
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
      setErrors({})
      await addRegistry(registry)
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <Card className='mt-5 mb-3'>
      <Card.Body>
        <Form onSubmit={onSubmit}>
          <Row className='my-3'>
            {Object.keys(registry).map((key, index) => {
              if (['_id', '__v'].includes(key)) return null

              return (
                <Col key={index}>
                  <Form.Control
                    placeholder={key}
                    name={key}
                    onChange={onInputChange}
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
