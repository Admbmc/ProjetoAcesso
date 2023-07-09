import { Container, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";

import Brand from "../../assets/imgs/brand_bmc_dark.png";

import FormChangePassword from "../../components/FormChangePassword";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function ChangePassword() {
  let query = useQuery();

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
          <FormChangePassword
            token={query.get("token")}
            email={query.get("email")}
          />
        </Col>
      </Row>
    </Container>
  );
}
