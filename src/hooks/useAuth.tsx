'use client'
import user from 'app/services/user'
import execute from 'app/filter/allExceptionFilter'
import { UserSignInI, UserSignUpI, AuthContextI, BaseError } from 'app/interfaces/UseAuth'
import React, { useCallback, useState, createContext, useContext, ReactNode } from 'react'

const defaultAuthContextValue: AuthContextI = {
  error: undefined,
  success: '',
  loading: false,
  signIn: async () => {},
  signUp: async () => {},
  getMe: async () => {},
};

const AuthContext = createContext<AuthContextI>(defaultAuthContextValue)

export const AuthProvider = ({ children }: { children: ReactNode }): ReactNode => {
	const [error, setError] = useState<BaseError>()
	const [success, setSuccess] = useState<string | Record<string, string>>('')
	const [loading, setLoading] = useState<boolean>(false)

	const getMe = useCallback(async () => {
		setLoading(true)
		execute<Record<string, string>, BaseError>(setSuccess, user.me, setError).finally(() => setLoading(false))
	}, [])

	const signUp = useCallback(async (data: UserSignUpI) => {
		setLoading(true)
		execute<string, BaseError>(setSuccess, () => user.signUp(data), setError).finally(() => {
			setLoading(false)
			setTimeout(() => window.location.replace('/'), 1000)
		})
	}, [])

	const signIn = useCallback(async (data: UserSignInI) => {
		setLoading(true)
		const saveToken = (response: Record<string, string>) => {
			localStorage.setItem('token', response.token)	
			setSuccess(response.token)
		}
		await execute<Record<string, string>, BaseError>(saveToken, () => user.signIn(data), setError).finally(() => {
			setLoading(false)
			setTimeout(() => window.location.replace('/'), 1000)
		})
	}, [])

	return (
		<AuthContext.Provider value={{ error, success, loading, signIn, signUp, getMe }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => useContext(AuthContext)
