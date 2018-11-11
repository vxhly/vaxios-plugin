const axios = typeof require === 'function'
  ? require('axios')
  : window.axios

if (!axios) {
  throw new Error('[Vaxios] cannot locate axios.js.')
}

export function axiosDefault (baseURL = 'http://127.0.0.1:8080/api', timeout = 0) {
  // 创建 axios 实例
  const instance = axios.create({
    baseURL: `${baseURL}`,
    timeout: `${timeout}`
  })

  // http request 拦截器
  instance.interceptors.request.use(
    config => {
      // 在 headers 头上添加参数
      config.headers['Content-Type'] = 'application/json;charset=UTF-8'
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )

  // http response 拦截器
  instance.interceptors.response.use(
    response => {
      return response
    },
    error => {
      if (error.response) {
        const err = error.response.data
        console.error(err)
      }

      return Promise.reject(error)
    }
  )

  return instance
}
