'use client'
import React from 'react'
import Link from 'next/link'
import { useAuth } from 'app/hooks/useAuth'
import Spinner from 'app/components/Spinner'
import { Formik, Form, Field } from 'formik'
import NormalInput from 'app/components/NormalInput'
import { signUpSchema, signUpInitialValues } from 'app/schemas/formDataSchema'

export default function SignUp() {
  const { signUp, error, success } = useAuth()
  return (
    <div className="container mx-auto">
      <div className="p-2 sm:p-4 bg-white rounded-lg shadow-4xl sm:max-w-[700px] mx-auto">
        <div className="flex flex-col text-center items-center justify-center mb-6">
          <h2 className="text-lg">Sign up</h2>
          <span className="text-xs text-gray-500">Please sign up to proceed</span>
        </div>
        <Formik
          initialValues={signUpInitialValues}
          validationSchema={signUpSchema}
          onSubmit={(values) => signUp(values)}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                name="name"
                label="Name"
                type="text"
                placeholder="Name..."
                component={NormalInput}
                {...(isSubmitting && { disabled: true })}
              />
              <Field
                name="email"
                type="email"
                label="Email"
                placeholder="Email..."
                component={NormalInput}
                {...(isSubmitting && { disabled: true })}
              />
              <Field
                name="password" 
                type="password"
                label="Password"
                placeholder="Password..."
                component={NormalInput}
                {...(isSubmitting && { disabled: true })}
              />
              <Field
                type="password"
                name="confirmPassword"
                component={NormalInput}
                label="Confirm password"
                placeholder="Confirm password..."
                {...(isSubmitting && { disabled: true })}
              />
              <div className="flex gap-4 pt-2">
                <button
                  type="submit"
                  className="w-full bg-primary text-secondary flex-1 p-2 text-md rounded-md">
                    {isSubmitting ? <Spinner/> : 'Sign up'}
                </button>
                <Link
                  href="/auth/sign-in"
                  className="w-fit text-primary underline p-2 text-md rounded-md"
                >
                  Do you have an account?
                </Link>
              </div>
            </Form>
          )}
        </Formik>
        <div className="flex justify-center text-red-500 bg-red capitalize">{!success && error?.message as string}</div>
      </div>
    </div>
  )
}
