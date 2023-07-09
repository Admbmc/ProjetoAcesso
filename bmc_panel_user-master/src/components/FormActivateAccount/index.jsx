import React, { useRef, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { FormGroup, FormLabel, Alert } from "react-bootstrap";
import { Form } from "@unform/web";
import * as Yup from "yup";

import { api } from "../../services/api"; // API Backend
import { Btn } from "../Btn";
import { Input } from "../Inputs";

import { BMCContext } from "../../providers/BMCProvider";

export default function FormActivateAccount({ token, email }) {
  const [message, setMessage] = useState();
  const formRef = useRef(null);
  let history = useHistory();
  const [loading, setLoading] = useState(false);
  const { alertSuccess, alertError } = useContext(BMCContext);

  async function handleSubmit(values) {
    try {
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        password: Yup.string()
          .min(6, "Senha de mínimo de 6 caracteres.")
          .required("Senha é obrigatória."),
        password_confirmation: Yup.string()
          .oneOf([Yup.ref("password"), null], "As senhas precisam ser iguais.")
          .required("Confirmação de senha é obrigatória."),
      });

      await schema.validate(values, {
        abortEarly: false,
      });

      await api
        .post("/active-account", values)
        .then((resp) => {
          const { data } = resp;
          alertSuccess(data.message);
          history.push("/login");
        })
        .catch(function (error) {
          setLoading(false);
          alertError(error.response.data.message);
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
        <FormLabel>Crie uma senha</FormLabel>
        <Input name="password" type="password" placeholder="Crie uma senha" />
      </FormGroup>
      <FormGroup className="form-group">
        <FormLabel>Repita a senha</FormLabel>
        <Input
          name="password_confirmation"
          type="password"
          placeholder="Confirme a senha"
        />
      </FormGroup>
      <Input name="token" type="hidden" value={token} />
      <Input name="email" type="hidden" value={email} />
      <Btn
        title="Ativar Conta"
        loading={loading}
        onClick={() => {
          setLoading(true);
        }}
      />
    </Form>
  );
}
