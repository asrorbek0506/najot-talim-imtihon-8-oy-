import { Link } from "react-router-dom";
import { Icon } from "../../components/ui/Icon";
import MiniBarChart from "../../components/admin/MiniBarChart";
import {
  adminStats,
  recentPayments,
  revenueTrend,
  scheduleSlots,
  studentFlow,
  topStudents,
} from "../../data/admin.data";

const dayNames = [
  "Yakshanba",
  "Dushanba",
  "Seshanba",
  "Chorshanba",
  "Payshanba",
  "Juma",
  "Shanba",
];

const AdminDashboard = () => {
  const today = dayNames[new Date().getDay()];
  const todaySlots = scheduleSlots
    .filter((slot) => slot.day === today)
    .slice(0, 4);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Salom, Anvar! 👋</h1>
        <p className="mt-1 text-sm text-gray-500">
          Bugungi kunda o'quv markazingiz bilan tanishing.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {adminStats.map((stat) => {
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
              <div className="mt-1 flex items-center justify-between">
                <p className="text-sm text-gray-500">{stat.label}</p>
                <span
                  className={`flex items-center gap-x-1 text-xs font-semibold ${
                    stat.changeType === "up"
                      ? "text-emerald-600"
                      : "text-red-500"
                  }`}
                >
                  <Icon.trendingUp />
                  {stat.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-900">
              Daromad dinamikasi
            </h2>
            <span className="text-xs text-gray-400">Oxirgi 6 oy, mln so'm</span>
          </div>
          <div className="mt-6">
            <MiniBarChart data={revenueTrend} color="bg-blue-500" />
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-900">
              Talabalar oqimi
            </h2>
            <span className="text-xs text-gray-400">Oxirgi 6 oy</span>
          </div>
          <div className="mt-6">
            <MiniBarChart data={studentFlow} color="bg-emerald-500" />
          </div>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-900">
              Eng yaxshi talabalar
            </h2>
            <Link
              to="/admin/students"
              className="text-xs font-medium text-blue-600 hover:text-blue-700"
            >
              Barchasi
            </Link>
          </div>
          <div className="mt-4 divide-y divide-gray-100">
            {topStudents.map((student, index) => (
              <div
                key={student.name}
                className="flex items-center gap-x-3 py-3"
              >
                <span className="w-5 text-sm font-semibold text-gray-400">
                  {index + 1}
                </span>
                <img
                  src={student.avatar}
                  alt={student.name}
                  className="h-9 w-9 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {student.name}
                  </p>
                  <p className="text-xs text-gray-400">{student.group}</p>
                </div>
                <span className="text-sm font-semibold text-emerald-600">
                  {student.score}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-900">
              Bugungi darslar
            </h2>
            <Icon.calendar />
          </div>
          <div className="mt-4 space-y-3">
            {todaySlots.length === 0 ? (
              <p className="text-sm text-gray-400">
                Bugun darslar rejalashtirilmagan.
              </p>
            ) : (
              todaySlots.map((slot) => (
                <div
                  key={slot.groupName + slot.time}
                  className="rounded-xl border border-gray-100 p-3"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`rounded-md px-2 py-0.5 text-xs font-semibold ${slot.color}`}
                    >
                      {slot.groupName}
                    </span>
                    <span className="text-xs text-gray-400">{slot.time}</span>
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    {slot.teacher} · {slot.room}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 p-6">
          <h2 className="text-base font-bold text-gray-900">
            So'nggi to'lovlar
          </h2>
          <Link
            to="/admin/students"
            className="text-xs font-medium text-blue-600 hover:text-blue-700"
          >
            Barchasi
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-xs uppercase tracking-wide text-gray-400">
                <th className="px-6 py-3 font-medium">Talaba</th>
                <th className="px-6 py-3 font-medium">Summa</th>
                <th className="px-6 py-3 font-medium">Sana</th>
                <th className="px-6 py-3 font-medium">Holat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentPayments.map((payment) => (
                <tr key={payment.name + payment.date}>
                  <td className="flex items-center gap-x-3 px-6 py-3.5">
                    <img
                      src={payment.avatar}
                      alt={payment.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <span className="font-medium text-gray-900">
                      {payment.name}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 text-gray-700">
                    {payment.amount}
                  </td>
                  <td className="px-6 py-3.5 text-gray-500">{payment.date}</td>
                  <td className="px-6 py-3.5">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                        payment.status === "paid"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-orange-50 text-orange-600"
                      }`}
                    >
                      {payment.status === "paid" ? "To'landi" : "Kutilmoqda"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
