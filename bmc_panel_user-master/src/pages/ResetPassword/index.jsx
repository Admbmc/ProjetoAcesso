import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import Brand from "../../assets/imgs/brand_bmc_dark.png";

import FormResetPassword from "../../components/FormResetPassword";

export default function Login() {
  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <img
            src={Brand}
            alt="Logotipo branco da Brasil Mais Conforme com fundo transparente"
          />
        </Col>
      </Row>
      <Row className="mt-10">
        <Col md={{ span: 6, offset: 3 }}>
          <FormResetPassword />
        </Col>
      </Row>
    </Container>
  );
}
