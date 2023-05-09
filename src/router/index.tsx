import { createBrowserRouter } from "react-router-dom";
import Login from "@/pages/Login";

const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />
    },
    {
        path: "/home",
        element: <div>HOME</div>
    },
    {
        path: "/profile",
        element: <div>Profile</div>
    },
  ]);

export default router