import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { FormGroup, FormLabel, Alert } from "react-bootstrap";
import { Form } from "@unform/web";
import * as Yup from "yup";

import { api } from "../../services/api"; // API Backend
import { Btn } from "../Btn";
import { Input } from "../Inputs";

export default function FormRegister() {
  const [message, setMessage] = useState();
  const formRef = useRef(null);
  let history = useHistory();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(values) {
    try {
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required("Nome é obrigatório."),
        email: Yup.string()
          .email("Digite um e-mail válido.")
          .required("E-mail é obrigatório."),
      });

      await schema.validate(values, {
        abortEarly: false,
      });

      await api
        .post("/register", values)
        .then((resp) => {
          setMessage(resp.data.message);
          setLoading(false);
        })
        .catch((error) => {
          if (error.response) {
            setLoading(false);
            setMessage(error.response.data.errors.email[0]);
          } else {
            setLoading(false);
            setMessage(
              "Estabelecendo conexão com servidor, aguarde alguns instantes."
            );
          }
        });

      formRef.current.setErrors({});
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        setLoading(false);
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }
    }
  }

  return (
    <Form ref={formRef} className="mt-4" onSubmit={handleSubmit}>
      {message && (
        <Alert className="text-center" variant="danger">
          {message}
        </Alert>
      )}

      <FormGroup className="form-group">
        <FormLabel>Nome Completo</FormLabel>
        <Input name="name" type="text" placeholder="Digite seu nome" />
      </FormGroup>
      <FormGroup className="form-group">
        <FormLabel>E-mail</FormLabel>
        <Input name="email" type="text" placeholder="Digite seu e-mail" />
      </FormGroup>

      <Btn
        title="Criar conta"
        loading={loading}
        onClick={() => {
          setLoading(true);
        }}
        className="mt-4 mb-4"
      />
    </Form>
  );
}
