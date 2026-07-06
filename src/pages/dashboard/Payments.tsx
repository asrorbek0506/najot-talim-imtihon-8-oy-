import { Icon } from "../../components/ui/Icon";
import { useMyCourses } from "../../hooks/api/useEnrollments";
import { getCategoryLabel } from "../../utils/format";

const statusStyles: Record<string, string> = {
  active: "bg-blue-50 text-blue-600",
  completed: "bg-emerald-50 text-emerald-600",
  cancelled: "bg-red-50 text-red-600",
};

const statusLabels: Record<string, string> = {
  active: "Faol",
  completed: "Tugallangan",
  cancelled: "Bekor qilingan",
};

const Payments = () => {
  const { data: enrollments, isLoading } = useMyCourses();
  const courses = enrollments ?? [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Xarid tarixi</h1>
        <p className="mt-1 text-sm text-gray-500">
          Siz sotib olgan barcha kurslar ro'yxati.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900">
            Sotib olingan kurslar
          </h2>
          <span className="flex items-center gap-x-1.5 text-xs text-gray-400">
            <Icon.creditCard />
            Jami {courses.length} ta kurs
          </span>
        </div>

        {isLoading ? (
          <p className="p-6 text-sm text-gray-400">Yuklanmoqda...</p>
        ) : courses.length === 0 ? (
          <p className="p-6 text-sm text-gray-500">
            Hali hech qanday kurs sotib olmagansiz.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-xs uppercase tracking-wide text-gray-400">
                  <th className="px-6 py-3 font-medium">Kurs</th>
                  <th className="px-6 py-3 font-medium">Kategoriya</th>
                  <th className="px-6 py-3 font-medium">Sana</th>
                  <th className="px-6 py-3 font-medium">Holat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {courses.map((enrollment) => (
                  <tr
                    key={enrollment.id}
                    className="transition-colors hover:bg-gray-50"
                  >
                    <td className="px-6 py-3.5 font-medium text-gray-900">
                      {enrollment.course.name}
                    </td>
                    <td className="px-6 py-3.5 text-gray-600">
                      {getCategoryLabel(enrollment.course.category)}
                    </td>
                    <td className="px-6 py-3.5 text-gray-500">
                      {new Date(enrollment.enrolledAt).toLocaleDateString(
                        "uz-UZ",
                      )}
                    </td>
                    <td className="px-6 py-3.5">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[enrollment.status]}`}
                      >
                        {statusLabels[enrollment.status]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="border-t border-gray-100 px-6 py-4 text-xs text-gray-400">
          To'lov summasi va kvitansiya haqida batafsil ma'lumot uchun
          administratsiya bilan bog'laning.
        </p>
      </div>
    </div>
  );
};

export default Payments;
