import { Icon } from "../ui/Icon";
import type { ApiCourseDetail } from "../../types/api/course.type";
import { formatRating, getCategoryLabel } from "../../utils/format";

const CourseInstructor = ({ course }: { course: ApiCourseDetail }) => {
  if (!course.instructor) return null;
  const { instructor } = course;
  const teacherName = `${instructor.firstName} ${instructor.lastName}`;

  return (
    <div>
      <h2 className="text-lg font-bold text-gray-900">O'qituvchi haqida</h2>
      <div className="mt-4 flex flex-col gap-5 rounded-2xl border border-gray-100 p-6 sm:flex-row sm:items-center">
        <img
          src={instructor.avatarUrl || "https://i.pravatar.cc/150"}
          alt={teacherName}
          className="h-20 w-20 shrink-0 rounded-full object-cover"
        />
        <div>
          <p className="text-base font-semibold text-gray-900">{teacherName}</p>
          <p className="mt-1 text-sm font-medium text-blue-600">
            {instructor.specialty || getCategoryLabel(course.category)}
          </p>
          <p className="mt-2 flex items-center gap-x-1.5 text-xs text-gray-500">
            <Icon.star />
            {formatRating(instructor.rating)} reyting
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseInstructor;
