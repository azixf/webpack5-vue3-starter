import axios, {
  type AxiosInstance,
  type AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios'
import type { CustomHttp } from '@/types/providers'

const instance: AxiosInstance = axios.create({
  // baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 30000,
})

instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 请求前做点什么
    return config
  },
  (error: AxiosError) => Promise.reject(error)
)

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 请求后做点什么
    return Promise.resolve(response.data)
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

const http: CustomHttp = {
  get: () => Promise.resolve(),
  put: () => Promise.resolve(),
  post: () => Promise.resolve(),
  delete: () => Promise.resolve(),
}

;['get', 'put', 'post', 'delete'].forEach((method) => {
  http[method] = function (
    url: string,
    data: Record<string, any> = {},
    options?: Record<string, any>
  ) {
    return new Promise((resolve, reject) => {
      data = data || {}
      instance
        .request({
          url,
          method,
          data: method === 'get' ? null : data,
          params: method === 'get' ? data : null,
          ...options,
        })
        .then((res: any) => resolve(res))
        .catch((error) => reject(error))
    })
  }
})

export { http }

export default http
