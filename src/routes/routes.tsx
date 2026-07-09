import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import RootLayout from "../components/layouts/RootLayout";
import DashboardLayout from "../components/layouts/DashboardLayout";
import Login from "../pages/Login";
import Contact from "../pages/Contact";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import VerifyEmail from "../pages/VerifyEmail";
const StudentDashboard = lazy(() => import("../pages/StudentDashboard"));
const MyCourses = lazy(() => import("../pages/dashboard/MyCourses"));
const Results = lazy(() => import("../pages/dashboard/Results"));
const Certificates = lazy(() => import("../pages/dashboard/Certificates"));
const MyReviews = lazy(() => import("../pages/dashboard/MyReviews"));
const Profile = lazy(() => import("../pages/dashboard/Profile"));
const Payments = lazy(() => import("../pages/dashboard/Payments"));
const Settings = lazy(() => import("../pages/dashboard/Settings"));
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
import Enroll from "../pages/Enroll";
import ProtectedRoute from "./protected.route";
import RequireAuth from "./require-auth.route";
import AuthLayout from "../components/layouts/AuthLayout";
import AdminLayout from "../components/layouts/AdminLayout";
const AdminDashboard = lazy(() => import("../pages/admin/AdminDashboard"));
const AdminStudents = lazy(() => import("../pages/admin/Students"));
const AdminStudentDetails = lazy(() => import("../pages/admin/StudentDetails"));
const AdminStudentForm = lazy(() => import("../pages/admin/StudentForm"));
const AdminInstructors = lazy(() => import("../pages/admin/Instructors"));
const AdminInstructorForm = lazy(() => import("../pages/admin/InstructorForm"));
const AdminInstructorDetails = lazy(
  () => import("../pages/admin/InstructorDetails"),
);
const AdminCourses = lazy(() => import("../pages/admin/Courses"));
const AdminCourseForm = lazy(() => import("../pages/admin/CourseForm"));
const AdminPayments = lazy(() => import("../pages/admin/Payments"));
const AdminPaymentDetails = lazy(() => import("../pages/admin/PaymentDetails"));
const AdminPaymentForm = lazy(() => import("../pages/admin/PaymentForm"));
const AdminEnrollments = lazy(() => import("../pages/admin/Enrollments"));
const AdminCertificates = lazy(() => import("../pages/admin/Certificates"));
const AdminReviews = lazy(() => import("../pages/admin/Reviews"));
const AdminBlogPosts = lazy(() => import("../pages/admin/BlogPosts"));
const AdminBlogPostForm = lazy(() => import("../pages/admin/BlogPostForm"));
const AdminBlogComments = lazy(() => import("../pages/admin/BlogComments"));
const AdminContact = lazy(() => import("../pages/admin/Contact"));
const CourseLesson = lazy(() => import("../pages/CourseLesson"));

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
            path: "/enroll",
            element: <Enroll />,
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
                path: "reviews",
                element: <MyReviews />,
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
                path: "courses",
                element: <AdminCourses />,
              },
              {
                path: "courses/new",
                element: <AdminCourseForm />,
              },
              {
                path: "courses/:id/edit",
                element: <AdminCourseForm />,
              },
              {
                path: "students",
                element: <AdminStudents />,
              },
              {
                path: "students/new",
                element: <AdminStudentForm />,
              },
              {
                path: "students/:id",
                element: <AdminStudentDetails />,
              },
              {
                path: "students/:id/edit",
                element: <AdminStudentForm />,
              },
              {
                path: "instructors",
                element: <AdminInstructors />,
              },
              {
                path: "instructors/new",
                element: <AdminInstructorForm />,
              },
              {
                path: "instructors/:id",
                element: <AdminInstructorDetails />,
              },
              {
                path: "instructors/:id/edit",
                element: <AdminInstructorForm />,
              },
              {
                path: "payments",
                element: <AdminPayments />,
              },
              {
                path: "payments/new",
                element: <AdminPaymentForm />,
              },
              {
                path: "payments/:id",
                element: <AdminPaymentDetails />,
              },
              {
                path: "enrollments",
                element: <AdminEnrollments />,
              },
              {
                path: "certificates",
                element: <AdminCertificates />,
              },
              {
                path: "reviews",
                element: <AdminReviews />,
              },
              {
                path: "blog",
                element: <AdminBlogPosts />,
              },
              {
                path: "blog/new",
                element: <AdminBlogPostForm />,
              },
              {
                path: "blog/comments",
                element: <AdminBlogComments />,
              },
              {
                path: "blog/:id/edit",
                element: <AdminBlogPostForm />,
              },
              {
                path: "contact",
                element: <AdminContact />,
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
            element: (
              <Suspense
                fallback={
                  <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-400">
                    Yuklanmoqda...
                  </div>
                }
              >
                <CourseLesson />
              </Suspense>
            ),
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
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/verify-email",
    element: <VerifyEmail />,
  },
]);
export default routes;
