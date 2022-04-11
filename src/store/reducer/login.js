// 登录功能 只需储存token即可

import { getToken } from "@/utils/auth"

const initState = getToken() || ''

export function loginReducer(state = initState, action) {
  if (action.type === 'login/token') {
    // 存储token
    // 因为传入的token为字符串，自己定义的初始initState也是空字符串，所以直接return即可
    return action.token
  }
  return state
}

// export default loginReducer
