import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import "./style.scss";

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const Login = () => {
  return (
    <div className="Login">
      <div className="Login__title">
        <h1>智慧能源調度系統</h1>
        <p>版本 v2.9</p>
      </div>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{type: 'email', message: "帳號格式錯誤"},{ required: true, message: "請輸入帳號" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="帳號"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{pattern: /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/, message: "密碼格式錯誤"},{ required: true, message: "請輸入密碼" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="密碼"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            登入
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;
