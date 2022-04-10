// App.jsx 为根组件，所有其他组件都要合并到此根组件文件下
import './App.scss'
// 配置路由在根组件 App.js
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
// 导入页面，配置路由
// 在config.js 里配置了 @的指向
import Login from '@/pages/Login'
import Layout from '@/pages/Layout'
import NotFound from './pages/NotFound'

function App() {
  return (
    // 路由 history模式
    <BrowserRouter>
      <div className="app">
        <Switch>
          {/* 能够打开页面(重定向只需输入'/'就能跳转)就展示首页内容， */}
          <Redirect exact from='/' to='/home'></Redirect>
          <Route path="/home" component={Layout}></Route>
          <Route path="/login" component={Login}></Route>
          <Route component={NotFound}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
