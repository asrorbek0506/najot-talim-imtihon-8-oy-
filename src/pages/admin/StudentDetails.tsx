import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Icon } from "../../components/ui/Icon";
import Button from "../../components/ui/Button";
import {
  useAdminStudent,
  useAdminStudentEnrollments,
  useAdminStudentPayments,
  useDeleteStudent,
} from "../../hooks/api/useAdminStudents";
import { formatPrice } from "../../utils/format";

type Tab = "enrollments" | "payments";

const StudentDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("enrollments");

  const { data: student, isLoading } = useAdminStudent(id);
  const { data: enrollments } = useAdminStudentEnrollments(id);
  const { data: payments } = useAdminStudentPayments(id);
  const { mutateAsync: deleteStudent, isPending: isDeleting } =
    useDeleteStudent();

  const handleDelete = async () => {
    if (!id) return;
    if (!window.confirm("Talabani rostdan ham o'chirmoqchimisiz?")) return;
    try {
      await deleteStudent(id);
      toast.success("Talaba o'chirildi");
      navigate("/admin/students");
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? "Xatolik yuz berdi");
    }
  };

  if (isLoading) {
    return (
      <div className="animate-pulse text-sm text-gray-400">Yuklanmoqda...</div>
    );
  }

  if (!student) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
        <h1 className="text-xl font-bold text-gray-900">Talaba topilmadi</h1>
        <Link to="/admin/students" className="mt-6">
          <Button>Talabalar ro'yxatiga qaytish</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        to="/admin/students"
        className="flex w-fit items-center gap-x-2 text-sm font-medium text-gray-600 hover:text-gray-900"
      >
        <Icon.arrowLeft />
        Talabalar ro'yxati
      </Link>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm lg:col-span-1">
          <img
            src={student.avatarUrl || "https://i.pravatar.cc/150"}
            alt={student.firstName}
            className="mx-auto h-24 w-24 rounded-full object-cover"
          />
          <h1 className="mt-4 text-lg font-bold text-gray-900">
            {student.firstName} {student.lastName}
          </h1>
          <p className="text-sm text-gray-500">{student.studentId}</p>

          <div className="mt-6 grid grid-cols-2 gap-3 border-t border-gray-100 pt-6 text-left">
            <div>
              <p className="text-xs text-gray-400">Qo'shilgan sana</p>
              <p className="text-sm font-semibold text-gray-900">
                {new Date(student.enrolledAt).toLocaleDateString("uz-UZ")}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Kurslar soni</p>
              <p className="text-sm font-semibold text-gray-900">
                {student._count?.enrollments ?? 0}
              </p>
            </div>
          </div>

          <div className="mt-6 flex gap-x-2">
            <Link
              to={`/admin/students/${student.id}/edit`}
              className="flex flex-1 items-center justify-center gap-x-2 rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              <Icon.edit />
              Tahrirlash
            </Link>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex items-center justify-center rounded-lg border border-red-100 px-3 text-red-500 transition-colors hover:bg-red-50"
              aria-label="O'chirish"
            >
              <Icon.trash />
            </button>
          </div>
        </div>

        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-base font-bold text-gray-900">
              Aloqa ma'lumotlari
            </h2>
            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-xs text-gray-400">Email</dt>
                <dd className="mt-1 text-sm text-gray-900">{student.email}</dd>
              </div>
              <div>
                <dt className="text-xs text-gray-400">Telefon</dt>
                <dd className="mt-1 text-sm text-gray-900">{student.phone}</dd>
              </div>
              <div>
                <dt className="text-xs text-gray-400">Tug'ilgan sana</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {student.birthDate ?? "—"}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-gray-400">Manzil</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {student.address ?? "—"}
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="flex items-center gap-x-1 border-b border-gray-100 p-4">
              <button
                onClick={() => setTab("enrollments")}
                className={`rounded-lg px-4 py-2 text-sm font-medium ${
                  tab === "enrollments"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                Kurslari
              </button>
              <button
                onClick={() => setTab("payments")}
                className={`rounded-lg px-4 py-2 text-sm font-medium ${
                  tab === "payments"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                To'lovlari
              </button>
            </div>

            <div className="p-6">
              {tab === "enrollments" ? (
                <div className="space-y-3">
                  {(enrollments as any[])?.length === 0 && (
                    <p className="text-sm text-gray-400">
                      Hali hech qanday kursga yozilmagan.
                    </p>
                  )}
                  {(enrollments as any[])?.map((enr) => (
                    <div
                      key={enr.id}
                      className="flex items-center justify-between rounded-xl border border-gray-100 p-4"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {enr.course?.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {new Date(enr.enrolledAt).toLocaleDateString("uz-UZ")}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900">
                          {enr.progress}%
                        </p>
                        <p className="text-xs text-gray-400">{enr.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {payments && (
                    <p className="mb-2 text-sm text-gray-600">
                      Jami to'langan:{" "}
                      <span className="font-semibold text-gray-900">
                        {formatPrice(payments.stats.totalPaid)}
                      </span>
                    </p>
                  )}
                  {(payments?.items ?? []).length === 0 && (
                    <p className="text-sm text-gray-400">
                      Hali to'lovlar mavjud emas.
                    </p>
                  )}
                  {(payments?.items ?? []).map((p: any) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between rounded-xl border border-gray-100 p-4"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {p.course?.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {new Date(p.createdAt).toLocaleDateString("uz-UZ")} ·{" "}
                          {p.method}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900">
                          {formatPrice(p.amount)}
                        </p>
                        <p className="text-xs text-gray-400">{p.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
