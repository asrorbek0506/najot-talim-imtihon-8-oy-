import { Link } from "react-router-dom";
import { Icon } from "../ui/Icon";
import type { MyCourseListItem } from "../../types/api/enrollment.type";

const MyCourseCard = ({ enrollment }: { enrollment: MyCourseListItem }) => {
  const isCompleted = enrollment.status === "completed";
  const course = enrollment.course;
  const instructorName = course.instructor
    ? `${course.instructor.user.firstName} ${course.instructor.user.lastName}`
    : "O'qituvchi";
  const instructorAvatar =
    course.instructor?.user.avatarUrl ?? "https://i.pravatar.cc/40?img=11";
  const completedLessons = Math.round(
    (course.lessonsCount * enrollment.progress) / 100,
  );
  const progressColor = isCompleted ? "bg-emerald-500" : "bg-blue-600";
  const categoryColor = isCompleted ? "text-emerald-600" : "text-blue-600";
  const lastActivity = isCompleted
    ? (enrollment.completedAt ?? enrollment.enrolledAt)
    : enrollment.enrolledAt;

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative h-32">
        <img
          src={
            course.imageUrl ?? "https://via.placeholder.com/400x240?text=Course"
          }
          alt={course.name}
          className="h-full w-full object-cover"
        />
        <span
          className={`absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold backdrop-blur ${categoryColor}`}
        >
          {course.category}
        </span>
        {isCompleted && (
          <span className="absolute right-3 top-3 flex items-center gap-x-1 rounded-full bg-emerald-500 px-2.5 py-1 text-xs font-semibold text-white">
            <Icon.checkCircle />
            Tugallangan
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-base font-semibold text-gray-900">{course.name}</h3>
        <div className="mt-2 flex items-center gap-x-2">
          <img
            src={instructorAvatar}
            alt={instructorName}
            className="h-5 w-5 rounded-full object-cover"
          />
          <span className="text-sm text-gray-500">{instructorName}</span>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">
              {completedLessons} / {course.lessonsCount} dars
            </span>
            <span className="font-semibold text-gray-700">
              {enrollment.progress}%
            </span>
          </div>
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
            <div
              className={`h-full rounded-full ${progressColor}`}
              style={{ width: `${enrollment.progress}%` }}
            />
          </div>
        </div>

        <p className="mt-3 text-xs text-gray-400">
          Oxirgi faollik: {lastActivity}
        </p>

        <div className="mt-4 flex gap-x-2">
          {isCompleted ? (
            <Link
              to="/dashboard/certificates"
              className="flex-1 rounded-lg border border-gray-200 py-2.5 text-center text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              Sertifikatni ko'rish
            </Link>
          ) : (
            <Link
              to={`/learn/${course.id}`}
              className="flex-1 rounded-lg bg-blue-600 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              Davom ettirish
            </Link>
          )}
          <Link
            to={`/courses/${course.id}`}
            className="flex items-center justify-center rounded-lg border border-gray-200 px-3 text-gray-500 transition-colors hover:bg-gray-50"
            aria-label="Kurs haqida"
          >
            <Icon.arrowRight />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default MyCourseCard;
