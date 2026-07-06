import { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "../../components/ui/Icon";
import { useAdminStudents } from "../../hooks/api/useAdminStudents";
import type { AdminStudentStatus } from "../../types/api/admin-people.type";

const statusLabels: Record<AdminStudentStatus, string> = {
  active: "Faol",
  inactive: "Faol emas",
  graduated: "Bitirgan",
};

const statusStyles: Record<AdminStudentStatus, string> = {
  active: "bg-emerald-50 text-emerald-600",
  inactive: "bg-red-50 text-red-600",
  graduated: "bg-blue-50 text-blue-600",
};

const Students = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"" | AdminStudentStatus>("");
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching } = useAdminStudents({
    page,
    limit: 10,
    search: search.trim() || undefined,
    status: status || undefined,
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Talabalar</h1>
          <p className="mt-1 text-sm text-gray-500">
            Jami {data?.total ?? 0} ta talaba ro'yxatdan o'tgan
          </p>
        </div>
        <Link
          to="/admin/students/new"
          className="flex items-center justify-center gap-x-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          <Icon.plus />
          Yangi talaba
        </Link>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative block w-full max-w-sm">
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon.search />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Ism, email yoki telefon..."
            className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-11 pr-4 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </label>

        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value as "" | AdminStudentStatus);
            setPage(1);
          }}
          className="rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
        >
          <option value="">Barcha holatlar</option>
          <option value="active">Faol</option>
          <option value="inactive">Faol emas</option>
          <option value="graduated">Bitirgan</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-xs uppercase tracking-wide text-gray-400">
                <th className="px-6 py-3 font-medium">Talaba</th>
                <th className="px-6 py-3 font-medium">ID</th>
                <th className="px-6 py-3 font-medium">Telefon</th>
                <th className="px-6 py-3 font-medium">Qo'shilgan sana</th>
                <th className="px-6 py-3 font-medium">Kurslar</th>
                <th className="px-6 py-3 font-medium">Holat</th>
                <th className="px-6 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {(data?.items ?? []).map((student) => (
                <tr
                  key={student.id}
                  className="transition-colors hover:bg-gray-50"
                >
                  <td className="px-6 py-3.5">
                    <Link
                      to={`/admin/students/${student.id}`}
                      className="flex items-center gap-x-3"
                    >
                      <img
                        src={student.avatarUrl || "https://i.pravatar.cc/60"}
                        alt={student.firstName}
                        className="h-9 w-9 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900">
                          {student.firstName} {student.lastName}
                        </p>
                        <p className="text-xs text-gray-400">{student.email}</p>
                      </div>
                    </Link>
                  </td>
                  <td className="px-6 py-3.5 text-gray-600">
                    {student.studentId}
                  </td>
                  <td className="px-6 py-3.5 text-gray-600">{student.phone}</td>
                  <td className="px-6 py-3.5 text-gray-500">
                    {new Date(student.enrolledAt).toLocaleDateString("uz-UZ")}
                  </td>
                  <td className="px-6 py-3.5 text-gray-600">
                    {student._count?.enrollments ?? 0}
                  </td>
                  <td className="px-6 py-3.5">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[student.status]}`}
                    >
                      {statusLabels[student.status]}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 text-right">
                    <Link
                      to={`/admin/students/${student.id}`}
                      className="text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                      Ko'rish
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!isLoading && (data?.items.length ?? 0) === 0 && (
          <div className="py-16 text-center">
            <p className="text-sm font-medium text-gray-900">
              Hech qanday talaba topilmadi
            </p>
          </div>
        )}

        {data && data.totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4">
            <p className="text-xs text-gray-400">
              {data.page} / {data.totalPages} sahifa · {data.total} ta yozuv
            </p>
            <div className="flex items-center gap-x-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1 || isFetching}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Icon.arrowLeft />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
                disabled={page === data.totalPages || isFetching}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Icon.arrowRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Students;
