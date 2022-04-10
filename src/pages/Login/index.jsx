import { Card, Form, Input, Button, Checkbox } from 'antd'
import logo from '@/assets/logo.png'
import './index.scss'

const Login = () => {
  // 表单提交执行
  const onFinish = values => {
    console.log('Success:', values)
  }

  return (
    <div className="login">
      <Card className="login-container">
        {/* 极客园logo */}
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        <Form 
        // 表单校验的默认触发时机是 onChange，要修改触发时机，要修改Form的validateTrigger属性，修改为onBlur 失去焦点
        validateTrigger={['onBlur']} name="basic" initialValues={{ remember: true }} onFinish={onFinish} autoComplete="off">
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

          <Form.Item name="remember" valuePropName="checked">
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
