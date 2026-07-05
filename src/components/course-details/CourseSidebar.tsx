import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../ui/Button";
import { Icon } from "../ui/Icon";
import useUserStore from "../../store/user.store";
import { useCheckout } from "../../hooks/api/useEnrollments";
import type { ApiCourseDetail } from "../../types/api/course.type";
import type { PaymentMethod } from "../../types/api/enrollment.type";
import {
  courseLevelLabels,
  formatDurationMonths,
  formatPrice,
} from "../../utils/format";

const paymentMethods: { value: PaymentMethod; label: string }[] = [
  { value: "payme", label: "Payme" },
  { value: "click", label: "Click" },
  { value: "card", label: "Karta" },
];

const CourseSidebar = ({ course }: { course: ApiCourseDetail }) => {
  const navigate = useNavigate();
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const [method, setMethod] = useState<PaymentMethod>("payme");
  const { mutateAsync, isPending } = useCheckout();

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      toast.info("Kursga yozilish uchun avval tizimga kiring");
      navigate("/login");
      return;
    }
    try {
      const result = await mutateAsync({ courseId: course.id, method });
      toast.success("Kursga muvaffaqiyatli yozildingiz!");
      navigate(`/learn/${result.enrollment.course.id}`);
    } catch (error: any) {
      const message =
        error?.response?.data?.message ??
        "Xatolik yuz berdi, qayta urinib ko'ring";
      toast.error(message);
    }
  };

  return (
    <aside className="lg:sticky lg:top-24">
      <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
        <img
          src={course.imageUrl || undefined}
          alt={course.name}
          className="h-44 w-full object-cover"
        />
        <div className="p-6">
          <div className="flex items-center gap-x-2">
            <span className="text-2xl font-bold text-gray-900">
              {formatPrice(course.price)}
            </span>
            {course.oldPrice && (
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(course.oldPrice)}
              </span>
            )}
          </div>

          <div className="mt-4 flex gap-x-2">
            {paymentMethods.map((m) => (
              <button
                key={m.value}
                onClick={() => setMethod(m.value)}
                className={`flex-1 rounded-lg border px-2 py-2 text-xs font-medium transition-colors ${
                  method === m.value
                    ? "border-blue-600 bg-blue-50 text-blue-600"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          <Button
            fullWidth
            className="mt-4"
            onClick={handleEnroll}
            disabled={isPending}
          >
            {isPending ? "Yuklanmoqda..." : "Kursga yozilish"}
          </Button>

          <ul className="mt-6 space-y-3 border-t border-gray-100 pt-6 text-sm text-gray-600">
            <li className="flex items-center gap-x-2.5">
              <Icon.video />
              {course.lessonsCount} ta video dars
            </li>
            <li className="flex items-center gap-x-2.5">
              <Icon.clock />
              {formatDurationMonths(course.durationMonths)} davomiyligi
            </li>
            <li className="flex items-center gap-x-2.5">
              <Icon.graduationCap />
              {courseLevelLabels[course.level]} daraja
            </li>
            <li className="flex items-center gap-x-2.5">
              <Icon.award />
              Kurs oxirida sertifikat
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default CourseSidebar;
