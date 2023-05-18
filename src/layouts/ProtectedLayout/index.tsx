import { Outlet, Link, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "@/customHooks/useAuthContext";
import { useTranslation } from "react-i18next";
import LangSelect from "@/components/LangSelect";

import { Layout, Menu, Button, ConfigProvider } from "antd";
const { Header, Content, Sider } = Layout;
import { LogoutOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";
import "./style.scss";

const ProtectedLayout = () => {
  const { pathname } = useLocation();
  const { t } = useTranslation();

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
          colorBgTextHover: "#ffe600",
          controlItemBgActive: "#ffe600",
          colorFillAlter: "#fff57e",
          colorPrimary: "#ffe600",
        },
      }}
    >
      <Layout className="ProtectedLayout">
        <Header className="header">
          <h1 className="">{t("protectedLayout.title")}</h1>
          <div>
            <LangSelect />
            <Button
              type="text"
              icon={<LogoutOutlined style={{ color: "#444c80ff" }} />}
              onClick={logout}
              className="logout-button"
            ></Button>
          </div>
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
                    label: (
                      <Link to={"/home"}>{t("protectedLayout.home")}</Link>
                    ),
                  },
                  {
                    key: "/profile",
                    icon: <UserOutlined />,
                    label: (
                      <Link to={"/profile"}>
                        {t("protectedLayout.profile")}
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
    </ConfigProvider>
  );
};

export default ProtectedLayout;
