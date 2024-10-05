import { useContext } from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import ActSchema from '../validation/ActYupSchema'
import inputValidation from '../validation/inputValidation'
import { ActValidationContext } from '../context/Context'
import { errorStyle } from './Styles'

const AddAct = ({ addAct }) => {
  const { act, setAct, errors, setErrors } = useContext(ActValidationContext)
  const handleChange = async (e) => {
    const { name, value } = e.target
    inputValidation(name, value, errors, setErrors)

    setAct((prevAct) => ({ ...prevAct, [name]: value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    if (!Object.values(errors).every((value) => value === '')) {
      alert(Object.values(errors).join('\n'))
      return
    }
    try {
      await ActSchema.validate(act, { abortEarly: false })
        .then((valid) => {
          // console.log('Input is valid:', valid)
        })
        .catch((error) => {
          console.error('Validation error:', error.message)
        })
      setErrors({})

      await addAct(act)
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
            {Object.entries(act).map(([key, value], index) => {
              if (key === '_id' || key === 'registry' || key === '__v')
                return null
              if (key === 'actName') {
                return (
                  <Col className='mb-4' key={index} md={3} lg={3} xl={3}>
                    <Form.Control
                      as='select'
                      name={key}
                      onChange={handleChange}
                      required
                    >
                      <option value='0'>Select act</option>
                      <option value='Procură. Mijloc de transport.'>
                        Procură. Mijloc de transport.
                      </option>
                      <option value='Legalizarea copiei.'>
                        Legalizarea copiei.
                      </option>
                      <option value='legalizarea semnaturii traducatorului'>
                        Legalizarea semnăturii traducătorului.
                      </option>
                      <option value='Declarație. Plecare temporară.'>
                        Legalizarea semnăturii pe acord la plecare/multiple
                        plecări.
                      </option>
                      <option value='Declarație. Multiple plecări.'>
                        Declarație autentificată la plecare/multiple plecări.
                      </option>
                      <option value='Procură. Să cumpere/vămuiască auto.'>
                        Procură cumpărare/vămuire mijloc de transport.
                      </option>
                    </Form.Control>
                    {errors[key] && <div style={errorStyle}>{errors[key]}</div>}
                  </Col>
                )
              } else {
                return (
                  <Col className='mb-4' key={index} md={3} lg={3} xl={3}>
                    <Form.Control
                      placeholder={key}
                      name={key}
                      value={value}
                      onChange={handleChange}
                      required
                    />
                    {errors[key] && <div style={errorStyle}>{errors[key]}</div>}
                  </Col>
                )
              }
            })}
          </Row>
          <Row>
            <Col className='d-grid'>
              <Button type='submit' variant='secondary'>
                Add act
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default AddAct
