import { Navigate } from "react-router-dom";
import { useAuth, UserName } from "@/customHooks/useAuthContext";
import { useTranslation } from "react-i18next";
import LangSelect from "@/components/LangSelect";

import { Button, Form, Input, theme } from "antd";
const { useToken } = theme;
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import "./style.scss";

interface LoginValue {
  user: UserName;
  password: string;
}

const Login = () => {
  const { user, login } = useAuth();
  const { token } = useToken();
  const { t } = useTranslation();

  if (user !== null) {
    return <Navigate to="/home" replace={true} />;
  }

  const startLogin = (value: LoginValue) => {
    if (!login) return;
    login({ userName: value.user, password: value.password });
    return <Navigate to="/home" />;
  };

  return (
    <div className="Login">
      <LangSelect />
      <div className="Login__title">
        <h1 style={{ color: token.colorPrimary }}>
          {t("loginPage.loginTitle")}
        </h1>
        <p>{t("loginPage.version")} v2.9</p>
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
            { type: "email", message: t("loginPage.warning.email") as string },
            {
              required: true,
              message: t(`loginPage.warning.required`) as string,
            },
          ]}
        >
          <Input
            prefix={
              <UserOutlined
                style={{ color: token.colorPrimary }}
                className="site-form-item-icon"
              />
            }
            placeholder={t("loginPage.account") as string}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              pattern: /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/,
              message: t("loginPage.warning.password") as string,
            },
            {
              required: true,
              message: t(`loginPage.warning.required`) as string,
            },
          ]}
        >
          <Input
            prefix={
              <LockOutlined
                style={{ color: token.colorPrimary }}
                className="site-form-item-icon"
              />
            }
            type="password"
            placeholder={t("loginPage.password") as string}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            {t("loginPage.login")}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;
