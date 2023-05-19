import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  defer,
} from "react-router-dom";

import AuthLayout from "@/layouts/AuthLayout";
import {
  UserName,
  getUserDataWithAuthenticatedToken,
} from "@/customHooks/useAuthContext";
import ProtectedLayout from "@/layouts/ProtectedLayout";
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import { getChartData } from "@/pages/Home/fakeData";
import Profile from "@/pages/Profile";
import { getProfileData } from "@/pages/Profile/fakeData";

export const getUserData = () => {
  return new Promise<UserName>((resolve) => {
    return setTimeout(() => {
      const {
        data: { user },
      } = getUserDataWithAuthenticatedToken();
      resolve(user);
    }, 100);
  });
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={<AuthLayout />}
      loader={() => defer({ userPromise: getUserData() })}
    >
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedLayout />}>
        <Route
          path="home"
          element={<Home />}
          loader={() => defer({ chartDataPromise: getChartData() })}
        />
        <Route
          path="profile"
          element={<Profile />}
          loader={() => defer({ profileDataPromise: getProfileData() })}
        />
      </Route>
    </Route>
  )
);

export default router;
