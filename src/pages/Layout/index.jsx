// 导入路由组件
import Index from './Home'
import Article from './Article'
import Publish from './Publish'
import { Layout, Menu, Popconfirm } from 'antd'
import { HomeOutlined, DiffOutlined, EditOutlined, LogoutOutlined } from '@ant-design/icons'
// import './index.scss'
import styles from './index.module.scss'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserInfo } from '@/store/action/user'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { logoutAction } from '@/store/action/login'
// 结构函数的静态属性
const { Header, Sider } = Layout

function LayoutGeek() {
  // 实现选中高亮，刷新依旧
  const location = useLocation()
  const history = useHistory()
  console.log(location)
  // const path = location.pathname
  const path = location.pathname.startsWith('/home/publish') ? '/home/publish' : location.pathname
  console.log(path)
  // 调接口拿取用户信息
  const dispatch = useDispatch()
  // 使用useEffect钩子，只掉一次接口
  useEffect(() => {
    dispatch(getUserInfo())
  }, [dispatch])
  // 从Redux中拿取共享数据：用户信息
  const user = useSelector(state => state.userReducer)
  // console.log(user);
  // 退出登录功能
  const logout = () => {
    // 1. 清空本地状态
    dispatch(logoutAction())
    // 2. 跳回登录页
    history.push('/login')
  }

  return (
    <Layout className={styles.root}>
      <Header className="header">
        <div className="logo" />
        {/* 用户信息 */}
        <div className="user-info">
          <span className="user-name">{user.name}</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出？" onConfirm={logout} okText="退出" cancelText="取消">
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          {/* 菜单 */}
          <Menu
            mode="inline"
            theme="dark"
            // defaultSelectedKeys={[path]}
            selectedKeys={[path]}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item icon={<HomeOutlined />} key="/home">
              <Link to="/home">数据概览</Link>
            </Menu.Item>
            <Menu.Item icon={<DiffOutlined />} key="/home/article">
              <Link to="/home/article">内容管理</Link>
            </Menu.Item>
            <Menu.Item icon={<EditOutlined />} key="/home/publish">
              <Link to="/home/publish">发布文章</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        {/* 右侧：内容(后台页面) */}
        <Layout className="layout-content" style={{ padding: '20px' }}>
          {/* 子路由规则配置 */}
          {/* 数据概览  */}
          <Route exact path="/home" component={Index}></Route>
          {/* 内容管理  */}
          <Route path="/home/article" component={Article}></Route>
          {/* 发布文章  */}
          <Route path="/home/publish/:articleId?" component={Publish}></Route>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default LayoutGeek
