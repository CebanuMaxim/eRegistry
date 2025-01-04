import { useContext, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Act } from '../types'
import axios from '../api/axios'
import { useNavigate } from 'react-router-dom'
import { FilteredActsContext } from '../context/Context'

interface ReportsProps {
  acts: Act[]
}

const Reports: React.FC<ReportsProps> = () => {
  const [date, setDate] = useState('')
  const navigate = useNavigate()
  const { setFilteredActs } = useContext(FilteredActsContext)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const res = await axios.get(`/acts/reports/${date}`)
      setFilteredActs(res.data)

      navigate(`/reports`)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <Row>
      <Form onSubmit={onSubmit}>
        <Row className='my-3'>
          <Col md={2} className='my-2'>
            Report date:{' '}
          </Col>
          <Col>
            <Form.Control
              placeholder='month.year'
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Col>
          <Col>
            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </Row>
  )
}

export default Reports
