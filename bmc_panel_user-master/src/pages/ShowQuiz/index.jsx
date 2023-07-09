import React, { useState, useRef, useContext, useEffect } from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Col, Container, Row } from "react-bootstrap";
import { Modal } from "antd";
import { useParams, useHistory } from "react-router-dom";
import { useQuery } from "react-query";
import { Form } from "@unform/web";

import "./style.css";

import Main from "../../components/Main";
import { Btn } from "../../components/Btn";

import { apiAuthorization } from "../../services/api";
import { BMCContext } from "../../providers/BMCProvider";

const { confirm } = Modal;

export default function Quiz() {
  const formRef = useRef(null);
  let history = useHistory();
  const { id } = useParams(); // Id do questionário.
  const [current, setCurrent] = useState(0); // Número da Questão atual.
  const [value, setValue] = useState({}); // Valores das respostas que estão sendo respondidas no momento.
  const [dataQuiz, setdataQuiz] = useState([]); // Valores das respostas que estão sendo respondidas no momento.
  const { alertSuccess, alertError } = useContext(BMCContext);

  const showConfirm = () => {
    confirm({
      title: "Do you Want to delete these items?",
      icon: <ExclamationCircleOutlined />,
      content: "Some descriptions",

      onOk() {
        history.push(`/questionario/${id}/resultado`);
      },
    });
  };

  const { data } = useQuery(
    `quiz_${id}`,
    async () => {
      const response = await apiAuthorization().get(`/questionarios/${id}`);
      return response.data;
    },
    {
      staleTime: 1000 * 60, // 1 minute
    }
  );

  useEffect(() => {
    setdataQuiz(data);
  }, [data]);

  // if (dataQuiz && dataQuiz?.quiz?.finish_in !== null) {
  //   history.push("/questionarios");
  //   alertError("Você já respondeu esse questionário!");
  // }

  const nextQuestion = () => {
    setCurrent(current + 1);
  };

  const prevQuestion = () => {
    setCurrent(current - 1);
  };

  async function handleSubmitReply(value) {
    await apiAuthorization()
      .post(`/questionarios/${id}`, value)
      .then((resp) => {
        const { data } = resp;
        if (data.result === "success") {
          alertSuccess(data.message);
          setValue({});
          nextQuestion();
        }
      })
      .catch(function (error) {
        alertError(error.response.data.message);
      });
  }

  async function handleReturnReply(value) {
    await apiAuthorization()
      .get(`/answer/${id}/${value}`)
      .then((resp) => {
        const { data } = resp;
        if (data.result === "success") {
          setValue({
            type: data.type,
            answer: data.answer,
            question: data.question,
          });
          prevQuestion();
        }
      })
      .catch(function (error) {
        alertError(error.response.data.message);
      });
  }

  return (
    <Main>
      <Container>
        <Row className="mt-4 mb-4">
          <div>Título: {data?.quiz.title}</div>
          <div>Publicado em {data?.quiz.publish_in}</div>
        </Row>

        <div className="steps-content">
          <h3>{data?.questions[current].title}</h3>
        </div>

        {/* answers */}
        <Form ref={formRef}>
          <div className="steps-content">
            {data?.questions[current].answers.map((answer) => {
              const idQuestion = data?.questions[current].id;
              return (
                <div key={answer.Id_Resposta}>
                  {answer.Texto_Livre === 0 ? (
                    <>
                      <input
                        type="text"
                        className="form-control"
                        name={answer.Id_Resposta}
                        defaultValue={value.answer}
                        onChange={(e) => {
                          setValue({
                            type: answer.Texto_Livre,
                            question: idQuestion,
                            answer: String(e.target.value),
                          });
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <input
                        type="radio"
                        value={answer.Id_Resposta}
                        name={idQuestion}
                        defaultChecked={value.answer === answer.Id_Resposta}
                        onChange={(e) => {
                          setValue({
                            type: answer.Texto_Livre,
                            question: idQuestion,
                            answer: String(e.target.value),
                          });
                        }}
                      />
                      {answer.Desc_Resposta}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </Form>
        {/* endAnswers */}

        <div className="steps-action">
          {/* #Botão Voltar */}
          {current > 0 && (
            <Btn
              type="secondary"
              onClick={() => {
                handleReturnReply(data?.questions[current].id - 1);
              }}
              title="Voltar"
            />
          )}

          {/* #Botão Responder */}
          {current < data?.questions.length - 1 && (
            <Btn
              type="primary"
              onClick={() => {
                handleSubmitReply(value);
              }}
              title="Responder"
              className={
                !value?.answer || value?.length === 0 ? "disabled" : ""
              }
            />
          )}

          {/* #Botão Finalizar */}
          {current === data?.questions.length - 1 && (
            <Btn
              type="primary"
              onClick={() => {
                showConfirm();
              }}
              title="Finalizar"
            />
          )}
        </div>
      </Container>
    </Main>
  );
}
