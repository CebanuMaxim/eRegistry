import React from 'react'
import { Col, Form, Row } from 'react-bootstrap'

const SearchItem = ({ search, setSearch, itemName }) => {
  return (
    // <Card className='mt-5 mb-3'>
    // <form className='searchForm' onSubmit={(e) => e.preventDefault()}>
    //   <input
    //     id='search'
    //     type='text'
    //     role='searchbox'
    //     placeholder={`search by ${itemName}`}
    //     value={search}
    //     onChange={(e) => setSearch(e.target.value)}
    //   />
    // </form>
    //   <Card.Body>
    <Row>
      <text style={{ width: '200px' }}>Search by </text>
      <Form onSubmit={(e) => e.preventDefault()} style={{ width: '300px' }}>
        <Row className='my-3'>
          <Col>
            <Form.Control
              // as='select'
              placeholder='act id'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            ></Form.Control>
          </Col>
        </Row>
      </Form>
    </Row>
  )
}

export default SearchItem
