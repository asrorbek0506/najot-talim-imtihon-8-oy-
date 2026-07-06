import { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "../../components/ui/Icon";
import { useAdminInstructors } from "../../hooks/api/useAdminInstructors";
import { formatRating } from "../../utils/format";

const Instructors = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useAdminInstructors({
    page,
    limit: 10,
    search: search.trim() || undefined,
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">O'qituvchilar</h1>
          <p className="mt-1 text-sm text-gray-500">
            Jami {data?.total ?? 0} ta o'qituvchi
          </p>
        </div>
        <Link
          to="/admin/instructors/new"
          className="flex items-center justify-center gap-x-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          <Icon.plus />
          Yangi o'qituvchi
        </Link>
      </div>

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
          placeholder="Ism yoki mutaxassislik..."
          className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-11 pr-4 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
        />
      </label>

      {isLoading ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className="h-40 animate-pulse rounded-2xl bg-gray-100"
            />
          ))}
        </div>
      ) : (data?.items.length ?? 0) === 0 ? (
        <p className="py-16 text-center text-sm text-gray-500">
          Hech qanday o'qituvchi topilmadi
        </p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {(data?.items ?? []).map((instructor) => (
            <Link
              key={instructor.id}
              to={`/admin/instructors/${instructor.id}`}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-center gap-x-3">
                <img
                  src={instructor.avatarUrl || "https://i.pravatar.cc/80"}
                  alt={instructor.firstName}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {instructor.firstName} {instructor.lastName}
                  </p>
                  <p className="text-xs text-blue-600">
                    {instructor.specialty}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4 text-xs text-gray-500">
                <span className="flex items-center gap-x-1">
                  <Icon.star />
                  {formatRating(instructor.rating)}
                </span>
                <span>{instructor._count?.courses ?? 0} ta kurs</span>
                <span
                  className={`rounded-full px-2 py-0.5 font-medium ${
                    instructor.status === "active"
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {instructor.status === "active" ? "Faol" : "Faol emas"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {data && data.totalPages > 1 && (
        <div className="flex items-center justify-center gap-x-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-400 disabled:opacity-50"
          >
            <Icon.arrowLeft />
          </button>
          <button
            onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
            disabled={page === data.totalPages}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-400 disabled:opacity-50"
          >
            <Icon.arrowRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default Instructors;
