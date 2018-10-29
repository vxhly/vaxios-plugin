import {
  axiosDefault
} from '../lib/axios'
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

  /**
   * [$GET 全局的 GET 方法]
   *
   * @method $GET
   * @param  {String} url
   * @return {Array | Object}
   */

  Vue.prototype.$GET = async (url) => {
    try {
      const response = await $axios.get(`${url}`)

      console.log($axios)

      if (opt.debug && opt.debug.get_debug) {
        console.info(response.data || null)
      }

      return response.data
    } catch (err) {
      if (err.response) {
        if (opt.throwError) throw Error(err.response.data.message)
        if (opt.debug && opt.debug.get_debug) {
          console.info(err.data || null)
        }
      }
      throw err
    }
  }

  /**
   * [$POST 全局的 POST 方法]
   *
   * @method $POST
   * @param  {String} url
   * @param  {Array | Object} payload =>Required:true
   * @return {Array | Object}
   */

  Vue.prototype.$POST = async (url, payload) => {
    try {
      if (Array.isArray(payload) || typeof payload === 'object') {
        const response = await $axios.post(`${url}`, payload)

        if (opt.debug && opt.debug.post_debug) console.info(response.data || null)

        return response.data
      } else throw Error('payload must be Array or Object')
    } catch (err) {
      if (err.response) {
        if (opt.throwError) throw Error(err.response.data.message)
        if (opt.debug && opt.debug.post_debug) console.error(err.response || null)
      }
      throw err
    }
  }

  /**
   * [$PUT 全局的 PUT 方法]
   *
   * @method $PUT
   * @param  {String} url
   * @param  {Array | Object} payload =>Required:true
   * @return {Array | Object}
   */

  Vue.prototype.$PUT = async (url, payload) => {
    try {
      if (Array.isArray(payload) || typeof payload === 'object') {
        const response = await $axios.put(`${url}`, payload)

        if (opt.debug && opt.debug.put_debug) console.info(response.data || null)

        return response.data
      } else throw Error('payload must be Array or Object')
    } catch (err) {
      if (err.response) {
        if (opt.throwError) throw Error(err.response.data.message)
        if (opt.debug && opt.debug.put_debug) {
          console.info(err.data || null)
        }
      }
      throw err
    }
  }

  /**
   * [$PATCH 全局的 PATCH 方法]
   *
   * @method $PATCH
   * @param  {String} url
   * @param  {Array | Object} payload =>Required:true
   * @return {Array | Object}
   */

  Vue.prototype.$PATCH = async (url, payload) => {
    try {
      if (Array.isArray(payload) || typeof payload === 'object') {
        const response = await $axios.patch(`${url}`)

        if (opt.debug && opt.debug.patch_debug) console.info(response.data || null)

        return response.data
      } else throw Error('payload must be Array or Object')
    } catch (err) {
      if (err.response) {
        if (opt.throwError) throw Error(err.response.data.message)
        if (opt.debug && opt.debug.patch_debug) {
          console.info(err.data || null)
        }
      }
      throw err
    }
  }

  /**
   * [$DELETE 全局的 DELETE 方法]
   *
   * @method $DELETE
   * @param  {String} url
   * @param  {Array | Object} payload =>Required:false
   * @return {Array | Object}
   */

  Vue.prototype.$DELETE = async (url, payload) => {
    try {
      let response = null
      if (payload) {
        if (Array.isArray(payload) || typeof payload === 'object') {
          response = await $axios.delete(`${url}`, {
            data: payload
          })
        } else throw Error('payload must be Array')
      } else response = await $axios.delete(`${url}`)

      if (opt.debug && opt.debug.delete_debug) console.info(response.data || null)

      return response.data
    } catch (err) {
      if (err.response) {
        if (opt.throwError) throw Error(err.response.data.message)
        if (opt.debug && opt.debug.patch_debug) {
          console.info(err.data || null)
        }
      }
      throw err
    }
  }
}

export default Vaxios

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Vaxios)
}
