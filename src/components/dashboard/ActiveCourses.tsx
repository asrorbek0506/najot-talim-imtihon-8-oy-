import { Link } from "react-router-dom";
import { useMyCourses } from "../../hooks/api/useEnrollments";
import { getCategoryLabel } from "../../utils/format";

const progressColor = (progress: number) => {
  if (progress >= 85) return "bg-emerald-500";
  if (progress >= 40) return "bg-blue-600";
  return "bg-orange-400";
};

const ActiveCourses = () => {
  const { data: enrollments, isLoading } = useMyCourses();
  const active = (enrollments ?? []).filter((e) => e.status === "active");

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">
          Faol online kurslarim
        </h2>
        <Link
          to="/dashboard/courses"
          className="text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          Hammasi →
        </Link>
      </div>

      {isLoading ? (
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {Array.from({ length: 2 }, (_, i) => (
            <div
              key={i}
              className="h-64 animate-pulse rounded-xl bg-gray-100"
            />
          ))}
        </div>
      ) : active.length === 0 ? (
        <p className="mt-6 text-sm text-gray-500">
          Hozircha faol kursingiz yo'q. Katalogdan kurs tanlab yozilib ko'ring.
        </p>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {active.map((enrollment) => {
            const teacher = enrollment.course.instructor?.user;
            return (
              <article
                key={enrollment.id}
                className="flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative h-32">
                  <img
                    src={enrollment.course.imageUrl || undefined}
                    alt={enrollment.course.name}
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-blue-600 backdrop-blur">
                    {getCategoryLabel(enrollment.course.category)}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <h3 className="text-base font-semibold text-gray-900">
                    {enrollment.course.name}
                  </h3>
                  {teacher && (
                    <div className="mt-2 flex items-center gap-x-2">
                      <img
                        src={teacher.avatarUrl || "https://i.pravatar.cc/40"}
                        alt={teacher.firstName}
                        className="h-5 w-5 rounded-full object-cover"
                      />
                      <span className="text-sm text-gray-500">
                        {teacher.firstName} {teacher.lastName}
                      </span>
                    </div>
                  )}

                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">
                        {enrollment.course.lessonsCount} dars
                      </span>
                      <span className="font-semibold text-gray-700">
                        {enrollment.progress}%
                      </span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                      <div
                        className={`h-full rounded-full ${progressColor(enrollment.progress)}`}
                        style={{ width: `${enrollment.progress}%` }}
                      />
                    </div>
                  </div>

                  <Link
                    to={`/learn/${enrollment.course.id}`}
                    className="mt-4 block w-full rounded-lg bg-blue-600 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-blue-700"
                  >
                    Davom ettirish
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ActiveCourses;
