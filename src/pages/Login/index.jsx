import { Card, Form, Input, Button, Checkbox, message } from 'antd'
import logo from '@/assets/logo.png'
import './index.scss'
import { useDispatch } from 'react-redux'
import { getTokenAction } from '@/store/action/login'
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min'

const Login = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  console.log(location)
  // 表单提交执行
  const onFinish = async formData => {
    console.log('Success:', formData)
    // 登录获取token功能
    // 1. 定义异步action函数，函数中调用dispatch将token存储到redux
    // 2. login页面组件登录调用dispatch
    // try..catch捕获 token获取失败的情况的error
    try {
      await dispatch(getTokenAction(formData))
      // 绝对不能在这打印location.state.from，因为state有可能出现undefined
      // console.log(location.state.from);
      history.push(location.state?.from || '/home')
    } catch (error) {
      console.dir(error)
      console.log(error.response.data.message)
      message.error(error.response.data.message)
    }
  }
  const validAgree = (rule, value) => {
    // console.log(rule, value);
    if (value) {
      // Promise.resolve() 方法可以直接得到一个Promise对象
      return Promise.resolve()
    } else {
      return Promise.reject(new Error('请勾选用户协议'))
    }
  }

  return (
    <div className="login">
      <Card className="login-container">
        {/* 极客园logo */}
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        <Form
          // 表单校验的默认触发时机是 onChange，要修改触发时机，要修改Form的validateTrigger属性，修改为onBlur 失去焦点
          validateTrigger={['onBlur']}
          name="basic"
          initialValues={{
            mobile: '13911111111',
            code: '246810',
            remember: true
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          {/* 手机号 */}
          {/* 表单校验的核心：
          1. Form.Item指定name属性，name属性和后台登录接口需要的参数名保持一致
          2. 通过rules指定表单项校验规则
          */}

          <Form.Item
            // name需要跟接口的参数名保持一致
            name="mobile"
            rules={[
              { required: true, message: '请输入手机号' },
              { pattern: '^1(3[0-9]|4[57]|5[0-35-9]|7[0135678]|8[0-9])\\d{8}$', message: '请输入正确格式的手机号' }
            ]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            name="code"
            rules={[
              { required: true, message: '请输入验证码' },
              { len: 6, message: '请输入正确的验证码' }
            ]}
          >
            {/* <Input.Password size='large' /> */}
            <Input size="large" />
          </Form.Item>

          <Form.Item
            rules={[
              {
                // 自定义校验：自定义函数名，函数在return之前定义
                validator: validAgree
              }
            ]}
            name="remember"
            valuePropName="checked"
          >
            <Checkbox>我已阅读并同意「用户协议」和「隐私条款」</Checkbox>
          </Form.Item>

          <Form.Item>
            {/* 标签内的 block 属性：可以将登录按钮，按照父盒子的宽度撑满 */}
            <Button size="large" block type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login
