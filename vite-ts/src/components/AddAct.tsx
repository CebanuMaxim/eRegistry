import React, { ChangeEvent, FormEvent, useContext } from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import ActSchema from '../validation/ActYupSchema'
import inputValidation from '../validation/inputValidation'
import { ActValidationContext } from '../context/Context'
import { errorStyle } from './Styles'
import { ActValidationContextType, AddActProps } from '../types'

const AddAct: React.FC<AddActProps> = ({ addAct }) => {
  const { act, setAct, errors, setErrors } =
    useContext<ActValidationContextType>(ActValidationContext)
  delete act._id

  const onInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    inputValidation(name, value, errors, setErrors)
    setAct((prevAct) => ({ ...prevAct, [name]: value }))
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!Object.values(errors).every((value) => value === '')) {
      alert(Object.values(errors).join('\n'))
      return
    }
    try {
      await ActSchema.validate(act, { abortEarly: false })
      setErrors({})
      await addAct(act)
    } catch (err) {
      console.error(err)
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
                      onChange={onInputChange}
                      required
                    >
                      <option value='0'>Select act</option>
                      <option value='Act autentificat'>Act autentificat</option>
                      <option value='Act legalizat'>Act legalizat</option>
                      <option value='Alte acte'>Alte acte</option>
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
                      value={value?.toString()}
                      onChange={onInputChange}
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
