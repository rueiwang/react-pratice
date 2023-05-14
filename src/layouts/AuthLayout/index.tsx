import { Suspense } from "react";
import { useLoaderData, useOutlet, Await } from "react-router-dom";
import { AuthProvider, UserName } from "@/customHooks/useAuthContext";

import { Spin, Alert } from "antd";

interface AuthLayoutLoader {
  userPromise: Promise<UserName>;
}

export const getUserData = () => {
  return new Promise<UserName>((resolve) => {
    return setTimeout(() => {
      const user = window.localStorage.getItem("user") || null;
      resolve(user);
    }, 300);
  });
};

const Loading = () => (
  <div
    style={{
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Spin tip="Loading">
      <div
        className="content"
        style={{
          padding: "50px",
          borderRadius: "4px",
        }}
      />
    </Spin>
  </div>
);
const AuthLayout = () => {
  const outlet = useOutlet();
  const { userPromise } = useLoaderData() as AuthLayoutLoader;

  return (
    <Suspense fallback={<Loading />}>
      <Await
        resolve={userPromise}
        errorElement={
          <Alert
            message="Error"
            description="Something wrong!"
            type="error"
            showIcon
          />
        }
        children={(user) => <AuthProvider user={user}>{outlet}</AuthProvider>}
      />
    </Suspense>
  );
};

export default AuthLayout;
