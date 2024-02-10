import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Registries from './views/RegistriesView'
import Acts from './views/ActsView'
import Login from './views/LoginView'
import Register from './views/RegisterView'
import Admin from './views/AdminView'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  return (
    <Router>
      <Container fluid='lg'>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='' element={<ProtectedRoute />}>
            <Route path='/register' element={<Register />} />
            <Route path='/registries' element={<Registries />} />
            <Route path='/regisrtry/:id' element={<Acts />} />
            <Route path='/admin' element={<Admin />} />
          </Route>
          <Route path='*' element={<h1>Page Not Found</h1>} />
        </Routes>
      </Container>
    </Router>
  )
}

export default App
