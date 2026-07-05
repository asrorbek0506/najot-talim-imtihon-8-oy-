import { Link, useParams } from "react-router-dom";
import { Icon } from "../../components/ui/Icon";
import Button from "../../components/ui/Button";
import { getGroupById, getStudentsByGroup } from "../../data/admin.data";
import type { GroupStatus } from "../../types/admin.type";

const statusLabels: Record<GroupStatus, string> = {
  active: "Faol",
  upcoming: "Boshlanadi",
  completed: "Tugallangan",
};

const GroupDetails = () => {
  const { id } = useParams<{ id: string }>();
  const group = id ? getGroupById(id) : undefined;
  const members = group ? getStudentsByGroup(group.id) : [];

  if (!group) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
        <h1 className="text-xl font-bold text-gray-900">Guruh topilmadi</h1>
        <Link to="/admin/groups" className="mt-6">
          <Button>Guruhlar ro'yxatiga qaytish</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        to="/admin/groups"
        className="flex w-fit items-center gap-x-2 text-sm font-medium text-gray-600 hover:text-gray-900"
      >
        <Icon.arrowLeft />
        Guruhlar ro'yxati
      </Link>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-x-3">
              <h1 className="text-xl font-bold text-gray-900">{group.name}</h1>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${group.color}`}
              >
                {group.courseName}
              </span>
            </div>
            <div className="mt-3 flex items-center gap-x-2.5">
              <img
                src={group.teacherPhoto}
                alt={group.teacher}
                className="h-7 w-7 rounded-full object-cover"
              />
              <span className="text-sm text-gray-600">{group.teacher}</span>
            </div>
          </div>
          <div className="flex gap-x-2">
            <button className="flex items-center gap-x-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
              <Icon.edit />
              Tahrirlash
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 border-t border-gray-100 pt-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xs text-gray-400">Holat</p>
            <p className="mt-1 text-sm font-semibold text-gray-900">
              {statusLabels[group.status]}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Dars kunlari</p>
            <p className="mt-1 text-sm font-semibold text-gray-900">
              {group.days}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Vaqti</p>
            <p className="mt-1 text-sm font-semibold text-gray-900">
              {group.time}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Xona</p>
            <p className="mt-1 text-sm font-semibold text-gray-900">
              {group.room}
            </p>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-100 pt-6">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-gray-700">
              To'ldirilganlik: {group.studentsCount}/{group.maxStudents}
            </span>
            <span className="text-gray-400">
              Boshlangan sana: {group.startDate}
            </span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-blue-500"
              style={{
                width: `${Math.min(100, (group.studentsCount / group.maxStudents) * 100)}%`,
              }}
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 p-6">
          <h2 className="text-base font-bold text-gray-900">
            Guruh a'zolari ({members.length})
          </h2>
          <Link
            to="/admin/students/new"
            className="flex items-center gap-x-2 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            <Icon.plus />
            Talaba qo'shish
          </Link>
        </div>

        {members.length === 0 ? (
          <p className="p-6 text-sm text-gray-500">
            Bu guruhga hali talaba biriktirilmagan.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-xs uppercase tracking-wide text-gray-400">
                  <th className="px-6 py-3 font-medium">Talaba</th>
                  <th className="px-6 py-3 font-medium">Telefon</th>
                  <th className="px-6 py-3 font-medium">Qo'shilgan sana</th>
                  <th className="px-6 py-3 font-medium">Qarzdorlik</th>
                  <th className="px-6 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {members.map((student) => (
                  <tr
                    key={student.id}
                    className="transition-colors hover:bg-gray-50"
                  >
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-x-3">
                        <img
                          src={student.avatar}
                          alt={student.firstName}
                          className="h-8 w-8 rounded-full object-cover"
                        />
                        <span className="font-medium text-gray-900">
                          {student.firstName} {student.lastName}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-3.5 text-gray-600">
                      {student.phone}
                    </td>
                    <td className="px-6 py-3.5 text-gray-500">
                      {student.joinedAt}
                    </td>
                    <td className="px-6 py-3.5">
                      {student.balanceDue > 0 ? (
                        <span className="font-medium text-red-500">
                          {student.balanceDue.toLocaleString("uz-UZ")} so'm
                        </span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-3.5 text-right">
                      <Link
                        to={`/admin/students/${student.id}`}
                        className="text-sm font-medium text-blue-600 hover:text-blue-700"
                      >
                        Ko'rish
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupDetails;
