import { Icon } from "../../components/ui/Icon";
import { useMyCourses } from "../../hooks/api/useEnrollments";

const barColor = (progress: number) => {
  if (progress >= 85) return "bg-emerald-500";
  if (progress >= 40) return "bg-blue-500";
  return "bg-orange-400";
};

const scoreColor = (progress: number) => {
  if (progress >= 85) return "text-emerald-600 bg-emerald-50";
  if (progress >= 40) return "text-blue-600 bg-blue-50";
  return "text-orange-600 bg-orange-50";
};

const Results = () => {
  const { data: enrollments, isLoading } = useMyCourses();

  const courses = enrollments ?? [];
  const completedCount = courses.filter((c) => c.status === "completed").length;
  const overallAverage = courses.length
    ? Math.round(
        courses.reduce((sum, c) => sum + c.progress, 0) / courses.length,
      )
    : 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Progress</h1>
        <p className="mt-1 text-sm text-gray-500">
          Barcha kurslaringiz bo'yicha o'zlashtirish darajangiz.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Icon.barChart />
          </span>
          <p className="mt-4 text-2xl font-bold text-gray-900">
            {overallAverage}%
          </p>
          <p className="mt-1 text-sm text-gray-500">O'rtacha progress</p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <Icon.checkSquare />
          </span>
          <p className="mt-4 text-2xl font-bold text-gray-900">
            {completedCount} / {courses.length}
          </p>
          <p className="mt-1 text-sm text-gray-500">Tugallangan kurslar</p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
            <Icon.award />
          </span>
          <p className="mt-4 text-2xl font-bold text-gray-900">
            {courses.length}
          </p>
          <p className="mt-1 text-sm text-gray-500">Jami yozilgan kurslar</p>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900">
          Kurslar bo'yicha progress
        </h2>

        {isLoading ? (
          <p className="mt-4 text-sm text-gray-400">Yuklanmoqda...</p>
        ) : courses.length === 0 ? (
          <p className="mt-4 text-sm text-gray-500">
            Hali hech qanday kursga yozilmagansiz.
          </p>
        ) : (
          <div className="mt-5 space-y-5">
            {courses.map((enrollment) => (
              <div
                key={enrollment.id}
                className="border-b border-gray-100 pb-5 last:border-0 last:pb-0"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {enrollment.course.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {enrollment.status === "completed"
                        ? "Tugallangan"
                        : "Faol"}{" "}
                      · {enrollment.course.lessonsCount} dars
                    </p>
                  </div>
                  <span
                    className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold ${scoreColor(
                      enrollment.progress,
                    )}`}
                  >
                    {enrollment.progress}%
                  </span>
                </div>
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-gray-100">
                  <div
                    className={`h-full rounded-full ${barColor(enrollment.progress)}`}
                    style={{ width: `${enrollment.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Results;
