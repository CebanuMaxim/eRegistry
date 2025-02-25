import { Col, Form, Row } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { searchItemStyle } from './Styles'
import { SearchItemProps } from '../types'

const SearchItem = ({
  searchTerm,
  setSearchTerm,
  actKey,
  setActKey,
}: SearchItemProps) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm)

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchTerm(localSearchTerm)
    }, 500)

    return () => {
      clearTimeout(handler)
    }
  }, [localSearchTerm, setSearchTerm])

  return (
    <Row>
      <span style={searchItemStyle}>Caută după: </span>
      <Form onSubmit={(e) => e.preventDefault()} style={{ width: '410px' }}>
        <Row className='my-3'>
          <Col>
            <Form.Select
              value={actKey}
              onChange={(e) => setActKey(e.target.value)}
            >
              <option value='date'>Dată</option>
              <option value='actId'>Nr. actului</option>
              <option value='lastname'>Numele de familie</option>
              <option value='firstname'>Prenume</option>
              <option value='idnp'>IDNP</option>
            </Form.Select>
          </Col>
          <Col>
            <Form.Control
              style={{ width: '150px' }}
              placeholder='search'
              value={localSearchTerm}
              onChange={(e) => setLocalSearchTerm(e.target.value)}
            />
          </Col>
        </Row>
      </Form>
    </Row>
  )
}

export default SearchItem
