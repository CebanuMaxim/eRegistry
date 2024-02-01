import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Registries from './pages/Registries'
import Acts from './pages/Acts'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoute from './components/ProtectedRoute'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <Router>
      <ToastContainer autoClose={1000} />
      <Container fluid='lg'>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route
            path='/registries'
            element={
              <ProtectedRoute>
                <Registries />
              </ProtectedRoute>
            }
          />
          <Route
            path='/regisrtry/:id'
            element={
              <ProtectedRoute>
                <Acts />
              </ProtectedRoute>
            }
          />
          <Route path='*' element={<h1>Page Not Found</h1>} />
        </Routes>
      </Container>
    </Router>
  )
}

export default App
