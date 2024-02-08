import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Registries from './pages/Registries'
import Acts from './pages/Acts'
import Login from './pages/Login'
import Register from './pages/Register'
import Admin from './pages/Admin'
import ProtectedRoute from './components/ProtectedRoute'

console.log(JSON.parse(localStorage.getItem('userInfo')))

const App = () => {
  return (
    <Router>
      <Container fluid='lg'>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route
            path='/register'
            element={
              <ProtectedRoute>
                <Register />
              </ProtectedRoute>
            }
          />
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
          <Route
            path='/admin'
            element={
              <ProtectedRoute>
                <Admin />
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
