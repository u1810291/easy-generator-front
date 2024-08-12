
export interface UserSignUpI {
	name: string;
	email: string;
	password: string;
  confirmPassword: string;
}
export interface UserSignInI {
	email: string;
	password: string;
}

export interface AuthContextI {
	error?: BaseError;
	success: string | Record<string, string>;
	loading: boolean;
	getMe: () => void;
	signUp: (data: UserSignUpI) => void;
	signIn: (data: UserSignInI) => void;
}

export interface BaseError {
	code_error: number;
	message: string;
	path: string;
	statusCode: number;
	timestamp: number;
}