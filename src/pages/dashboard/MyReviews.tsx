import { Link } from "react-router-dom";
import { Icon } from "../../components/ui/Icon";
import { useMyReviews } from "../../hooks/api/useReviews";

const statusStyles: Record<string, string> = {
  pending: "bg-orange-50 text-orange-600",
  approved: "bg-emerald-50 text-emerald-600",
  rejected: "bg-red-50 text-red-600",
};

const statusLabels: Record<string, string> = {
  pending: "Moderatsiyada",
  approved: "Chop etilgan",
  rejected: "Rad etilgan",
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("uz-UZ", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const MyReviews = () => {
  const { data: reviews, isLoading } = useMyReviews();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mening sharhlarim</h1>
        <p className="mt-1 text-sm text-gray-500">
          Siz kurslarga qoldirgan barcha sharhlar va ularning holati.
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }, (_, i) => (
            <div
              key={i}
              className="h-28 animate-pulse rounded-2xl bg-gray-100"
            />
          ))}
        </div>
      ) : !reviews || reviews.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white py-16 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-yellow-50 text-yellow-600">
            <Icon.star />
          </span>
          <p className="mt-4 text-base font-semibold text-gray-900">
            Hali hech qanday sharh qoldirmagansiz
          </p>
          <p className="mt-1 max-w-xs text-sm text-gray-500">
            Kurs darslarini ko'rayotganda, video dars sahifasidan sharh
            qoldirishingiz mumkin.
          </p>
          <Link
            to="/dashboard/courses"
            className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            Kurslarimga o'tish
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {review.course.name}
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    {formatDate(review.createdAt)}
                  </p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[review.status]}`}
                >
                  {statusLabels[review.status]}
                </span>
              </div>

              <div className="mt-3 flex items-center gap-x-0.5">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Icon.star key={i} />
                ))}
              </div>

              {review.text && (
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {review.text}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReviews;
