import { Link } from "react-router-dom";
import { Icon } from "../ui/Icon";
import { useMyCourses } from "../../hooks/api/useEnrollments";

const ContinueBanner = () => {
  const { data: enrollments, isLoading } = useMyCourses();

  const current = (enrollments ?? [])
    .filter((e) => e.status === "active")
    .sort((a, b) => b.progress - a.progress)[0];

  if (isLoading) {
    return <div className="h-44 animate-pulse rounded-2xl bg-gray-100" />;
  }

  if (!current) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-medium text-gray-900">
          Hali faol kursingiz yo'q
        </p>
        <Link
          to="/courses"
          className="mt-3 inline-flex items-center gap-x-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Kurslarni ko'rish
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm sm:flex-row">
      <div className="relative h-44 shrink-0 sm:h-auto sm:w-64">
        <img
          src={current.course.imageUrl || undefined}
          alt={current.course.name}
          className="h-full w-full object-cover"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-blue-600 backdrop-blur">
          Davom etmoqda
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-center p-6">
        <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">
          O'qishni davom ettiring
        </span>
        <h2 className="mt-2 text-xl font-bold text-gray-900">
          {current.course.name}
        </h2>

        <div className="mt-5">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-gray-700">Kurs progressi</span>
            <span className="font-semibold text-blue-600">
              {current.progress}%
            </span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-blue-600"
              style={{ width: `${current.progress}%` }}
            />
          </div>
        </div>

        <div className="mt-5">
          <Link
            to={`/learn/${current.course.id}`}
            className="inline-flex items-center gap-x-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            <Icon.play />
            Darsni davom ettirish
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContinueBanner;
