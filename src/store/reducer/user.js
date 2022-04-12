// 存储用户信息Redux
const initState = {}

export function userReducer(state = initState, action) {
  if (action.type === 'user/getInfo') {
    return action.userInfo
  }
  // 退出登录
  if (action.type === 'clear/user') {
    return {}
  }
  return state
}
