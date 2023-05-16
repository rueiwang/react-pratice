import { Navigate } from "react-router-dom";
import { useAuth, UserName } from "@/customHooks/useAuth";

import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import "./style.scss";

interface LoginValue {
  user: UserName;
  password: string;
}

const Login = () => {
  const { login, userName } = useAuth();

  if (userName !== null) {
    return <Navigate to="/home" replace={true} />;
  }

  const startLogin = (value: LoginValue) => {
    if (!login) return;
    login({ userName: value.user, password: value.password });
    return <Navigate to="/home" />;
  };

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
        onFinish={startLogin}
      >
        <Form.Item
          name="user"
          rules={[
            { type: "email", message: "帳號格式錯誤" },
            { required: true, message: "請輸入帳號" },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="帳號"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              pattern: /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/,
              message: "密碼格式錯誤",
            },
            { required: true, message: "請輸入密碼" },
          ]}
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
