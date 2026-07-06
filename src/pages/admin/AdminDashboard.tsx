import { Link } from "react-router-dom";
import { Icon } from "../../components/ui/Icon";
import useUserStore from "../../store/user.store";
import { useAdminStudents } from "../../hooks/api/useAdminStudents";
import { useAdminInstructors } from "../../hooks/api/useAdminInstructors";
import { useAdminCourses } from "../../hooks/api/useAdminCourses";
import {
  useAdminPayments,
  useAdminReviews,
} from "../../hooks/api/useAdminFinance";
import { useAdminContact } from "../../hooks/api/useAdminContent";
import { formatPrice } from "../../utils/format";

const AdminDashboard = () => {
  const user = useUserStore((state) => state.user);
  const { data: students } = useAdminStudents({ limit: 1 });
  const { data: instructors } = useAdminInstructors({ limit: 1 });
  const { data: courses } = useAdminCourses({ limit: 1, status: "active" });
  const { data: payments } = useAdminPayments({ limit: 6 });
  const { data: pendingReviews } = useAdminReviews({
    limit: 1,
    status: "pending",
  });
  const { data: newMessages } = useAdminContact({ limit: 1, status: "new" });

  const stats = [
    {
      label: "Jami talabalar",
      value: students?.total ?? "—",
      icon: "users" as const,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Faol kurslar",
      value: courses?.total ?? "—",
      icon: "book" as const,
      color: "bg-purple-50 text-purple-600",
    },
    {
      label: "O'qituvchilar",
      value: instructors?.total ?? "—",
      icon: "graduationCap" as const,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Moderatsiya kutmoqda",
      value: (pendingReviews?.total ?? 0) + (newMessages?.total ?? 0),
      icon: "alertCircle" as const,
      color: "bg-orange-50 text-orange-600",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Salom, {user?.firstName ?? "Admin"}! 👋
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Bugungi kunda o'quv markazingiz bilan tanishing.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const IconComponent = Icon[stat.icon];
          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
            >
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.color}`}
              >
                <IconComponent />
              </span>
              <p className="mt-4 text-2xl font-bold text-gray-900">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-900">
              So'nggi to'lovlar
            </h2>
            <Link
              to="/admin/payments"
              className="text-xs font-medium text-blue-600 hover:text-blue-700"
            >
              Barchasi
            </Link>
          </div>
          <div className="mt-4 divide-y divide-gray-100">
            {(payments?.items ?? []).length === 0 && (
              <p className="py-4 text-sm text-gray-400">Hali to'lovlar yo'q.</p>
            )}
            {(payments?.items ?? []).map((payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between py-3"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {payment.student.user.firstName}{" "}
                    {payment.student.user.lastName}
                  </p>
                  <p className="text-xs text-gray-400">{payment.course.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    {formatPrice(payment.amount)}
                  </p>
                  <span
                    className={`text-xs font-medium ${
                      payment.status === "paid"
                        ? "text-emerald-600"
                        : "text-orange-500"
                    }`}
                  >
                    {payment.status === "paid" ? "To'landi" : payment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <Link
            to="/admin/reviews"
            className="block rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600">
                <Icon.star />
              </span>
              <span className="text-2xl font-bold text-gray-900">
                {pendingReviews?.total ?? 0}
              </span>
            </div>
            <p className="mt-3 text-sm font-medium text-gray-700">
              Moderatsiya kutayotgan sharhlar
            </p>
          </Link>

          <Link
            to="/admin/contact"
            className="block rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                <Icon.mail />
              </span>
              <span className="text-2xl font-bold text-gray-900">
                {newMessages?.total ?? 0}
              </span>
            </div>
            <p className="mt-3 text-sm font-medium text-gray-700">
              Yangi murojaatlar
            </p>
          </Link>

          <Link
            to="/admin/courses/new"
            className="flex items-center justify-center gap-x-2 rounded-2xl border-2 border-dashed border-gray-200 p-6 text-sm font-medium text-gray-500 transition-colors hover:border-blue-300 hover:text-blue-600"
          >
            <Icon.plus />
            Yangi kurs qo'shish
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

