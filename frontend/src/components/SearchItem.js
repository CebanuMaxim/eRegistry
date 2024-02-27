import React from 'react'
import { Col, Form, Row } from 'react-bootstrap'

const SearchItem = ({ search, setSearch, actKey, setActKey }) => {
  return (
    <Row>
      <div style={{ width: '200px' }}>Search by </div>
      <Form onSubmit={(e) => e.preventDefault()} style={{ width: '300px' }}>
        <Row className='my-3'>
          <Col>
            <Form.Select
              value={actKey}
              onChange={(e) => setActKey(e.target.value)}
            >
              <option value='actId'>Act Id</option>
              <option value='date'>Date</option>
              <option value='firstname'>Firstname</option>
              <option value='lastname'>Lastname</option>
              <option value='idnp'>IDNP</option>
            </Form.Select>
          </Col>
          <Col>
            <Form.Control
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
