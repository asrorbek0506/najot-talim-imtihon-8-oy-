import { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "../../components/ui/Icon";
import {
  useAdminCourses,
  useDeleteCourse,
} from "../../hooks/api/useAdminCourses";
import {
  formatPrice,
  formatRating,
  getCategoryLabel,
} from "../../utils/format";
import { toast } from "react-toastify";

const statusLabels: Record<string, string> = {
  draft: "Qoralama",
  active: "Faol",
  archived: "Arxivlangan",
};

const statusStyles: Record<string, string> = {
  draft: "bg-gray-100 text-gray-500",
  active: "bg-emerald-50 text-emerald-600",
  archived: "bg-orange-50 text-orange-600",
};

const Courses = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useAdminCourses({
    page,
    limit: 10,
    search: search.trim() || undefined,
    status: status || undefined,
  });
  const { mutateAsync: deleteCourse } = useDeleteCourse();

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`"${name}" kursini rostdan ham o'chirmoqchimisiz?`))
      return;
    try {
      await deleteCourse(id);
      toast.success("Kurs o'chirildi");
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? "Xatolik yuz berdi");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kurslar</h1>
          <p className="mt-1 text-sm text-gray-500">
            Jami {data?.total ?? 0} ta kurs
          </p>
        </div>
        <Link
          to="/admin/courses/new"
          className="flex items-center justify-center gap-x-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          <Icon.plus />
          Yangi kurs
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
            placeholder="Kurs nomini qidiring..."
            className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-11 pr-4 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </label>
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          className="rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
        >
          <option value="">Barcha holatlar</option>
          <option value="draft">Qoralama</option>
          <option value="active">Faol</option>
          <option value="archived">Arxivlangan</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-xs uppercase tracking-wide text-gray-400">
                <th className="px-6 py-3 font-medium">Kurs</th>
                <th className="px-6 py-3 font-medium">Kategoriya</th>
                <th className="px-6 py-3 font-medium">Narx</th>
                <th className="px-6 py-3 font-medium">Talabalar</th>
                <th className="px-6 py-3 font-medium">Reyting</th>
                <th className="px-6 py-3 font-medium">Holat</th>
                <th className="px-6 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {(data?.items ?? []).map((course) => (
                <tr
                  key={course.id}
                  className="transition-colors hover:bg-gray-50"
                >
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-x-3">
                      <img
                        src={course.imageUrl || undefined}
                        alt={course.name}
                        className="h-10 w-14 rounded-lg object-cover bg-gray-100"
                      />
                      <p className="font-medium text-gray-900">{course.name}</p>
                    </div>
                  </td>
                  <td className="px-6 py-3.5 text-gray-600">
                    {getCategoryLabel(course.category)}
                  </td>
                  <td className="px-6 py-3.5 text-gray-600">
                    {formatPrice(course.price)}
                  </td>
                  <td className="px-6 py-3.5 text-gray-600">
                    {course.studentsCount}
                  </td>
                  <td className="px-6 py-3.5 text-gray-600">
                    <span className="flex items-center gap-x-1">
                      <Icon.star />
                      {formatRating(course.rating)}
                    </span>
                  </td>
                  <td className="px-6 py-3.5">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[course.status]}`}
                    >
                      {statusLabels[course.status]}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-x-3">
                      <Link
                        to={`/admin/courses/${course.id}/edit`}
                        className="text-gray-400 hover:text-blue-600"
                        aria-label="Tahrirlash"
                      >
                        <Icon.edit />
                      </Link>
                      <button
                        onClick={() => handleDelete(course.id, course.name)}
                        className="text-gray-400 hover:text-red-500"
                        aria-label="O'chirish"
                      >
                        <Icon.trash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!isLoading && (data?.items.length ?? 0) === 0 && (
          <p className="py-16 text-center text-sm text-gray-500">
            Hech qanday kurs topilmadi
          </p>
        )}

        {data && data.totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4">
            <p className="text-xs text-gray-400">
              {data.page} / {data.totalPages} sahifa
            </p>
            <div className="flex items-center gap-x-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-400 disabled:opacity-50"
              >
                <Icon.arrowLeft />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
                disabled={page === data.totalPages}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-400 disabled:opacity-50"
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

export default Courses;
