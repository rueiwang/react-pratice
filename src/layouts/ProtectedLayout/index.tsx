import { Outlet, Link, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "@/customHooks/useAuthContext";

import { Layout, Menu, Button } from "antd";
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
              defaultSelectedKeys={["1"]}
              items={[
                {
                  key: "1",
                  icon: <HomeOutlined />,
                  label: (
                    <Link to={"/home"} state={{ key: "1" }}>
                      首頁
                    </Link>
                  ),
                },
                {
                  key: "2",
                  icon: <UserOutlined />,
                  label: (
                    <Link to={"/profile"} state={{ key: "2" }}>
                      個人資訊
                    </Link>
                  ),
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
  );
};

export default ProtectedLayout;
