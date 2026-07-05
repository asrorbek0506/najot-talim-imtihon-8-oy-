import { Icon } from "../ui/Icon";
import TeacherCard from "../ui/TeacherCard";
import type { ApiInstructorListItem } from "../../types/api/instructor.type";

interface TeachersGridProps {
  teachers: ApiInstructorListItem[];
  page: number;
  totalPages: number;
  isLoading?: boolean;
  onPageChange: (page: number) => void;
}

const TeachersGrid = ({
  teachers,
  page,
  totalPages,
  isLoading,
  onPageChange,
}: TeachersGridProps) => {
  if (isLoading) {
    return (
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="h-56 animate-pulse rounded-2xl bg-gray-100" />
        ))}
      </div>
    );
  }

  if (teachers.length === 0) {
    return (
      <div className="mt-16 flex flex-col items-center justify-center text-center">
        <p className="text-lg font-semibold text-gray-900">
          Hech qanday o'qituvchi topilmadi
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {teachers.map((teacher) => (
          <TeacherCard key={teacher.id} teacher={teacher} />
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

export default TeachersGrid;
