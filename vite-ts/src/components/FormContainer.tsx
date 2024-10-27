import { Container, Row, Col } from 'react-bootstrap'
import { FormContainerProps } from '../types'

const FormContainer = ({ children }: FormContainerProps) => {
  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  )
}

export default FormContainer
