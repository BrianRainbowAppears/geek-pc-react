// 创建rootReducer，合并reducer
import { combineReducers } from "redux";
import {loginReducer} from './login'

const rootReducer = combineReducers({
  loginReducer
})

export default rootReducer