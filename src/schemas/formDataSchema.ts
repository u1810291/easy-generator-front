import * as yup from 'yup'

export const signInInitialValues = {
  email: '',
  password: '',
  name: '',
  confirmPassword: ''
}

export const signInSchema = yup.object().shape({
  password: yup.string().required('Password is required'),
	email: yup.string().nullable().label('Email Address').required().email('Invalid Email Address'),
})


export const signUpInitialValues = {
  email: '',
  password: '',
  name: '',
  confirmPassword: ''
}

export const signUpSchema = yup.object().shape({
  password: yup.string().required('Password is required').min(8).matches(
    /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
    "Password must contain at least 8 characters, one uppercase, one number and one special case character"
  ),
	name: yup.string().nullable().label('Name').required().min(3).max(40),
  confirmPassword: yup.string().required('Confirm password is required').oneOf([yup.ref('password')], 'Passwords must match'),
	email: yup.string().nullable().label('Email Address').required().email('Invalid Email Address'),
})
