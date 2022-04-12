// 创建rootReducer，合并reducer
import { combineReducers } from 'redux'
import { loginReducer } from './login'
import { userReducer } from './user'

const rootReducer = combineReducers({
  loginReducer,
  userReducer
})

export default rootReducer
