import Header from './components/Header'
import { Container } from 'react-bootstrap'
import { Outlet, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  RegistryValidationProvider,
  ActValidationProvider,
  FilteredActsProvider,
} from './context/Provider'
import useSession from './hooks/useSession'

const App = () => {
  useSession('App')
  const loginView = useLocation().pathname === '/'

  return (
    <FilteredActsProvider>
      <RegistryValidationProvider>
        <ActValidationProvider>
          <div style={{ height: '100vh' }}>
            <ToastContainer autoClose={3000} />
            <Container fluid='lg'>
              {!loginView && <Header />}
              <Outlet />
            </Container>
          </div>
        </ActValidationProvider>
      </RegistryValidationProvider>
    </FilteredActsProvider>
  )
}

export default App
