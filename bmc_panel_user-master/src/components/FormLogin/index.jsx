import React, { useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { FormGroup, FormLabel, Alert } from 'react-bootstrap'
import { Form } from '@unform/web'
import * as Yup from 'yup'

import { api } from '../../services/api' // API Backend
import { Btn } from '../Btn'
import { Input } from '../Inputs'

export default function FormLogin() {
  const [ message, setMessage ] = useState();
  const formRef = useRef(null);
  let history = useHistory();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(values) {
    try {
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string()
          .email('Digite um e-mail válido.')
          .required('E-mail é obrigatório.'),
        password: Yup.string()
          .min(6, 'Senha de mínimo de 6 caracteres.')
          .required('Senha é obrigatória.'),
      });

      await schema.validate(values, {
        abortEarly: false,
      });

      await api.post('/login', values)
      .then((resp) => {
        const { data } = resp;
        if (data.access_token) {
          localStorage.setItem('access_token', data.access_token);
          history.push('/');
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
          <FormLabel>E-mail</FormLabel>
          <Input
            name='email'
            type='text'
            placeholder='Digite seu e-mail'
          />
        </FormGroup>
        <FormGroup className='form-group'>
          <FormLabel>Senha</FormLabel>
          <Input
            name='password'
            type='password'
            placeholder='Digite sua senha'
          />
        </FormGroup>

        <Btn
            title='Entrar'
            loading={loading}
            onClick={() => {setLoading(true)}}
            className="mt-4 mb-4"
        />
    </Form>
  )
}