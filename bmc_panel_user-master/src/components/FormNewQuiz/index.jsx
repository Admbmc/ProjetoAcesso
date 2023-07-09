import React, { useRef, useState } from 'react';
import { FormGroup, FormLabel } from 'react-bootstrap';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom'

import { Input } from '../../components/Inputs';
import { Btn } from '../Btn';

import { apiAuthorization } from '../../services/api'

export default function FormNewQuiz() {
  const formRef = useRef(null)
  let history = useHistory()
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('')

  async function handleSubmit(values) {

    try {
      formRef.current.setErrors({})
      const schema = Yup.object().shape({
        Desc_Questionario: Yup.string()
          .required('Título é obrigatório.'),
        Pontos_Questionario: Yup.string()
          .required('Pontuação é obrigatória.'),
      })

      await schema.validate(values, {
        abortEarly: false,
      });

      await apiAuthorization()
        .post('/questionarios', values)
        .then((resp) => {
          if(resp.status === 200){
            setLoading(false)
            history.push(`/questionarios`)
          }
        })
        .catch((error) => {
          if (error.response) {
            setLoading(false)
            for (var key in error.response.data) {
              if (Array.isArray(error.response.data)) {
                setMessage(error.response.data[key][0])
              } else {
                setMessage(error.response.data[key])
              }
            }
          } else {
            setLoading(false)
            setMessage(
              'Estabelecendo conexão com servidor, aguarde alguns instantes.',
            )
          }
        })

      formRef.current.setErrors({})
    } catch (err) {
      const validationErrors = {}
      if (err instanceof Yup.ValidationError) {
        setLoading(false)
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message
        })
        formRef.current.setErrors(validationErrors)
      }
    } // end catch

  }

  return (
    <div>
      <Form ref={formRef} className='mt-4' onSubmit={handleSubmit}>
        <FormGroup className='form-group mb-4'>
          <FormLabel>Título</FormLabel>
          <Input name='Desc_Questionario' type='text' placeholder='Título' />
        </FormGroup>
        <FormGroup className='form-group mb-4'>
          <FormLabel>Data de cadastro</FormLabel>
          <Input name='Dt_Cadastro' type='date' placeholder='Data de Cadastro' />
        </FormGroup>
        <FormGroup className='form-group mb-4'>
          <FormLabel>Pontos</FormLabel>
          <Input name='Pontos_Questionario' type='text' placeholder='Pontos' />
        </FormGroup>
        <FormGroup className='form-group mb-4'>
          <FormLabel>Flag</FormLabel>
          <Input name='Flag_Complementar' type='text' placeholder='Flag' />
        </FormGroup>
        <FormGroup className='form-group mb-4'>
          <FormLabel>Observações</FormLabel>
          <Input name='Obs_Questionario' type='text' placeholder='Observações' />
        </FormGroup>
        <FormGroup className='form-group mb-4'>
          <FormLabel>Formulário Principal</FormLabel>
          <Input name='Id_Questionario_Principal' type='text' placeholder='Formulário Principal' />
        </FormGroup>
        <Btn
          className='w-100 d-block'
          title='Criar Questionário'
          loading={loading}
          onClick={() => {
            setLoading(true);
          }}
        />
      </Form>
    </div>
  );
}
