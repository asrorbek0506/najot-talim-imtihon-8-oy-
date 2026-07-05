import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../components/layouts/RootLayout";
import DashboardLayout from "../components/layouts/DashboardLayout";
import Login from "../pages/Login";
import Contact from "../pages/Contact";
import Register from "../pages/Register";
import StudentDashboard from "../pages/StudentDashboard";
import MyCourses from "../pages/dashboard/MyCourses";
import Results from "../pages/dashboard/Results";
import Certificates from "../pages/dashboard/Certificates";
import Profile from "../pages/dashboard/Profile";
import Payments from "../pages/dashboard/Payments";
import Settings from "../pages/dashboard/Settings";
import Teachers from "../pages/Teachers";
import TeacherDetails from "../pages/TeacherDetails";
import Home from "../pages/Home";
import Courses from "../pages/Courses";
import CourseDetails from "../pages/CourseDetails";
import Blog from "../pages/Blog";
import BlogDetails from "../pages/BlogDetails";
import Pricing from "../pages/Pricing";
import About from "../pages/About";
import Faq from "../pages/Faq";
import ProtectedRoute from "./protected.route";
import RequireAuth from "./require-auth.route";
import AuthLayout from "../components/layouts/AuthLayout";
import AdminLayout from "../components/layouts/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Students from "../pages/admin/Students";
import StudentDetails from "../pages/admin/StudentDetails";
import AddStudent from "../pages/admin/AddStudent";
import Groups from "../pages/admin/Groups";
import GroupDetails from "../pages/admin/GroupDetails";
import CreateGroup from "../pages/admin/CreateGroup";
import Attendance from "../pages/admin/Attendance";
import Schedule from "../pages/admin/Schedule";
import CourseLesson from "../pages/CourseLesson";

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
            path: "/teachers/:id",
            element: <TeacherDetails />,
          },
          {
            path: "/courses",
            element: <Courses />,
          },
          {
            path: "/courses/:slug",
            element: <CourseDetails />,
          },
          {
            path: "/blog",
            element: <Blog />,
          },
          {
            path: "/blog/:slug",
            element: <BlogDetails />,
          },
          {
            path: "/pricing",
            element: <Pricing />,
          },
          {
            path: "/about",
            element: <About />,
          },
          {
            path: "/faq",
            element: <Faq />,
          },
          {
            path: "/contact",
            element: <Contact />,
          },
        ],
      },
      {
        element: <RequireAuth allowedRoles={["student"]} />,
        children: [
          {
            path: "/dashboard",
            element: <DashboardLayout />,
            children: [
              {
                index: true,
                element: <StudentDashboard />,
              },
              {
                path: "courses",
                element: <MyCourses />,
              },
              {
                path: "results",
                element: <Results />,
              },
              {
                path: "certificates",
                element: <Certificates />,
              },
              {
                path: "profile",
                element: <Profile />,
              },
              {
                path: "payments",
                element: <Payments />,
              },
              {
                path: "settings",
                element: <Settings />,
              },
            ],
          },
        ],
      },
      {
        element: <RequireAuth allowedRoles={["admin", "super_admin"]} />,
        children: [
          {
            path: "/admin",
            element: <AdminLayout />,
            children: [
              {
                index: true,
                element: <AdminDashboard />,
              },
              {
                path: "students",
                element: <Students />,
              },
              {
                path: "students/new",
                element: <AddStudent />,
              },
              {
                path: "students/:id",
                element: <StudentDetails />,
              },
              {
                path: "groups",
                element: <Groups />,
              },
              {
                path: "groups/new",
                element: <CreateGroup />,
              },
              {
                path: "groups/:id",
                element: <GroupDetails />,
              },
              {
                path: "attendance",
                element: <Attendance />,
              },
              {
                path: "schedule",
                element: <Schedule />,
              },
            ],
          },
        ],
      },
      {
        element: <RequireAuth allowedRoles={["student"]} />,
        children: [
          {
            path: "/learn/:courseId",
            element: <CourseLesson />,
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
