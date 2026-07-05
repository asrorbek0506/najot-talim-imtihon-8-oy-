import { Icon } from "../ui/Icon";
import type { ApiCourseDetail } from "../../types/api/course.type";
import { formatRating } from "../../utils/format";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("uz-UZ", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const CourseReviews = ({ course }: { course: ApiCourseDetail }) => {
  const reviews = course.reviews ?? [];

  if (reviews.length === 0) {
    return (
      <div>
        <h2 className="text-lg font-bold text-gray-900">Sharhlar</h2>
        <p className="mt-3 text-sm text-gray-500">
          Bu kurs uchun hali sharhlar mavjud emas. Birinchi bo'lib fikr
          qoldiring!
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">Sharhlar</h2>
        <span className="flex items-center gap-x-1.5 text-sm text-gray-600">
          <Icon.star />
          <span className="font-semibold text-gray-900">
            {formatRating(course.rating)}
          </span>
          ({course.ratingCount} ta baho)
        </span>
      </div>

      <div className="mt-4 space-y-4">
        {reviews.map((review, index) => (
          <div key={index} className="rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-3">
                <img
                  src={
                    review.student.user.avatarUrl || "https://i.pravatar.cc/100"
                  }
                  alt={review.student.user.firstName}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {review.student.user.firstName}{" "}
                    {review.student.user.lastName}
                  </p>
                  <p className="text-xs text-gray-400">
                    {formatDate(review.createdAt)}
                  </p>
                </div>
              </div>
              <span className="flex items-center gap-x-1 text-xs font-semibold text-gray-900">
                <Icon.star />
                {review.rating}
              </span>
            </div>
            {review.text && (
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                {review.text}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseReviews;
