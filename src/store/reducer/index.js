// 创建rootReducer，合并reducer
import { combineReducers } from 'redux'
import { loginReducer } from './login'
import { userReducer } from './user'
import { articleReducer } from './article'

const rootReducer = combineReducers({
  loginReducer,
  userReducer,
  articleReducer
})

export default rootReducer
