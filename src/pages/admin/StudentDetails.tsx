import { Link, useParams } from "react-router-dom";
import { Icon } from "../../components/ui/Icon";
import Button from "../../components/ui/Button";
import { getStudentById } from "../../data/admin.data";
import type { StudentStatus } from "../../types/admin.type";

const statusLabels: Record<StudentStatus, string> = {
  active: "Faol",
  inactive: "Faol emas",
  graduated: "Bitirgan",
};

const statusStyles: Record<StudentStatus, string> = {
  active: "bg-emerald-50 text-emerald-600",
  inactive: "bg-red-50 text-red-600",
  graduated: "bg-blue-50 text-blue-600",
};

const StudentDetails = () => {
  const { id } = useParams<{ id: string }>();
  const student = id ? getStudentById(id) : undefined;

  if (!student) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
        <h1 className="text-xl font-bold text-gray-900">Talaba topilmadi</h1>
        <p className="mt-2 text-sm text-gray-500">
          Siz izlagan talaba mavjud emas yoki o'chirilgan bo'lishi mumkin.
        </p>
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
            src={student.avatar}
            alt={student.firstName}
            className="mx-auto h-24 w-24 rounded-full object-cover"
          />
          <h1 className="mt-4 text-lg font-bold text-gray-900">
            {student.firstName} {student.lastName}
          </h1>
          <span
            className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[student.status]}`}
          >
            {statusLabels[student.status]}
          </span>

          <div className="mt-6 grid grid-cols-2 gap-3 border-t border-gray-100 pt-6 text-left">
            <div>
              <p className="text-xs text-gray-400">Guruh</p>
              <p className="text-sm font-semibold text-gray-900">
                {student.groupName}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Qo'shilgan sana</p>
              <p className="text-sm font-semibold text-gray-900">
                {student.joinedAt}
              </p>
            </div>
          </div>

          <div className="mt-6 flex gap-x-2">
            <button className="flex flex-1 items-center justify-center gap-x-2 rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
              <Icon.edit />
              Tahrirlash
            </button>
            <button
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
              Shaxsiy ma'lumotlar
            </h2>
            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-xs text-gray-400">Tug'ilgan sana</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {student.birthDate}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-gray-400">Manzil</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {student.address}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-gray-400">Telefon</dt>
                <dd className="mt-1 text-sm text-gray-900">{student.phone}</dd>
              </div>
              <div>
                <dt className="text-xs text-gray-400">Email</dt>
                <dd className="mt-1 text-sm text-gray-900">{student.email}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-base font-bold text-gray-900">
              Ota-ona / vasiy ma'lumotlari
            </h2>
            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-xs text-gray-400">F.I.Sh</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {student.parentName}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-gray-400">Telefon</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {student.parentPhone}
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-gray-900">
                To'lov holati
              </h2>
              <Icon.creditCard />
            </div>
            <div className="mt-4">
              {student.balanceDue > 0 ? (
                <p className="text-sm text-red-500">
                  Qarzdorlik:{" "}
                  <span className="font-semibold">
                    {student.balanceDue.toLocaleString("uz-UZ")} so'm
                  </span>
                </p>
              ) : (
                <p className="flex items-center gap-x-2 text-sm text-emerald-600">
                  <Icon.checkCircle />
                  Qarzdorlik mavjud emas
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
