import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Registries from './pages/Registries'
import Acts from './pages/Acts'
import Login from './pages/Login'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <Router>
      <ToastContainer autoClose={1000} />
      <Container fluid='lg'>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/registries' element={<Registries />} />
          <Route path='/regisrtry/:id' element={<Acts />} />
          <Route path='*' element={<h1>Page Not Found</h1>} />
        </Routes>
      </Container>
    </Router>
  )
}

export default App
