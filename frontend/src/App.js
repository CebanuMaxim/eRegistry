import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Registries from './pages/Registries'
import Acts from './pages/Acts'

const App = () => {

  return (
    <Router>
      <Container fluid='lg'>
        {/*<NavScroll />*/ }
        <Routes>
          <Route path='/' element={ <Registries /> } />
          <Route path='/regisrtry/:id' element={ <Acts /> } />
          <Route path='*' element={ <h1>Page Not Found</h1> } />
        </Routes>
      </Container>
    </Router>
  )
}

export default App
