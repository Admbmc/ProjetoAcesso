import React, { useRef, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { FormGroup, FormLabel, Alert, Row, Col } from "react-bootstrap";
import { Form } from "@unform/web";
import * as Yup from "yup";

import { apiAuthorization } from "../../services/api"; // API Backend
import { Btn } from "../Btn";
import { Input } from "../Inputs";

import { BMCContext } from "../../providers/BMCProvider";

export default function FormProfile() {
  const formRef = useRef(null);
  let history = useHistory();
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  const { profilePJ } = useContext(BMCContext);

  async function handleSubmit(values) {
    try {
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        cnpj: Yup.string().required("CNPJ é obrigatório."),
        zip_code: Yup.string().required("CEP é obrigatório."),
        corporate_name: Yup.string().required("Razão Social é obrigtatório."),
      });

      await schema.validate(values, {
        abortEarly: false,
      });

      await apiAuthorization()
        .post("/profile", values)
        .then((resp) => {
          const { data } = resp;
          setMessage(data.message);
          setLoading(false);
        })
        .catch(function (error) {
          setLoading(false);
          setMessage(error.response.data.errors.error[0]);
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
      <Input name="type_id" type="hidden" value={1} />
      <FormGroup className="form-group">
        <FormLabel>CNPJ *</FormLabel>
        <Input name="cnpj" type="text" defaultValue={profilePJ?.data?.cnpj} disabled/>
      </FormGroup>
      <FormGroup className="form-group">
        <FormLabel>Razão Social *</FormLabel>
        <Input
          name="corporate_name"
          type="text"
          defaultValue={profilePJ?.data?.corporate_name}
        />
      </FormGroup>
      <FormGroup className="form-group">
        <FormLabel>Nome Fantasia</FormLabel>
        <Input
          name="fantasy_name"
          type="text"
          defaultValue={profilePJ?.data?.fantasy_name}
        />
      </FormGroup>
      <Row>
        <Col>
          <FormGroup className="form-group">
            <FormLabel>Inscrição Estadual</FormLabel>
            <Input
              name="state_registration"
              type="text"
              defaultValue={profilePJ?.data?.state_registration}
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup className="form-group">
            <FormLabel>Inscrição Municipal</FormLabel>
            <Input
              name="municipal_registration"
              type="text"
              defaultValue={profilePJ?.data?.municipal_registration}
            />
          </FormGroup>
        </Col>
      </Row>
      mei
      <FormGroup className="form-group">
        <FormLabel>CEP *</FormLabel>
        <Input
          name="zip_code"
          type="text"
          defaultValue={profilePJ?.data?.address.zip_code}
        />
      </FormGroup>
      <FormGroup className="form-group">
        <FormLabel>Endereço</FormLabel>
        <Input
          name="street"
          type="text"
          defaultValue={profilePJ?.data?.address.street}
        />
      </FormGroup>
      <FormGroup className="form-group">
        <FormLabel>Número</FormLabel>
        <Input
          name="number"
          type="text"
          defaultValue={profilePJ?.data?.address.number}
        />
      </FormGroup>
      <FormGroup className="form-group">
        <FormLabel>Complemento</FormLabel>
        <Input
          name="complement"
          type="text"
          defaultValue={profilePJ?.data?.address.complement}
        />
      </FormGroup>
      <FormGroup className="form-group">
        <FormLabel>Bairro</FormLabel>
        <Input
          name="neighborhood"
          type="text"
          defaultValue={profilePJ?.data?.address.neighborhood}
        />
      </FormGroup>
      <FormGroup className="form-group">
        <FormLabel>Cidade</FormLabel>
        <Input
          name="city"
          type="text"
          defaultValue={profilePJ?.data?.address.city}
        />
      </FormGroup>
      <FormGroup className="form-group">
        <FormLabel>Estado</FormLabel>
        <Input
          name="state"
          type="text"
          defaultValue={profilePJ?.data?.address.state}
        />
      </FormGroup>
      <Btn
        title="Salvar"
        loading={loading}
        onClick={() => {
          setLoading(true);
        }}
      />
    </Form>
  );
}
