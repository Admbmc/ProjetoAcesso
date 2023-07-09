import { Container, Row, Col } from 'react-bootstrap'

import FormRegister from '../../components/FormRegister'

export default function Register() {
  return (
    <Container>
      <Row>
        <Col>
        Cria sua conta
        </Col>
      </Row>
      <Row className='mt-10'>
        <Col md={{ span: 6, offset: 3 }}>
         <FormRegister/>
        </Col>
      </Row>
    </Container>
  );
}
