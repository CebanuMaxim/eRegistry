import { useState, useRef } from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

const AddAct = ({ addAct }) => {
  const [actId, setActId] = useState('')
  const [date, setDate] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [idnp, setIdnp] = useState('')
  const [actName, setActName] = useState('')
  const [stateFee, setStateFee] = useState('')
  const [notaryFee, setNotaryFee] = useState('')

  const ref = useRef(null)
  const takeFocus = () => {
    ref.current.focus(null)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    addAct({
      actId,
      date,
      firstname,
      lastname,
      idnp,
      actName,
      stateFee,
      notaryFee,
    })
    takeFocus()
  }

  return (
    <Card className='mt-5 mb-3'>
      <Card.Body>
        <Form onSubmit={onSubmit}>
          <Row className='my-3'>
            <Col>
              <Form.Control
                autoFocus
                placeholder='act id'
                value={actId}
                onChange={(e) => setActId(e.target.value)}
                ref={ref}
                required
              />
            </Col>
            <Col>
              <Form.Control
                placeholder='date'
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </Col>
            <Col>
              <Form.Control
                placeholder='firstname'
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
              />
            </Col>
            <Col>
              <Form.Control
                placeholder='lastname'
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
              />
            </Col>
            <Col>
              <Form.Control
                placeholder='idnp'
                value={idnp}
                onChange={(e) => setIdnp(e.target.value)}
                required
              />
            </Col>
          </Row>
          <Row className='my-3'>
            <Col>
              <Form.Control
                as='select'
                value={actName}
                onChange={(e) => setActName(e.target.value)}
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
            </Col>
            <Col>
              <Form.Control
                placeholder='state fee'
                value={stateFee}
                onChange={(e) => setStateFee(e.target.value)}
                required
              />
            </Col>
            <Col>
              <Form.Control
                placeholder='notary fee'
                value={notaryFee}
                onChange={(e) => setNotaryFee(e.target.value)}
                required
              />
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
