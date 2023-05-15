import { Suspense } from "react";
import { useLoaderData, useOutlet, Await } from "react-router-dom";
import { AuthProvider, UserName } from "@/customHooks/useAuthContext";

import { Alert } from "antd";
import Loading from "@/components/Loading";

interface AuthLayoutLoader {
  userPromise: Promise<UserName>;
}

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
