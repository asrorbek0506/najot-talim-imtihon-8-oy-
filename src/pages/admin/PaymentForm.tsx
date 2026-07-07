import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { Icon } from "../../components/ui/Icon";
import { useAdminStudents } from "../../hooks/api/useAdminStudents";
import { useAdminCourses } from "../../hooks/api/useAdminCourses";
import { useCreatePayment } from "../../hooks/api/useAdminFinance";
import { cleanEmptyStrings } from "../../utils/clean-payload";
import type { CreatePaymentPayload } from "../../types/api/admin-finance.type";

const PaymentForm = () => {
  const navigate = useNavigate();
  const { data: students } = useAdminStudents({ limit: 100 });
  const { data: courses } = useAdminCourses({ limit: 100, status: "active" });
  const { mutateAsync: createPayment, isPending } = useCreatePayment();

  const form = useForm<CreatePaymentPayload>({
    defaultValues: { method: "payme", status: "paid" },
  });
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const selectedCourseId = watch("courseId");

  useEffect(() => {
    const course = (courses?.items ?? []).find(
      (c) => c.id === selectedCourseId,
    );
    if (course) {
      setValue("amount", Number(course.price));
    }
  }, [selectedCourseId, courses, setValue]);

  const onSubmit = async (values: CreatePaymentPayload) => {
    try {
      const payload = cleanEmptyStrings({
        ...values,
        amount: Number(values.amount),
      });
      await createPayment(payload);
      toast.success("To'lov muvaffaqiyatli qo'shildi");
      navigate("/admin/payments");
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? "Xatolik yuz berdi");
    }
  };

  return (
    <div className="space-y-6">
      <Link
        to="/admin/payments"
        className="flex w-fit items-center gap-x-2 text-sm font-medium text-gray-600 hover:text-gray-900"
      >
        <Icon.arrowLeft />
        To'lovlar ro'yxati
      </Link>

      <h1 className="text-2xl font-bold text-gray-900">
        Qo'lda to'lov qo'shish
      </h1>
      <p className="-mt-4 text-sm text-gray-500">
        Naqd yoki bank orqali qabul qilingan to'lovlarni shu yerda qayd eting.
      </p>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-2xl space-y-6"
        noValidate
      >
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Talaba <span className="text-red-500">*</span>
              </label>
              <select
                {...register("studentId", { required: "Talabani tanlang" })}
                className="mt-1.5 w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option value="">Tanlang</option>
                {(students?.items ?? []).map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.firstName} {student.lastName} ({student.studentId})
                  </option>
                ))}
              </select>
              {errors.studentId && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.studentId.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Kurs <span className="text-red-500">*</span>
              </label>
              <select
                {...register("courseId", { required: "Kursni tanlang" })}
                className="mt-1.5 w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option value="">Tanlang</option>
                {(courses?.items ?? []).map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
              </select>
              {errors.courseId && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.courseId.message}
                </p>
              )}
            </div>

            <Input
              name="amount"
              type="number"
              form={form}
              placeholder="690000"
              label="Summa (so'm)"
              required
              error={errors.amount?.message}
              rules={{ required: "Summani kiriting" }}
            />

            <div>
              <label className="text-sm font-medium text-gray-700">
                To'lov usuli
              </label>
              <select
                {...register("method")}
                className="mt-1.5 w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option value="payme">Payme</option>
                <option value="click">Click</option>
                <option value="card">Karta</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Holat</label>
              <select
                {...register("status")}
                className="mt-1.5 w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option value="paid">To'landi</option>
                <option value="pending">Kutilmoqda</option>
                <option value="failed">Amalga oshmadi</option>
              </select>
            </div>

            <Input
              name="transactionId"
              type="text"
              form={form}
              placeholder="Ixtiyoriy"
              label="Tranzaksiya ID"
            />
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium text-gray-700">Izoh</label>
            <textarea
              {...register("notes")}
              rows={3}
              placeholder="Masalan: naqd pulda qabul qilindi"
              className="mt-1.5 w-full resize-none rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        <div className="flex gap-x-3">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saqlanmoqda..." : "To'lovni qo'shish"}
          </Button>
          <Link to="/admin/payments">
            <button
              type="button"
              className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              Bekor qilish
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
