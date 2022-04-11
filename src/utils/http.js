// 封装http工具模块
import axios from 'axios'

const http = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 5000
})

// 定义相应拦截器，简化返回代码
http.interceptors.response.use(
  function(response) {
    // 响应数据处理
    // 给返回的数据脱两层壳(两层data)
    return response.data.data
  }, function (error) {
    // 响应错误处理
    return Promise.reject(error)
  }
)

export { http }
