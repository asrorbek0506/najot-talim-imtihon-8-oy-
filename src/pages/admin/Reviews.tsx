import { useState } from "react";
import { toast } from "react-toastify";
import { Icon } from "../../components/ui/Icon";
import {
  useAdminReviews,
  useModerateReview,
} from "../../hooks/api/useAdminFinance";

const statusStyles: Record<string, string> = {
  pending: "bg-orange-50 text-orange-600",
  approved: "bg-emerald-50 text-emerald-600",
  rejected: "bg-red-50 text-red-600",
};

const statusLabels: Record<string, string> = {
  pending: "Kutilmoqda",
  approved: "Tasdiqlangan",
  rejected: "Rad etilgan",
};

const Reviews = () => {
  const [status, setStatus] = useState("pending");
  const [page, setPage] = useState(1);
  const { data, isLoading } = useAdminReviews({
    page,
    limit: 10,
    status: status || undefined,
  });
  const { mutateAsync: moderate, isPending } = useModerateReview();

  const handleModerate = async (
    id: string,
    newStatus: "approved" | "rejected",
  ) => {
    try {
      await moderate({ id, status: newStatus });
      toast.success(
        newStatus === "approved" ? "Sharh tasdiqlandi" : "Sharh rad etildi",
      );
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? "Xatolik yuz berdi");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sharhlar</h1>
          <p className="mt-1 text-sm text-gray-500">
            Jami {data?.total ?? 0} ta sharh
          </p>
        </div>
        <div className="flex items-center gap-x-1 rounded-xl bg-gray-100 p-1">
          {[
            { value: "pending", label: "Kutilmoqda" },
            { value: "approved", label: "Tasdiqlangan" },
            { value: "rejected", label: "Rad etilgan" },
          ].map((s) => (
            <button
              key={s.value}
              onClick={() => {
                setStatus(s.value);
                setPage(1);
              }}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                status === s.value
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {isLoading && <p className="text-sm text-gray-400">Yuklanmoqda...</p>}
        {!isLoading && (data?.items.length ?? 0) === 0 && (
          <p className="rounded-2xl border border-gray-100 bg-white py-16 text-center text-sm text-gray-500">
            Bu holatda sharhlar topilmadi
          </p>
        )}

        {(data?.items ?? []).map((review) => (
          <div
            key={review.id}
            className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-x-3">
                <img
                  src={
                    review.student.user.avatarUrl || "https://i.pravatar.cc/80"
                  }
                  alt={review.student.user.firstName}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {review.student.user.firstName}{" "}
                    {review.student.user.lastName}
                  </p>
                  <p className="text-xs text-gray-400">{review.course.name}</p>
                </div>
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
              <p className="mt-2 text-sm text-gray-600">{review.text}</p>
            )}

            {review.status === "pending" && (
              <div className="mt-4 flex gap-x-2">
                <button
                  onClick={() => handleModerate(review.id, "approved")}
                  disabled={isPending}
                  className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-60"
                >
                  Tasdiqlash
                </button>
                <button
                  onClick={() => handleModerate(review.id, "rejected")}
                  disabled={isPending}
                  className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-60"
                >
                  Rad etish
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {data && data.totalPages > 1 && (
        <div className="flex items-center justify-center gap-x-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-400 disabled:opacity-50"
          >
            <Icon.arrowLeft />
          </button>
          <button
            onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
            disabled={page === data.totalPages}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-400 disabled:opacity-50"
          >
            <Icon.arrowRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default Reviews;
