import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Login from "@/pages/Login";
import ProtectedLayout from "@/pages/ProtectedLayout";
import Home from "@/pages/Home";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<ProtectedLayout />}>
      <Route path="home" element={<Home />} />
      <Route path="profile" element={<>Profile</>} />
    </Route>
  </>
  )
);

export default router;
