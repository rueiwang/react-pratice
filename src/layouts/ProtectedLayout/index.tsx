import { Outlet, Link, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "@/customHooks/useAuthContext";

import { Layout, Menu, Button, theme, ConfigProvider } from "antd";
const { token } = theme;
const { Header, Content, Sider } = Layout;
import { LogoutOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";
import "./style.scss";

const ProtectedLayout = () => {
  const { pathname } = useLocation();

  const { user, logout } = useAuth();
  if (user === null) {
    return <Navigate to="/login" />;
  }

  if (pathname === "/") {
    return <Navigate to="/home" />;
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgTextHover: '#ffe600',
          controlItemBgActive: '#ffe600',
          colorFillAlter: '#fff57e',
          colorPrimary: '#ffe600'
      }}}
    >
      <Layout className="ProtectedLayout">
        <Header className="header">
          <h1 className="">綠電轉供資訊服務平台</h1>
          <Button
            type="text"
            icon={<LogoutOutlined style={{ color: "#444c80ff" }} />}
            onClick={logout}
            className="logout-button"
          ></Button>
        </Header>
        <Content className="main">
          <Layout className="main__container" style={{ padding: "24px 0" }}>
            <Sider style={{ background: "#fff" }} width={200}>
              <Menu
                className="main__menu"
                mode="inline"
                defaultSelectedKeys={["/home"]}
                selectedKeys={[pathname]}
                items={[
                  {
                    key: "/home",
                    icon: <HomeOutlined />,
                    label: <Link to={"/home"}>首頁</Link>,
                  },
                  {
                    key: "/profile",
                    icon: <UserOutlined />,
                    label: <Link to={"/profile"}>個人資訊</Link>,
                  },
                ]}
              />
            </Sider>
            <Content style={{ padding: "0 24px", minHeight: 280 }}>
              <Outlet />
            </Content>
          </Layout>
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default ProtectedLayout;
