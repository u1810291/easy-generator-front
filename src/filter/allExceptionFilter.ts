import { AxiosResponse } from 'axios'

export default async function AllExceptionFilter<T, E>(
  resolve: (data: T) => void,
  func: () => Promise<AxiosResponse<T>>,
  reject: (error: E) => void
) {
  try {
    const res: AxiosResponse<T> = await func()
    const data: T = res.data
    resolve(data)
  } catch (error: any) {
    console.error(error?.response?.data || error?.message)
    reject(error?.response?.data || error?.message)
  }
}
