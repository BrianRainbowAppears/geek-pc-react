// 封装http工具模块
import axios from 'axios'
import store from '@/store'
import {logoutAction} from '@/store/action/login'
import customHistory from './history'
// 添加axios实例
const request = axios.create({
  // 后台基础地址
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 5000
})

// 定义请求拦截器：为header统一添加token
request.interceptors.request.use((config) => {
  // console.log(store.getState().loginReducer);
  // 在js文件中，可以使用store.getState()方法拿取存储在Redux里的token
  const loginToken = store.getState().loginReducer
  if (loginToken) {
    config.headers.Authorization = `Bearer ${loginToken}`
  }
  // console.log(config);
  return config
})

// 定义相应拦截器，简化返回代码
request.interceptors.response.use(
  function(response) {
    // console.log(response);
    // 响应数据处理
    // 请求成功：200 进入这里
    // 给返回的数据脱两层壳(两层data)
    return response.data
  }, function (error) {
    // 响应错误处理
    // 请求失败：400 401 500 等，进入这个
    // 场景：处理401 token失效，返回登录页
    // 处理token失效功能
    console.dir(error);
    if(error.response.status === 401) {
      // 1. 删除token
      // 由于在js文件中无法使用useDispatch钩子，所以只能使用store.dispatch()方法，使用action中定义的删除token方法
      store.dispatch(logoutAction())
      // 2. 跳转到登录页
      console.log(customHistory);
      customHistory.push({
        pathname: '/login',
        state: {
          from: customHistory.location.pathname
        }
      })
    }
    return Promise.reject(error)
  }
)

export { request }
