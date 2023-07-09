import React, { useRef, useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { FormGroup, FormLabel, Alert } from 'react-bootstrap'
import { Form } from '@unform/web'
import * as Yup from 'yup';

import { BMCContext } from "../../providers/BMCProvider";

import { api } from '../../services/api' // API Backend
import { Btn } from '../Btn'
import { Input } from '../Inputs'

export default function FormChangePassword({ token, email }) {
  const { alertSuccess } = useContext(BMCContext);
  const [ message, setMessage ] = useState();
  const formRef = useRef(null);
  let history = useHistory();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(values) {
    try {
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        password: Yup.string()
          .min(6, "Senha de mínimo de 6 caracteres.")
          .required("Senha é obrigatória."),
        new_password: Yup.string()
          .oneOf([Yup.ref("password"), null], "As senhas precisam ser iguais.")
          .required("Confirmação de senha é obrigatória."),
      });

      await schema.validate(values, {
        abortEarly: false,
      });

      await api.post('/change-password', values)
      .then((resp) => {
        const { data } = resp;
        if (data.result === 'success') {
          alertSuccess(data.message)
          history.push('/login');
        }else{
          setLoading(false);
          setMessage(data.message);
        }
      })
      .catch(function (error) {
        setMessage(error.response.data.errors.error[0])
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
    <Form ref={formRef} className='mt-4'  onSubmit={handleSubmit}>
      {message && <Alert className='text-center' variant='danger'>{message}</Alert>}

        <FormGroup className='form-group'>
          <FormLabel>Criar nova senha</FormLabel>
          <Input
            name='password'
            type='password'
          />
        </FormGroup>
        <Input name="token" type="hidden" value={token} />
       <Input name="email" type="hidden" value={email} />
        <FormGroup className='form-group mt-4'>
          <FormLabel>Repita a senha</FormLabel>
          <Input
            name='new_password'
            type='password'
          />
        </FormGroup>

        <Btn
            title='Cadastrar nova senha'
            loading={loading}
            onClick={() => {setLoading(true)}}
            className="mt-4 mb-4"
        />
    </Form>
  )
}