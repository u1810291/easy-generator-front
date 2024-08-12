import axios, { Axios, InternalAxiosRequestConfig } from 'axios'

const BASE_URL: string = process.env.API_URL || ''

let instance: Axios
const singleInstance = (): Axios => {
  if(instance instanceof Axios) {
    return instance
  }
  instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 30000
  })

  instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const URL = config.url?.split('/')
    if(!URL?.includes('user')) {
      // const token = window.localStorage?.getItem('token')
      // config.url = config.url + `?token=${token}`
    }
    return config
  }, (error) => {
    console.error(error)
    return Promise.reject(error)
  })

  instance.interceptors.response.use((response) => {
    return response
  }, (error) => {
    console.error(error)
    return Promise.reject(error)
  })
  return instance
}

export default singleInstance()
