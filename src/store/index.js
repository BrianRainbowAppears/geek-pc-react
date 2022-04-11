// 创建store，配置中间件(thunk操作异步action，和开发工具)
import { applyMiddleware, createStore } from 'redux'
import rootReducer from './reducer'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
export default store
