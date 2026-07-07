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
import Enroll from "../pages/Enroll";
import ProtectedRoute from "./protected.route";
import RequireAuth from "./require-auth.route";
import AuthLayout from "../components/layouts/AuthLayout";
import AdminLayout from "../components/layouts/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminStudents from "../pages/admin/Students";
import AdminStudentDetails from "../pages/admin/StudentDetails";
import AdminStudentForm from "../pages/admin/StudentForm";
import AdminInstructors from "../pages/admin/Instructors";
import AdminInstructorForm from "../pages/admin/InstructorForm";
import AdminInstructorDetails from "../pages/admin/InstructorDetails";
import AdminCourses from "../pages/admin/Courses";
import AdminCourseForm from "../pages/admin/CourseForm";
import AdminPayments from "../pages/admin/Payments";
import AdminPaymentDetails from "../pages/admin/PaymentDetails";
import AdminPaymentForm from "../pages/admin/PaymentForm";
import AdminEnrollments from "../pages/admin/Enrollments";
import AdminCertificates from "../pages/admin/Certificates";
import AdminReviews from "../pages/admin/Reviews";
import AdminBlogPosts from "../pages/admin/BlogPosts";
import AdminBlogPostForm from "../pages/admin/BlogPostForm";
import AdminBlogComments from "../pages/admin/BlogComments";
import AdminContact from "../pages/admin/Contact";
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
