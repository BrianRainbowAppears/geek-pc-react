import { clearToken, setToken } from '@/utils/auth'
import { request } from '@/utils/request'
// import axios from 'axios'

// action中导出定义的异步action函数，参数为表单数据
export function getTokenAction(formData) {
  // 同步action函数,内部直接return对象
  // 异步action函数,内部return函数,参数为dispatch,并且在函数内部再次调用dispatch将获取到的token存储到redux中
  return async (dispatch) => {
    // 函数内首先需要调用axios获取token，传入url和上边传入的表单数据
    // const ret = await axios.post('http://geek.itheima.net/v1_0/authorizations', formData)
    const ret = await request.post('/authorizations', formData)
    // console.log(ret.data.data.token)
    console.log(ret.data.token)
    dispatch({
      type: 'login/token',
      // token: ret.data.data.token
      token: ret.data.token
    })
    // 旧方法：直接将token存储到本地
    // localStorage.setItem('tokenValue', ret.data.data.token)
    // 封装token工具新方法
    // setToken(ret.data.data.token)
    setToken(ret.data.token)
  }
}
// 退出登录
export function logoutAction() {
  return ((dispatch) => {
    dispatch({
      type: 'clear/login'
    })
    clearToken()
    dispatch({
      type: 'clear/user'
    })
  })
}