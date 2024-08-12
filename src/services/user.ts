import service from '.'
import { UserSignInI, UserSignUpI } from 'app/interfaces/UseAuth'

const user = {
  me: () => service.post('/user/all'),
  signUp: (data: UserSignUpI) => service.post('/api_v1/auth/register', data),
  signIn: (data: UserSignInI) => service.post('/api_v1/auth/login', data),
}

export default user