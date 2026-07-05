import { Link } from "react-router-dom";
import { Icon } from "../ui/Icon";
import type { ApiCourseListItem } from "../../types/api/course.type";
import {
  formatPrice,
  formatRating,
  getCategoryLabel,
} from "../../utils/format";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=60";

const CourseCard = ({ course }: { course: ApiCourseListItem }) => {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-lg">
      <Link to={`/courses/${course.slug}`} className="block">
        <img
          src={course.imageUrl || FALLBACK_IMAGE}
          alt={course.name}
          className="h-40 w-full object-cover"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600">
            {getCategoryLabel(course.category)}
          </span>
          <span className="flex items-center gap-x-1 text-xs text-gray-500">
            <Icon.star />
            <span className="font-semibold text-gray-900">
              {formatRating(course.rating)}
            </span>
            ({course.ratingCount})
          </span>
        </div>

        <Link to={`/courses/${course.slug}`}>
          <h3 className="mt-3 text-base font-semibold transition-colors hover:text-blue-600">
            {course.name}
          </h3>
        </Link>

        <p className="mt-2 flex-1 text-xs leading-relaxed text-gray-500">
          {course.description}
        </p>

        <p className="mt-4 flex items-center gap-x-2 border-b border-gray-100 pb-4 text-xs text-gray-500">
          <Icon.users />
          {course.studentsCount} talaba · {course.lessonsCount} dars
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <span className="text-base font-bold">
              {formatPrice(course.price)}
            </span>
            {course.oldPrice && (
              <span className="text-xs text-gray-400 line-through">
                {formatPrice(course.oldPrice)}
              </span>
            )}
          </div>
          <Link
            to={`/courses/${course.slug}`}
            className="rounded-lg bg-blue-600 px-3.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-700"
          >
            Batafsil
          </Link>
        </div>
      </div>
    </article>
  );
};

export default CourseCard;
