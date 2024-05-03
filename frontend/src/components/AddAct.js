import { useState, useRef } from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import ActSchema from '../validation/ActSchema'
import moment from 'moment'

const AddAct = ({ addAct }) => {
  const [act, setAct] = useState({
    actId: '',
    date: '',
    firstname: '',
    lastname: '',
    idnp: '',
    actName: '',
    stateFee: '',
    notaryFee: '',
  })
  const [errors, setErrors] = useState({
    actId: '',
    date: '',
    firstname: '',
    lastname: '',
    idnp: '',
    actName: '',
    stateFee: '',
    notaryFee: '',
  })

  const ref = useRef(null)
  const takeFocus = () => {
    ref.current.focus(null)
  }
  const checkInput = (name, value, inputName, pattern, message) => {
    if (name === inputName && !pattern.test(value)) {
      if (name === 'date' && !moment(value, 'DD.MM.YYYY', true).isValid()) {
        console.log('notValidDate')
      }
      setErrors((prevErrors) => ({ ...prevErrors, [inputName]: message }))
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [inputName]: '' }))
    }
    if (value === '')
      setErrors((prevErrors) => ({ ...prevErrors, [inputName]: '' }))
  }

  const actValidation = (name, value) => {
    switch (name) {
      case 'actId':
        checkInput(
          name,
          value,
          'actId',
          /^\d+$/,
          'actId must contain only digits'
        )
        break
      case 'date':
        checkInput(
          name,
          value,
          'date',
          /^\d{2}.\d{2}.\d{4}$/,
          'Invalid date format. Please use DD.MM.YYYY'
        )
        break
      case 'firstname':
        checkInput(
          name,
          value,
          'firstname',
          /^[a-zA-Z]+$/,
          'Username must contain only letters'
        )
        break
      case 'lastname':
        checkInput(
          name,
          value,
          'lastname',
          /^[a-zA-Z]+$/,
          'Lastname must contain only letters'
        )
        break
      case 'idnp':
        checkInput(
          name,
          value,
          'idnp',
          /^\d{13}$/,
          'idnp must be a 13-digit number'
        )
        break
      case 'stateFee':
        checkInput(
          name,
          value,
          'stateFee',
          /^(0|0.5|1|5)$/,
          'Possible values: 0, 0.1, 1, 5'
        )
        break
      case 'notaryFee':
        checkInput(
          name,
          value,
          'notaryFee',
          /^(0|395|399|400|445)$/,
          'Possible values: 0, 395, 399, 400, 445'
        )
        break
      case 'actName':
      default:
        break
    }
  }

  const handleChange = async (e) => {
    const { name, value } = e.target
    actValidation(name, value)

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
          // Handle valid input, update state or form
          console.log('Input is valid:', valid)
        })
        .catch((error) => {
          // Handle validation errors
          console.error('Validation error:', error.message)
        })
      setErrors({})
      await addAct(act)
      takeFocus()
    } catch (validationErrors) {
      const allErrors = {}
      validationErrors.inner.forEach((error) => {
        allErrors[error.path] = error.message
      })
      setErrors(allErrors)
    }
    takeFocus()
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
            <Col>
              <Form.Control
                autoFocus
                placeholder='act ID'
                name='actId'
                value={act.actId}
                onChange={handleChange}
                ref={ref}
                required
              />
              {errors.actId && <div style={errorStyle}>{errors.actId}</div>}
            </Col>
            <Col>
              <Form.Control
                placeholder='date'
                name='date'
                value={act.date}
                onChange={handleChange}
                required
              />
              {errors.date && <div style={errorStyle}>{errors.date}</div>}
            </Col>
            <Col>
              <Form.Control
                placeholder='firstname'
                name='firstname'
                value={act.firstname}
                onChange={handleChange}
                required
              />
              {errors.firstname && (
                <div style={errorStyle}>{errors.firstname}</div>
              )}
            </Col>
            <Col>
              <Form.Control
                placeholder='lastname'
                name='lastname'
                value={act.lastname}
                onChange={handleChange}
                required
              />
              {errors.lastname && (
                <div style={errorStyle}>{errors.lastname}</div>
              )}
            </Col>
            <Col>
              <Form.Control
                placeholder='idnp'
                name='idnp'
                value={act.idnp}
                onChange={handleChange}
                required
              />

              {errors.idnp && <div style={errorStyle}>{errors.idnp}</div>}
            </Col>
          </Row>
          <Row className='my-3'>
            <Col>
              <Form.Control
                as='select'
                name='actName'
                value={act.actName}
                onChange={handleChange}
                required
              >
                <option value='0'>Select act</option>
                <option value='procura'>Procura</option>
                <option value='declaratie'>
                  Declaratie. Multiple plecari.
                </option>
                <option value='legalizarea copiei'>
                  Declaratie. Regim matrimonial
                </option>
              </Form.Control>
              {errors.actName && <div style={errorStyle}>{errors.actName}</div>}
            </Col>
            <Col>
              <Form.Control
                placeholder='state fee'
                name='stateFee'
                value={act.stateFee}
                onChange={handleChange}
                required
              />
              {errors.stateFee && (
                <div style={errorStyle}>{errors.stateFee}</div>
              )}
            </Col>
            <Col>
              <Form.Control
                placeholder='notary fee'
                name='notaryFee'
                value={act.notaryFee}
                onChange={handleChange}
                required
              />
              {errors.notaryFee && (
                <div style={errorStyle}>{errors.notaryFee}</div>
              )}
            </Col>
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
