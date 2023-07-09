import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { FormGroup, FormLabel, Alert } from "react-bootstrap";
import { Form } from "@unform/web";
import * as Yup from "yup";

import { api } from "../../services/api"; // API Backend
import { Btn } from "../Btn";
import { Input } from "../Inputs";

export default function FormResetPassword() {
  const [message, setMessage] = useState();
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(values) {
    try {
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("Digite um e-mail válido.")
          .required("E-mail não deve ficar vazio."),
      });

      await schema.validate(values, {
        abortEarly: false,
      });

      await api
        .post("/forgot-password", values)
        .then((resp) => {
          const { data } = resp;
          setLoading(false);
          setMessage(data.message);
        })
        .catch(function (error) {
          setMessage('Erro ao processar solicitação');
          setLoading(false);
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
        <FormLabel>E-mail</FormLabel>
        <Input name="email" type="text" placeholder="Digite seu e-mail" />
      </FormGroup>
      <Btn
        title="Enviar"
        loading={loading}
        onClick={() => {
          setLoading(true);
        }}
        className="mt-4 mb-4"
      />
    </Form>
  );
}
