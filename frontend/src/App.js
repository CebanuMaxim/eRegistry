import Header from './components/Header'
import { Container } from 'react-bootstrap'
import { Outlet, useLocation } from 'react-router-dom'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const loginView = useLocation().pathname === '/'

  return (
    <>
      <ToastContainer autoClose={1500} />
      <Container fluid='lg'>
        {!loginView && <Header />}
        <Outlet />
      </Container>
    </>
  )
}

export default App
