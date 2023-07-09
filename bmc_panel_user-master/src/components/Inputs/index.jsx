import { FormControl, FormSelect } from 'react-bootstrap'
import { useField } from '@unform/core'
import React, { useEffect, useRef, useState } from 'react'
import InputMask from "react-input-mask";

export const Input = ({ name, maxlength, ...rest }) => {
  const inputRef = useRef(null)
  const { fieldName, registerField, error, clearError } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => {
        return ref.current.value
      },
      setValue: (ref, value) => {
        ref.current.value = value
      },
      clearValue: (ref) => {
        ref.current.value = ''
      },
    })
  }, [fieldName, registerField])

  return (
    <React.Fragment>
      <FormControl
        className={error && 'form-control is-invalid'}
        name={name}
        onFocus={clearError}
        ref={inputRef}
        {...rest}
        maxLength={maxlength}
      />

      {error && <span className='text-danger'>{error}</span>}
    </React.Fragment>
  )
}

export const MaskInput = ({ name, defaultValue, ...rest }) => {
  const inputRef = useRef(null);
  const { fieldName, registerField, error, clearError } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => {
        return ref.current.value;
      },
      setValue: (ref, value) => {
        ref.current.value = value;
      },
      clearValue: (ref) => {
        ref.current.value = "";
      },
    });
  }, [fieldName, registerField]);

  return (
    <React.Fragment>
      <InputMask
        className={error ? "form-control is-invalid" : "form-control"}
        name={name}
        defaultValue={defaultValue}
        onFocus={clearError}
        ref={inputRef}
        {...rest}
      />

      {error && <span class="text-danger">{error}</span>}
    </React.Fragment>
  );
};