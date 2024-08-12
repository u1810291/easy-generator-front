'use client'
import React from 'react'
import { FieldProps } from 'formik'

interface NormalInputProps extends FieldProps {
  label: string;
}

const NormalInput = ({ field, form: { touched, errors }, label, ...props }: NormalInputProps) => (
  <div className='flex-col'>
    <label className='block mb-2 text-md'>{label}</label>
    <input
      {...field}
      {...props}
      autoComplete='on'
      className='w-full p-2 bg-white appearance-none rounded-md border text-md'
    />
    {touched[field.name]
      && errors[field.name]
      && (
        <div className='text-red-500 bg-red'>{errors[field.name] as string}</div>
    )}
  </div>
)

export default NormalInput