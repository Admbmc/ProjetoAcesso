import React, { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useQuery } from "react-query";

import { apiAuthorization } from "../../services/api";

import Box from "../../components/Card";
import Main from "../../components/Main";

import { BMCContext } from "../../providers/BMCProvider";

export default function Quizzes() {
  const { quizzes } = useContext(BMCContext);
  
  return (
    <Main>
      <Container>
        <Row>
          <Col>
            <h1 className="mt-4">Questionários</h1>
          </Col>
        </Row>
        <Row>
          {quizzes ? (
            quizzes?.map((quiz) => {
              return (
                <Col key={quiz.id} lg={3}>
                  <Box
                    title={quiz.title}
                    subtitle={quiz.publish_in}
                    link={quiz.finish_in}
                    url={`/questionarios/${quiz.id}`}
                  >
                    {quiz.questions} questões.
                  </Box>
                </Col>
              );
            })
          ) : (
            <Col>Nenhum questionário encontrado.</Col>
          )}
        </Row>
      </Container>
    </Main>
  );
}
