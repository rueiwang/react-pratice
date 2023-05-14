import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  defer,
} from "react-router-dom";
import AuthLayout, { getUserData } from "@/layouts/AuthLayout";
import ProtectedLayout from "@/layouts/ProtectedLayout";

import Login from "@/pages/Login";
import Home from "@/pages/Home";
import Profile from "@/pages/Profile";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={<AuthLayout />}
      loader={() => defer({ userPromise: getUserData() })}
    >
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedLayout />}>
        <Route path="home" element={<Home />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Route>
  )
);

export default router;
