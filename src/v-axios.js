import {
  axiosDefault
} from './lib/axios'
const Vaxios = []

Vaxios.install = function (Vue, options) {
  let $axios = null

  let opt = {
    method: null, // 自定义 axios 方法
    throwError: false, // 抛出异常
    debug: { // debug 模式,在控制台输出请求回来的数据
      get_debug: false,
      post_debug: false,
      put_debug: false,
      patch_debug: false,
      delete_debug: false
    },
    useparam: false,
    param: {
      baseURL: 'http://127.0.0.1:8080/api',
      timeout: 0
    }
  }

  for (let property in options) {
    opt[property] = options[property]
  }

  if (opt.method && opt.param) {
    $axios = opt.method
  } else if (opt.useparam && typeof opt.param === 'object') {
    $axios = axiosDefault(opt.param.baseURL, opt.param.timeout)
  }

}

export default Vaxios

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Vaxios)
}