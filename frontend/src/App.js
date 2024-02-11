import React from 'react'
import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'

const App = () => {
  return (
    <Container fluid='lg'>
      <Outlet />
    </Container>
  )
}

export default App
