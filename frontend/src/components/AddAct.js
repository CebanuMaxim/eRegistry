import { useState, useRef } from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

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

  const ref = useRef(null)
  const takeFocus = () => {
    ref.current.focus(null)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setAct((prevAct) => ({ ...prevAct, [name]: value }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    addAct({ act })
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
                placeholder='act ID'
                value={act.actId}
                onChange={handleChange}
                ref={ref}
                required
              />
            </Col>
            <Col>
              <Form.Control
                placeholder='date'
                value={act.date}
                onChange={handleChange}
                required
              />
            </Col>
            <Col>
              <Form.Control
                placeholder='firstname'
                value={act.firstname}
                onChange={handleChange}
                required
              />
            </Col>
            <Col>
              <Form.Control
                placeholder='lastname'
                value={act.lastname}
                onChange={handleChange}
                required
              />
            </Col>
            <Col>
              <Form.Control
                placeholder='idnp'
                value={act.idnp}
                onChange={handleChange}
                required
              />
            </Col>
          </Row>
          <Row className='my-3'>
            <Col>
              <Form.Control
                as='select'
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
            </Col>
            <Col>
              <Form.Control
                placeholder='state fee'
                value={act.stateFee}
                onChange={handleChange}
                required
              />
            </Col>
            <Col>
              <Form.Control
                placeholder='notary fee'
                value={act.notaryFee}
                onChange={handleChange}
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
