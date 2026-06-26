import { createBrowserRouter, Navigate } from "react-router-dom";
import Welcome from "@/pages/Welcome";
import Home from "@/pages/Home";
import Templates from "@/pages/Templates";
import Generating from "@/pages/Generating";
import Preview from "@/pages/Preview";
import Profile from "@/pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/welcome" replace />,
  },
  {
    path: "/welcome",
    element: <Welcome />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/templates",
    element: <Templates />,
  },
  {
    path: "/generating",
    element: <Generating />,
  },
  {
    path: "/preview/:id",
    element: <Preview />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);

export default router;
