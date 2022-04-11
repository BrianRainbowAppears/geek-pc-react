// 封装token工具模块

// 获取token
const TOKEN_KEY = 'tokenValue'
export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}
// 修改token
export function setToken(newToken) {
  localStorage.setItem(TOKEN_KEY, newToken)
}
// 清除token
export function clearToken() {
  localStorage.removeItem(TOKEN_KEY)
}
// 判断是否登录
export function isAuth() {
  // 注意： !!value 可以转换布尔值
  return !!getToken()
}
