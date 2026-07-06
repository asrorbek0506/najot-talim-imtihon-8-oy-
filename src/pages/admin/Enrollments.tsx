import { useState } from "react";
import { useAdminEnrollments } from "../../hooks/api/useAdminFinance";

const statusStyles: Record<string, string> = {
  active: "bg-blue-50 text-blue-600",
  completed: "bg-emerald-50 text-emerald-600",
  cancelled: "bg-red-50 text-red-600",
  refunded: "bg-purple-50 text-purple-600",
};

const statusLabels: Record<string, string> = {
  active: "Faol",
  completed: "Tugallangan",
  cancelled: "Bekor qilingan",
  refunded: "Qaytarilgan",
};

const Enrollments = () => {
  const [status, setStatus] = useState("");
  const { data: enrollments, isLoading } = useAdminEnrollments({
    status: status || undefined,
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Yozilishlar</h1>
          <p className="mt-1 text-sm text-gray-500">
            Jami {enrollments?.length ?? 0} ta yozilish (oxirgi 200 ta)
          </p>
        </div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
        >
          <option value="">Barcha holatlar</option>
          <option value="active">Faol</option>
          <option value="completed">Tugallangan</option>
          <option value="cancelled">Bekor qilingan</option>
          <option value="refunded">Qaytarilgan</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-xs uppercase tracking-wide text-gray-400">
                <th className="px-6 py-3 font-medium">Talaba</th>
                <th className="px-6 py-3 font-medium">Kurs</th>
                <th className="px-6 py-3 font-medium">Progress</th>
                <th className="px-6 py-3 font-medium">Yozilgan sana</th>
                <th className="px-6 py-3 font-medium">Holat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {(enrollments ?? []).map((enr) => (
                <tr key={enr.id} className="transition-colors hover:bg-gray-50">
                  <td className="px-6 py-3.5 font-medium text-gray-900">
                    {enr.student.user.firstName} {enr.student.user.lastName}
                  </td>
                  <td className="px-6 py-3.5 text-gray-600">
                    {enr.course.name}
                  </td>
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-x-2">
                      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-gray-100">
                        <div
                          className="h-full rounded-full bg-blue-500"
                          style={{ width: `${enr.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500">
                        {enr.progress}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-3.5 text-gray-500">
                    {new Date(enr.enrolledAt).toLocaleDateString("uz-UZ")}
                  </td>
                  <td className="px-6 py-3.5">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[enr.status]}`}
                    >
                      {statusLabels[enr.status]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!isLoading && (enrollments?.length ?? 0) === 0 && (
          <p className="py-16 text-center text-sm text-gray-500">
            Hech qanday yozilish topilmadi
          </p>
        )}
      </div>
    </div>
  );
};

export default Enrollments;
