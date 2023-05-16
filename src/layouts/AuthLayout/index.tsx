import { useOutlet } from "react-router-dom";
import { useAuth } from "@/customHooks/useAuth";

import Loading from "@/components/Loading";

const AuthLayout = () => {
  const outlet = useOutlet();
  const { isInitialized } = useAuth();

  return isInitialized ? <Loading /> : <>{outlet}</>;
};

export default AuthLayout;
