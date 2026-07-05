import { Icon } from "../ui/Icon";
import CourseCard from "./CourseCard";
import type { ApiCourseListItem } from "../../types/api/course.type";

interface CoursesGridProps {
  courses: ApiCourseListItem[];
  total: number;
  page: number;
  totalPages: number;
  isLoading?: boolean;
  onPageChange: (page: number) => void;
}

const CoursesGrid = ({
  courses,
  total,
  page,
  totalPages,
  isLoading,
  onPageChange,
}: CoursesGridProps) => {
  if (isLoading) {
    return (
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className="h-80 animate-pulse rounded-2xl border border-gray-100 bg-gray-50"
          />
        ))}
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="mt-16 flex flex-col items-center justify-center text-center">
        <p className="text-lg font-semibold text-gray-900">
          Hech qanday kurs topilmadi
        </p>
        <p className="mt-1 text-sm text-gray-500">
          Boshqa kalit so'z yoki filtr bilan qayta urinib ko'ring.
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="mt-8 text-sm text-gray-500">
        Jami <span className="font-semibold text-gray-900">{total}</span> ta
        kurs topildi
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-x-2">
          <button
            onClick={() => onPageChange(Math.max(1, page - 1))}
            disabled={page === 1}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-400 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Icon.arrowLeft />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                page === p
                  ? "bg-blue-600 text-white"
                  : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => onPageChange(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-400 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Icon.arrowRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default CoursesGrid;
