import Header from './components/Header'
import { Container } from 'react-bootstrap'
import { Outlet, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ActValidationProvider } from './validation/ActValidationContext'

const App = () => {
  const loginView = useLocation().pathname === '/'

  return (
    <ActValidationProvider>
      <div style={{ height: '100vh' }}>
        <ToastContainer autoClose={3000} />
        <Container fluid='lg'>
          {!loginView && <Header />}
          <Outlet />
        </Container>
      </div>
    </ActValidationProvider>
  )
}

export default App
