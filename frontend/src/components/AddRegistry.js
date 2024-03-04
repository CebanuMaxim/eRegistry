import { useState, useRef } from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

const AddRegistry = ({ addRegistry }) => {
  const [typographyId, setTypographyId] = useState('')
  const [registryId, setRegistryId] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const ref = useRef()
  const takeFocus = () => {
    ref.current.focus()
  }

  const onSubmit = (e) => {
    addRegistry({ typographyId, registryId, startDate, endDate })
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
                placeholder='Typography Id'
                value={typographyId}
                onChange={(e) => setTypographyId(e.target.value)}
                ref={ref}
                required
              />
            </Col>
            <Col>
              <Form.Control
                placeholder='Registry Id'
                value={registryId}
                onChange={(e) => setRegistryId(e.target.value)}
                required
              />
            </Col>
            <Col>
              <Form.Control
                placeholder='Start Date'
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </Col>
            <Col>
              <Form.Control
                placeholder='End Date'
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
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
