import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import Brand from "../../assets/imgs/brand_bmc_dark.png";

import FormLogin from "../../components/FormLogin";

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
          <Row>
            <Col>
              <FormLogin />
            </Col>
          </Row>
          <Row>
            <Col>
              <Link to="/reset-password">Esqueci minha senha.</Link>
            </Col>
          </Row>
          <Row>
            <Col>
              Não tem uma conta?<Link to="/register"> Cadastre-se aqui.</Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
