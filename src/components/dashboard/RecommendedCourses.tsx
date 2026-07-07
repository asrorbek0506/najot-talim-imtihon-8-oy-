import { Link } from "react-router-dom";
import { useCourses } from "../../hooks/api/useCourses";
import { useMyCourses } from "../../hooks/api/useEnrollments";
import { formatPrice, getCategoryLabel } from "../../utils/format";

const RecommendedCourses = () => {
  const { data: enrollments } = useMyCourses();
  const { data, isLoading } = useCourses({ featured: true, limit: 8 });

  const enrolledIds = new Set((enrollments ?? []).map((e) => e.course.id));
  const recommended = (data?.items ?? [])
    .filter((c) => !enrolledIds.has(c.id))
    .slice(0, 4);

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">
          Siz uchun tavsiya etiladi
        </h2>
        <Link
          to="/courses"
          className="text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          Barcha kurslar →
        </Link>
      </div>

      {isLoading ? (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }, (_, i) => (
            <div
              key={i}
              className="h-48 animate-pulse rounded-xl bg-gray-100"
            />
          ))}
        </div>
      ) : recommended.length === 0 ? (
        <p className="mt-6 text-sm text-gray-500">
          Hozircha yangi tavsiyalar yo'q.
        </p>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {recommended.map((course) => (
            <article
              key={course.id}
              className="flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative h-32">
                <img
                  src={course.imageUrl || undefined}
                  alt={course.name}
                  className="h-full w-full object-cover"
                />
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-blue-600 backdrop-blur">
                  {getCategoryLabel(course.category)}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-4">
                <h3 className="text-base font-semibold text-gray-900">
                  {course.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {course.lessonsCount} dars · {formatPrice(course.price)}
                </p>

                <Link
                  to={`/courses/${course.slug}`}
                  className="mt-4 block w-full rounded-lg border border-gray-200 py-2.5 text-center text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  Batafsil
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommendedCourses;
