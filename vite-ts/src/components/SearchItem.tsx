import React from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { searchItemStyle } from './Styles'

const SearchItem = ({ search, setSearch, actKey, setActKey }) => {
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
              <option value='actId'>Nr. actului</option>
              <option value='date'>Dată</option>
              <option value='lastname'>Numele de familie</option>
              <option value='firstname'>Prenume</option>
              <option value='idnp'>IDNP</option>
            </Form.Select>
          </Col>
          <Col>
            <Form.Control
              style={{ width: '150px' }}
              placeholder='search'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>
        </Row>
      </Form>
    </Row>
  )
}

export default SearchItem
