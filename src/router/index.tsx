import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Login from "@/pages/Login";
import ProtectedPage from "@/pages/ProtectedPage";
import Home from "@/layouts/Home";
import Profile from "@/layouts/Profile";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<ProtectedPage />}>
      <Route path="home" element={<Home />} />
      <Route path="profile" element={<Profile />} />
    </Route>
  </>
  )
);

export default router;
