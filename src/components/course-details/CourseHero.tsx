import { Link } from "react-router-dom";
import { Icon } from "../ui/Icon";
import type { ApiCourseDetail } from "../../types/api/course.type";
import {
  courseLevelLabels,
  formatDurationMonths,
  formatRating,
  getCategoryLabel,
} from "../../utils/format";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=60";

const CourseHero = ({ course }: { course: ApiCourseDetail }) => {
  const teacherName = course.instructor
    ? `${course.instructor.firstName} ${course.instructor.lastName}`
    : "Belgilanmagan";

  return (
    <section className="bg-linear-to-b from-slate-900 to-slate-800 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-x-2 text-sm text-slate-300">
          <Link to="/" className="hover:text-white">
            Bosh sahifa
          </Link>
          <span className="text-slate-500">›</span>
          <Link to="/courses" className="hover:text-white">
            Kurslar
          </Link>
          <span className="text-slate-500">›</span>
          <span className="font-medium text-white">{course.name}</span>
        </nav>

        <div className="mt-6 grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-medium text-blue-300">
              {getCategoryLabel(course.category)}
            </span>
            <h1 className="mt-4 text-3xl font-bold sm:text-4xl">
              {course.name}
            </h1>
            <p className="mt-4 max-w-2xl text-slate-300">
              {course.description}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-300">
              <span className="flex items-center gap-x-1.5">
                <Icon.star />
                <span className="font-semibold text-white">
                  {formatRating(course.rating)}
                </span>
                ({course.ratingCount} sharh)
              </span>
              <span className="flex items-center gap-x-1.5">
                <Icon.users />
                {course.studentsCount} talaba
              </span>
              <span className="flex items-center gap-x-1.5">
                <Icon.clock />
                {formatDurationMonths(course.durationMonths)}
              </span>
              <span className="flex items-center gap-x-1.5">
                <Icon.graduationCap />
                {courseLevelLabels[course.level]}
              </span>
            </div>

            <div className="mt-6 flex items-center gap-x-3">
              <img
                src={
                  course.instructor?.avatarUrl || "https://i.pravatar.cc/100"
                }
                alt={teacherName}
                className="h-11 w-11 rounded-full object-cover"
              />
              <div>
                <p className="text-sm text-slate-400">O'qituvchi</p>
                <p className="text-sm font-semibold text-white">
                  {teacherName}
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl">
            <img
              src={course.imageUrl || FALLBACK_IMAGE}
              alt={course.name}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseHero;
