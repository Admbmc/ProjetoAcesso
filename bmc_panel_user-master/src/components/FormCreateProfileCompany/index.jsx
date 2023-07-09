import React, { useContext, useRef, useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { FormGroup, FormLabel, Alert, Row, Col } from "react-bootstrap";
import { Form } from "@unform/web";
import * as Yup from "yup";

import { BMCContext } from "../../providers/BMCProvider";

import { apiAuthorization, api } from "../../services/api"; // API Backend
import { Btn } from "../Btn";
import { Input, MaskInput } from "../Inputs";

export default function FormCreateProfileCompany() {
  const formRef = useRef(null);
  let history = useHistory();
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({});
  const [company, setCompany] = useState({});
  const { alertError, alertSuccess, setPermission } = useContext(BMCContext);

  async function searchCNPJ(cnpj) {
    let cropCnpj = cnpj.normalize('NFD').replace(/([^0-9a-zA-Z\s])/g, '')

    cnpj?.length === 18 &&
      (await fetch(`https://publica.cnpj.ws/cnpj/${cropCnpj}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if(data?.status === 400 || data?.status === 429){
            alertError(data.detalhes);
            setCompany({});
          }else{
            setCompany(data);
          }
        }));
  }

  async function searchAddress(zipcode) {
    let body = { zipcode: zipcode };

    zipcode?.length === 8 &&
      (await api
        .post("/search-address", body)
        .then((resp) => {
          const { data } = resp;
          if (data.data.error) {
            alertError(data.data.error);
          }
          setAddress({
            street: data.data.street,
            neighborhood: data.data.district,
            city: data.data.city,
            state: data.data.uf,
          });
        })
        .catch(function (error) {
          alertError(error.response.error);
        }));
  }

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
          if (data.result === "success") {
            alertSuccess(data.message);
            setPermission(true);
            window.location.reload();
          } else {
            alertError(data.message);
          }
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
        alertError("Você precisa preencher os campos obrigatórios");
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }
    }
  }

  return (
    <Form ref={formRef} className="mt-4" onSubmit={handleSubmit}>
      <Input name="type_id" type="hidden" value={1} />
      <FormGroup className="form-group">
        <FormLabel>CNPJ *</FormLabel>
        <MaskInput
          name="cnpj"
          type="text"
          mask="99.999.999/9999-99"
          maskChar=""
          onChange={(e) => {
            searchCNPJ(e.target.value);
          }}
        />
      </FormGroup>
      <FormGroup className="form-group">
        <FormLabel>Razão Social *</FormLabel>
        <Input
          name="corporate_name"
          type="text"
          defaultValue={company?.razao_social}
          // placeholder='Digite a Razão Social'
        />
      </FormGroup>
      <FormGroup className="form-group">
        <FormLabel>Nome Fantasia</FormLabel>
        <Input
          name="fantasy_name"
          type="text"
          defaultValue={company?.estabelecimento?.nome_fantasia}
          // placeholder='Digite o nome Fantasia'
        />
      </FormGroup>
      <Row>
        <Col>
          <FormGroup className="form-group">
            <FormLabel>Inscrição Estadual</FormLabel>
            <MaskInput
              mask="9999999999999"
              maskChar=""
              name="state_registration"
              type="text"
              // placeholder='Digite a Inscrição Estadual'
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup className="form-group">
            <FormLabel>Inscrição Municipal</FormLabel>
            <MaskInput
              mask="9999999999999"
              maskChar=""
              name="municipal_registration"
              type="text"
              // placeholder='Digite a Inscrição Municipal'
            />
          </FormGroup>
        </Col>
      </Row>
      mei
      <FormGroup className="form-group">
        <FormLabel>CEP *</FormLabel>
        <MaskInput
          mask="99999999"
          maskChar=""
          name="zip_code"
          type="text"
          onChange={(e) => {
            searchAddress(e.target.value);
          }}
          // placeholder='Digite a Inscrição Municipal'
        />
      </FormGroup>
      <FormGroup className="form-group">
        <FormLabel>Endereço</FormLabel>
        <Input
          name="street"
          type="text"
          disabled
          defaultValue={address.street}
          // placeholder='Digite a Inscrição Municipal'
        />
      </FormGroup>
      <FormGroup className="form-group">
        <FormLabel>Número</FormLabel>
        <Input
          name="number"
          type="text"
          // placeholder='Digite a Inscrição Municipal'
        />
      </FormGroup>
      <FormGroup className="form-group">
        <FormLabel>Complemento</FormLabel>
        <Input
          name="complement"
          type="text"
          // placeholder='Digite a Inscrição Municipal'
        />
      </FormGroup>
      <FormGroup className="form-group">
        <FormLabel>Bairro</FormLabel>
        <Input
          name="neighborhood"
          type="text"
          disabled
          defaultValue={address.neighborhood}
          // placeholder='Digite a Inscrição Municipal'
        />
      </FormGroup>
      <FormGroup className="form-group">
        <FormLabel>Cidade</FormLabel>
        <Input
          name="city"
          type="text"
          disabled
          defaultValue={address.city}
          // placeholder='Digite a Inscrição Municipal'
        />
      </FormGroup>
      <FormGroup className="form-group">
        <FormLabel>Estado</FormLabel>
        <Input
          name="state"
          type="text"
          disabled
          defaultValue={address.state}
          // placeholder='Digite a Inscrição Municipal'
        />
      </FormGroup>
      <Btn
        title="Criar Perfil"
        className="mt-4"
        loading={loading}
        onClick={() => {
          setLoading(true);
        }}
      />
    </Form>
  );
}
