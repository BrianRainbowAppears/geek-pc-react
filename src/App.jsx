import './App.scss'
// 配置路由在根组件 App.js
import { BrowserRouter, Route, Switch } from 'react-router-dom'
// 导入页面，配置路由
import Login from './pages/Login'
import Layout from './pages/Layout'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Switch>
          <Route path="/home" component={Layout}></Route>
          <Route path="/login" component={Login}></Route>
          <Route component={NotFound}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
