import React, { useContext, useEffect, useState } from "react";
import { Progress, Card } from "antd";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

import "./style.css";

import Main from "../../components/Main";
import { BMCContext } from "../../providers/BMCProvider";
import { apiAuthorization } from "../../services/api";

export default function ResultQuiz() {
  const { id } = useParams();
  const [dataResult, setDataResult] = useState({});
  const { degrees } = useContext(BMCContext);

  const { data: result } = useQuery(
    `result_${id}`,
    async () => {
      const response = await apiAuthorization().get(`/result-quiz/${id}`);
      return response.data;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    setDataResult(result);
  }, [result]);

  return (
    <Main>
      <Container>
        <Row>
          <Col>
            <h1 className="mt-4">Relatório Demo</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>
              Parabéns! A empresa acaba de concluir o primeiro passo rumo à
              implantação e gestão de conformidade. Acreditamos que a liderança
              e a gestão são a fundação de um sistema de conformidade. Conforme
              a orientação inicial, o objetivo do questionário diagnóstico é
              medir o nível de maturidade da conformidade empresarial, bem como
              a cultura organizacional da empresa.
            </p>
            <p>
              Esse é o primeiro nível do programa que vale um total de quatro
              mil pontos, e o grau de cada empresa é avaliado conforme os
              critérios a seguir.
            </p>
            <Row>
              <Col>
                {degrees?.map((degree) => {
                  if (
                    dataResult?.points >= degree.min_points &&
                    dataResult?.points <= degree.max_points
                  ) {
                    return (
                      <div className="degree__box" key={degree.id}>
                        <div className="degree__icon">{degree.icon}</div>
                        <div className="degree__title">{degree.level}</div>
                        <div className="degree__resume">{degree.resume}</div>
                      </div>
                    );
                  }
                })}
              </Col>
            </Row>
            <Row className="cards_progress">
              {dataResult?.total?.map((group) => {
                const percent = Math.round(
                  (group.total_points_answer_user / group.total_points) * 100
                );
                return (
                  <Col key={group.name} className="card__progress">
                    <Card className="card__progress--item">
                      <Progress
                        type="circle"
                        percent={percent}
                        format={(percent) => `${percent}%`}
                        strokeColor={{
                          "0%": "#108ee9",
                          "100%": "#87d068",
                        }}
                      />
                      <p className="card__progress--title">{group.name}</p>
                    </Card>
                  </Col>
                );
              })}
            </Row>
            <Row>
              <Col>
                <h4>Conclusão</h4>
                <p>
                  De acordo com as respostas ao questionário, esse é o resumo da
                  nossa avaliação inicial. Nos próximos dias você receberá um
                  relatório diagnóstico mais detalhado, apontando quais as
                  primeiras ações a serem tomadas para atingir um grau de
                  conformidade mais satisfatório, bem como a prévia do seu
                  programa de conformidade, o qual se desenvolverá com base em
                  outros questionários, chec-lists, testes de conhecimento e
                  avaliações de conformidade e governança. O programa terá como
                  parâmetro a conformidade legal, jurídica, regulatória,
                  regimental e operacional, respeitando a saúde financeira da
                  empresa e priorizando as pessoas e a cultura.
                </p>
                <h4>Por que começar pela gestão e pela liderança?</h4>
                <p>
                  A cultura de uma empresa é feita de pessoas, bem como é por
                  meio delas que os resultados são alcançados. Um programa de
                  conformidade não aderido pelo time, está fadado ao fracasso e
                  é por isso que as pessoas e não as regras é quem são os
                  protagonistas do nosso programa de conformidade. Se a empresa
                  não tem regras internas bem estabelecidas e devidamente
                  cumpridas, não poderá cumprir as regras do ordenamento
                  jurídico por falta de norte e organização. Nesse sentido,
                  nosso programa começa de dentro para fora levando a empresa a
                  uma conformidade legal, jurídica, regulatória, regimental e
                  operacional. Tudo começa pelo comportamento empreendedor e a
                  sua liderança. Envolva seus líderes e seu time nessa Jornada,
                  pois eles serão a chave para o sucesso e efetividade do
                  programa. Uma empresa dentro dos conformes, assume menos
                  riscos e melhora a sua imagem para clientes, parceiros e
                  investidores, além de abrir portas para participar de editais
                  de licitação e inovação aberta. Vamos juntos, nosso resultado
                  é o seu sucesso.
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Main>
  );
}
