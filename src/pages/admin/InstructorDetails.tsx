import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Icon } from "../../components/ui/Icon";
import Button from "../../components/ui/Button";
import {
  useAdminInstructor,
  useDeleteInstructor,
} from "../../hooks/api/useAdminInstructors";
import { formatRating } from "../../utils/format";

const InstructorDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: instructor, isLoading } = useAdminInstructor(id);
  const { mutateAsync: deleteInstructor, isPending } = useDeleteInstructor();

  const handleDelete = async () => {
    if (!id) return;
    if (!window.confirm("O'qituvchini rostdan ham o'chirmoqchimisiz?")) return;
    try {
      await deleteInstructor(id);
      toast.success("O'qituvchi o'chirildi");
      navigate("/admin/instructors");
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? "Xatolik yuz berdi");
    }
  };

  if (isLoading) {
    return (
      <div className="animate-pulse text-sm text-gray-400">Yuklanmoqda...</div>
    );
  }

  if (!instructor) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
        <h1 className="text-xl font-bold text-gray-900">
          O'qituvchi topilmadi
        </h1>
        <Link to="/admin/instructors" className="mt-6">
          <Button>Ro'yxatga qaytish</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        to="/admin/instructors"
        className="flex w-fit items-center gap-x-2 text-sm font-medium text-gray-600 hover:text-gray-900"
      >
        <Icon.arrowLeft />
        O'qituvchilar ro'yxati
      </Link>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm lg:col-span-1">
          <img
            src={instructor.avatarUrl || "https://i.pravatar.cc/150"}
            alt={instructor.firstName}
            className="mx-auto h-24 w-24 rounded-full object-cover"
          />
          <h1 className="mt-4 text-lg font-bold text-gray-900">
            {instructor.firstName} {instructor.lastName}
          </h1>
          <p className="text-sm text-blue-600">{instructor.specialty}</p>

          <div className="mt-6 grid grid-cols-2 gap-3 border-t border-gray-100 pt-6 text-left">
            <div>
              <p className="text-xs text-gray-400">Reyting</p>
              <p className="flex items-center gap-x-1 text-sm font-semibold text-gray-900">
                <Icon.star />
                {formatRating(instructor.rating)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Tajriba</p>
              <p className="text-sm font-semibold text-gray-900">
                {instructor.experience} yil
              </p>
            </div>
          </div>

          <div className="mt-6 flex gap-x-2">
            <Link
              to={`/admin/instructors/${instructor.id}/edit`}
              className="flex flex-1 items-center justify-center gap-x-2 rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              <Icon.edit />
              Tahrirlash
            </Link>
            <button
              onClick={handleDelete}
              disabled={isPending}
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
                <dd className="mt-1 text-sm text-gray-900">
                  {instructor.email}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-gray-400">Telefon</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {instructor.phone}
                </dd>
              </div>
            </dl>
            {instructor.bio && (
              <div className="mt-4">
                <dt className="text-xs text-gray-400">Bio</dt>
                <dd className="mt-1 text-sm text-gray-700">{instructor.bio}</dd>
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-base font-bold text-gray-900">
              Kurslari ({instructor.courses?.length ?? 0})
            </h2>
            <div className="mt-4 space-y-3">
              {(instructor.courses ?? []).length === 0 && (
                <p className="text-sm text-gray-400">Faol kurslari yo'q.</p>
              )}
              {(instructor.courses ?? []).map((course) => (
                <Link
                  key={course.id}
                  to={`/admin/courses/${course.id}/edit`}
                  className="flex items-center justify-between rounded-xl border border-gray-100 p-4 transition-colors hover:bg-gray-50"
                >
                  <p className="text-sm font-medium text-gray-900">
                    {course.name}
                  </p>
                  <span className="flex items-center gap-x-1 text-xs text-gray-500">
                    <Icon.star />
                    {formatRating(course.rating)}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorDetails;
