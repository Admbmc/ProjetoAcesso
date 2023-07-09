import { Container, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";

import FormActivateAccount from "../../components/FormActivateAccount";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Register() {
  let query = useQuery();

  return (
    <Container>
      <Row>
        <Col>Ativar sua conta</Col>
      </Row>
      <Row className="mt-10">
        <Col md={{ span: 6, offset: 3 }}>
          <FormActivateAccount
            token={query.get("token")}
            email={query.get("email")}
          />
        </Col>
      </Row>
    </Container>
  );
}
