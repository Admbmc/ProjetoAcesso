import React, { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";

import Main from "../../components/Main";
import FormProfile from "../../components/FormProfile";

import { BMCContext } from "../../providers/BMCProvider";

export default function Profile() {
  const { profilePJ } = useContext(BMCContext);

  return (
    <Main>
      <Container>
        <Row>
          <Col>
            <h1 className="mt-4">Perfil</h1>
          </Col>
        </Row>
        <Row>
          <Col>Meu Perfil</Col>
        </Row>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            {profilePJ?.status === 404 ? (
              profilePJ?.data?.message
            ) : (
              <FormProfile />
            )}
          </Col>
        </Row>
      </Container>
    </Main>
  );
}
