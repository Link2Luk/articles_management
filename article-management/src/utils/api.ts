import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
  type AxiosError
} from 'axios'

const handleAuth = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const token = sessionStorage.getItem('token')
  config.headers!.Authorization = token ? `Bearer ${token}` : ''
  return config
}

// const handleNetworkError = (status: number) => {
//   switch (status) {
//   }
// }
// const handleAuthError = (code: number) => {
//   switch (code) {
//   }
// }

const instance: AxiosInstance = axios.create({ timeout: 5000 })

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    config = handleAuth(config)
    return config
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error)
  }
)
instance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    const { code } = response.data
    if (code !== 0) {
      // handleAuthError(code)
    }
    return response
  },
  (error: AxiosError): Promise<AxiosError> => {
    // if (error.response) handleNetworkError(error.response.status)
    return Promise.reject(error)
  }
)

interface PlainObject {
  [name: string]: any
}
type ApiData = string | PlainObject | ArrayBuffer | ArrayBufferView | URLSearchParams | FormData | File | Blob

export default async (url: string, data: ApiData, config: AxiosRequestConfig = {}): Promise<AxiosResponse> => {
  const { method = 'get' } = config
  switch (method) {
    case 'get':
      return instance.get(url, { ...config, params: data })
    case 'post':
      return instance.post(url, data, config)
    case 'delete':
      return instance.delete(url, { ...config, data })
    default:
      return instance.request(config)
  }
}
