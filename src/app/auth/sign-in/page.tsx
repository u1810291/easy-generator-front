'use client'
import React from 'react'
import { Formik, Form, Field } from 'formik'
import { useAuth } from 'app/hooks/useAuth'
import Spinner from 'app/components/Spinner'
import NormalInput from 'app/components/NormalInput'
import { signInInitialValues, signInSchema} from 'app/schemas/formDataSchema'
import Link from 'next/link'

export default function SignIn() {
  const { signIn, error, success } = useAuth()
  return (
    <div className="container mx-auto">
      <div className="p-2 sm:p-4 bg-white rounded-lg shadow-4xl sm:max-w-[700px] mx-auto">
        <div className="flex flex-col text-center items-center justify-center mb-6">
          <h2 className="text-lg">Sign in</h2>
          <span className="text-xs text-gray-500">Please login to proceed</span>
        </div>
        <Formik
          initialValues={signInInitialValues}
          validationSchema={signInSchema}
          onSubmit={(values) => signIn(values)}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                name="email"
                label="Email"
                component={NormalInput}
                placeholder="Email.."
                {...(isSubmitting && { disabled: true })}
              />
              <Field
                name="password" 
                type="password"
                label="Password"
                placeholder="Password.."
                component={NormalInput}
                {...(isSubmitting && { disabled: true })}
              />
              <div className="flex gap-4 my-4">
                <button
                  type="submit"
                  className="w-full bg-primary text-secondary flex-1 p-2 text-md rounded-md">
                    {isSubmitting ? <Spinner/> : 'Sign in'}
                </button>
                <Link
                  href="/auth/sign-up"
                  className="w-fit text-primary underline p-2 text-md rounded-md"
                >
                  Forgot password?
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
