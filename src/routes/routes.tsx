import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../components/layouts/RootLayout";
import DashboardLayout from "../components/layouts/DashboardLayout";
import Login from "../pages/Login";
import Contact from "../pages/Contact";
import Register from "../pages/Register";
import StudentDashboard from "../pages/StudentDashboard";
import Teachers from "../pages/Teachers";
import Home from "../pages/Home";
import ProtectedRoute from "./protected.route";
import AuthLayout from "../components/layouts/AuthLayout";
import About from "../pages/About";
import { Blog } from "../pages/Blog";
import Pricing from "../pages/Pricing";

const routes = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        element: <RootLayout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "/teachers",
            element: <Teachers />,
          },
          {
            path: "/contact",
            element: <Contact />,
          },
          {
            path: "/about",
            element: <About />,
          },
          {
            path: "/blog",
            element: <Blog />,
          },
          {
            path: "/pricing",
            element: <Pricing />,
          },
        ],
      },
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <StudentDashboard />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: (
      <ProtectedRoute>
        <Login />
      </ProtectedRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <ProtectedRoute>
        <Register />,
      </ProtectedRoute>
    ),
  },
]);
export default routes;
