# Vaxios

[![NPM version](https://img.shields.io/npm/v/Vaxios.svg?style=flat-square)](https://www.npmjs.com/package/Vaxios) [![GitHub forks](https://img.shields.io/github/forks/vxhly/Vaxios.svg)](https://github.com/vxhly/Vaxios/network) [![GitHub stars](https://img.shields.io/github/stars/vxhly/Vaxios.svg)](https://github.com/vxhly/Vaxios/stargazers) [![NPM download](https://img.shields.io/npm/dm/Vaxios.svg?style=flat-square)](https://npmjs.org/package/Vaxios) [![GitHub license](https://img.shields.io/github/license/vxhly/Vaxios.svg)](https://github.com/vxhly/Vaxios/blob/master/LICENSE)

> 二次封装 axios,使 vue.js 中使用 axios 变得更加简单

# 特点

- 遵循 RESTful
- 支持 await
- 支持 async
- 简单易用

# Install

```bash
npm i -S Vaxios
```

# Used

`main.js`

```bash
import Vue from 'vue'
import Vaxios from 'Vaxios'

Vue.use(Vaxios, {
  useparam: true,
  param: {
    baseURL: 'https://cnodejs.org/api/v1',
    timeout: 0
  }
})
```

## options

option     | type     | default                                                                                                                                  | description
---------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------- | -----------------------------------------------
method     | function | null                                                                                                                                     | 自定义 axios 拦截方法,如果有自定义的方法,推荐设置自定义的拦截方法
throwError | object   | { get_debug: false,post_debug: false,put_debug: false,patch_debug: false,delete_debug: false }                                           | 当然可以直接使用 Boolean 值进行全部开启和全部关闭,该作用是在控制台中输出请求到的数据
useparam   | boolean  | false                                                                                                                                    | 如果不想自定义 axios 拦截方法,该参数必须为 true
param      | object   | { baseURL: '<http://127.0.0.1:8080/api>',timeout: 0 } | 自定义 axios 拦截参数                                  |

## 在 vue 中使用

```html
<script>
export default {
  methods: {
    get () {
      const url = `/users?id=123` // 必填
      this.$Get(url).then((data) => {
        console.log(data)
      })
    },
    post () {
      const url = `/users` // 必填
      const payload = {
        id: 123,
        username: 'admin',
        pwd: 'admin'
      } // payload 必须为 Object 或者 Array,必填

      this.$POST(url,payload).then((data) => {
        console.log(data)
      })
    }
  },
  put () {
    const url = `/users`
    const payload = {
      id: 123,
      username: 'admin',
      pwd: 'admin'
    } // payload 必须为 Object 或者 Array,必填

    this.$PUT(url,payload).then((data) => {
      console.log(data)
    })
  },
  patch () {
    const url = `/users/pwd`
    const payload = {
      pwd: 'admin',
      pwd2: 'admin'
    } // payload 必须为 Object 或者 Array,必填

    this.$PATCH(url,payload).then((data) => {
      console.log(data)
    })
  },
  deleteById () {
    const url = `/users/1`
    this.$DELETE(url).then((data) => {
      console.log(data)
    })
  },
  deleteByPayload (){
    const url = `/users`
    const payload = {
      id: [1,2,3,4]
    } // payload 必须为 Object 或者 Array,非必填

    this.$DELETE(url,payload).then((data) => {
      console.log(data)
    })
  }
}
</script>
```

## axios 拦截的一个实例

```javascript
import axios from 'axios'
import store from '@/store'
import config from '@/config'
import router from '@/router'
import {
  Message
} from 'element-ui'

const protocol = window.location.protocol
const host = window.location.host
const domain = document.domain
let serverURL = ''

if (domain === '127.0.0.1' || domain === 'localhost') {
  serverURL = config.serverURL
} else {
  serverURL = `${protocol}` + '//' + `${host}:8888/api`
}

// 创建 axios 实例
const instance = axios.create({
  baseURL: serverURL,
  timeout: 0
})

// http request 拦截器
instance.interceptors.request.use(
  config => {
    // 在 headers 头上添加参数
    config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    if (store.state.auth.authToken) {
      config.headers['Authorization'] = `${store.state.auth.authToken}`
    }
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
      switch (err.status) {
        case 401:
          Message({
            type: 'waring',
            message: err.message
          })
          setTimeout(() => {
            store.dispatch('logout')
            router.replace({
              name: 'Login'
            })
          }, 500)
          break
        case 404:
          Message({
            type: 'waring',
            message: err.message
          })
          setTimeout(() => {
            router.replace({
              name: 'NotFound'
            })
          }, 500)
          break
        case 422:
          Message({
            type: 'waring',
            message: err.message
          })
          break
        case 500:
          Message({
            type: 'error',
            message: err.message
          })
          break
        default:
          Message({
            type: 'error',
            message: err.message
          })
          break
      }
    }

    return Promise.reject(error)
  }
)

export default instance
```
