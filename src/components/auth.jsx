import { isAuth } from '@/utils/auth'
import { Redirect } from 'react-router-dom'
import { Route } from 'react-router-dom'

// 路由鉴权
// component: Cp 目的为component改名，因为组件入口必须要是首字母大写
// ...rest 为获取剩余参数
function AuthRoute({ component: Cp, ...rest }) {
  console.log(rest);
  return (
    <Route
      // path={path}
      // 直接将所有剩余参数传给 Route 路由组件内部
      {...rest}
      render={props => {
        console.log(props)
        // 实现导航守卫拦截功能：查看是否token
        // 有：放行；没有：回到登录页
        // 1. 如果没有token，return重定向标签指向login页
        // 2. 拿取初次进入的网页路径，登陆成功后按照路径再次进入
        if (!isAuth()) {
          // 简单守卫回登录页
          // return <Login></Login>
          return (
            <Redirect
              to={{
                // 重定向去的路径
                pathname: '/login',
                // 拿取首次登录信息
                state: {
                  from: props.location.pathname
                }
              }}
            ></Redirect>
          )
        }
        return <Cp></Cp>
      }}
    ></Route>
  )
}

export default AuthRoute
