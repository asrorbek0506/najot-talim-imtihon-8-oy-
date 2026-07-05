import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "../../components/ui/Icon";
import { groups, students } from "../../data/admin.data";
import type { StudentStatus } from "../../types/admin.type";

const PAGE_SIZE = 8;

const statusLabels: Record<StudentStatus, string> = {
  active: "Faol",
  inactive: "Faol emas",
  graduated: "Bitirgan",
};

const statusStyles: Record<StudentStatus, string> = {
  active: "bg-emerald-50 text-emerald-600",
  inactive: "bg-red-50 text-red-600",
  graduated: "bg-blue-50 text-blue-600",
};

const Students = () => {
  const [search, setSearch] = useState("");
  const [groupFilter, setGroupFilter] = useState("Barchasi");
  const [statusFilter, setStatusFilter] = useState<"Barchasi" | StudentStatus>(
    "Barchasi",
  );
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return students.filter((student) => {
      const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
      const matchesSearch =
        fullName.includes(search.trim().toLowerCase()) ||
        student.phone.includes(search.trim());
      const matchesGroup =
        groupFilter === "Barchasi" || student.groupName === groupFilter;
      const matchesStatus =
        statusFilter === "Barchasi" || student.status === statusFilter;
      return matchesSearch && matchesGroup && matchesStatus;
    });
  }, [search, groupFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const changeFilter = (fn: () => void) => {
    fn();
    setPage(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Talabalar</h1>
          <p className="mt-1 text-sm text-gray-500">
            Jami {students.length} ta talaba, {filtered.length} tasi
            ko'rsatilmoqda
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

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <label className="relative block w-full max-w-sm">
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon.search />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => changeFilter(() => setSearch(e.target.value))}
            placeholder="Ism yoki telefon raqami..."
            className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-11 pr-4 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </label>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={groupFilter}
            onChange={(e) => changeFilter(() => setGroupFilter(e.target.value))}
            className="rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            <option>Barchasi</option>
            {groups.map((group) => (
              <option key={group.id} value={group.name}>
                {group.name}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) =>
              changeFilter(() =>
                setStatusFilter(e.target.value as "Barchasi" | StudentStatus),
              )
            }
            className="rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            <option value="Barchasi">Barcha holatlar</option>
            <option value="active">Faol</option>
            <option value="inactive">Faol emas</option>
            <option value="graduated">Bitirgan</option>
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-xs uppercase tracking-wide text-gray-400">
                <th className="px-6 py-3 font-medium">Talaba</th>
                <th className="px-6 py-3 font-medium">Guruh</th>
                <th className="px-6 py-3 font-medium">Telefon</th>
                <th className="px-6 py-3 font-medium">Qo'shilgan sana</th>
                <th className="px-6 py-3 font-medium">Qarzdorlik</th>
                <th className="px-6 py-3 font-medium">Holat</th>
                <th className="px-6 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginated.map((student) => (
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
                        src={student.avatar}
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
                    {student.groupName}
                  </td>
                  <td className="px-6 py-3.5 text-gray-600">{student.phone}</td>
                  <td className="px-6 py-3.5 text-gray-500">
                    {student.joinedAt}
                  </td>
                  <td className="px-6 py-3.5">
                    {student.balanceDue > 0 ? (
                      <span className="font-medium text-red-500">
                        {student.balanceDue.toLocaleString("uz-UZ")} so'm
                      </span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
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
                      className="text-gray-400 hover:text-gray-700"
                      aria-label="Ko'rish"
                    >
                      <Icon.moreVertical />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {paginated.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-sm font-medium text-gray-900">
              Hech qanday talaba topilmadi
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Filtr yoki qidiruv so'zini o'zgartirib ko'ring.
            </p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4">
            <p className="text-xs text-gray-400">
              {(page - 1) * PAGE_SIZE + 1}-
              {Math.min(page * PAGE_SIZE, filtered.length)} / {filtered.length}
            </p>
            <div className="flex items-center gap-x-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Icon.arrowLeft />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium ${
                    page === p
                      ? "bg-blue-600 text-white"
                      : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
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