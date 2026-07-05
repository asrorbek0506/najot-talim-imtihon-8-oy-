import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import Button from "../../components/ui/Button";
import { attendanceToday, groups } from "../../data/admin.data";
import type { AttendanceStatus } from "../../types/admin.type";

const statusConfig: Record<
  AttendanceStatus,
  { label: string; badge: string; dot: string }
> = {
  present: {
    label: "Keldi",
    badge: "bg-emerald-50 text-emerald-600",
    dot: "bg-emerald-500",
  },
  absent: {
    label: "Kelmadi",
    badge: "bg-red-50 text-red-600",
    dot: "bg-red-500",
  },
  late: {
    label: "Kechikdi",
    badge: "bg-orange-50 text-orange-600",
    dot: "bg-orange-500",
  },
  excused: {
    label: "Sababli",
    badge: "bg-blue-50 text-blue-600",
    dot: "bg-blue-500",
  },
};

const statusOrder: AttendanceStatus[] = [
  "present",
  "late",
  "absent",
  "excused",
];

const Attendance = () => {
  const [groupFilter, setGroupFilter] = useState("Barchasi");
  const [records, setRecords] = useState(attendanceToday);

  const filtered = useMemo(
    () =>
      records.filter(
        (record) =>
          groupFilter === "Barchasi" || record.groupName === groupFilter,
      ),
    [records, groupFilter],
  );

  const updateStatus = (studentId: string, status: AttendanceStatus) => {
    setRecords((prev) =>
      prev.map((record) =>
        record.studentId === studentId ? { ...record, status } : record,
      ),
    );
  };

  const presentCount = records.filter((r) => r.status === "present").length;
  const lateCount = records.filter((r) => r.status === "late").length;
  const absentCount = records.filter((r) => r.status === "absent").length;
  const attendanceRate = Math.round(
    ((presentCount + lateCount) / records.length) * 100,
  );

  const handleSave = () => {
    toast.success("Davomat muvaffaqiyatli saqlandi");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Davomat</h1>
          <p className="mt-1 text-sm text-gray-500">
            Bugungi kun uchun talabalar davomatini belgilang.
          </p>
        </div>
        <Button onClick={handleSave}>Saqlash</Button>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <p className="text-2xl font-bold text-gray-900">{attendanceRate}%</p>
          <p className="mt-1 text-sm text-gray-500">Umumiy davomat</p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <p className="text-2xl font-bold text-emerald-600">
            {presentCount}/{records.length}
          </p>
          <p className="mt-1 text-sm text-gray-500">Keldi</p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <p className="text-2xl font-bold text-orange-500">{lateCount}</p>
          <p className="mt-1 text-sm text-gray-500">Kechikdi</p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <p className="text-2xl font-bold text-red-500">{absentCount}</p>
          <p className="mt-1 text-sm text-gray-500">Kelmadi</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {[
          "Barchasi",
          ...groups.filter((g) => g.status === "active").map((g) => g.name),
        ].map((name) => (
          <button
            key={name}
            onClick={() => setGroupFilter(name)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              groupFilter === name
                ? "bg-blue-600 text-white"
                : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-xs uppercase tracking-wide text-gray-400">
                <th className="px-6 py-3 font-medium">Talaba</th>
                <th className="px-6 py-3 font-medium">Guruh</th>
                <th className="px-6 py-3 font-medium">Holat</th>
                <th className="px-6 py-3 font-medium text-right">Belgilash</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((record) => (
                <tr
                  key={record.studentId}
                  className="transition-colors hover:bg-gray-50"
                >
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-x-3">
                      <img
                        src={record.avatar}
                        alt={record.studentName}
                        className="h-9 w-9 rounded-full object-cover"
                      />
                      <span className="font-medium text-gray-900">
                        {record.studentName}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-3.5 text-gray-600">
                    {record.groupName}
                  </td>
                  <td className="px-6 py-3.5">
                    <span
                      className={`inline-flex items-center gap-x-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${statusConfig[record.status].badge}`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${statusConfig[record.status].dot}`}
                      />
                      {statusConfig[record.status].label}
                    </span>
                  </td>
                  <td className="px-6 py-3.5">
                    <div className="flex items-center justify-end gap-x-1.5">
                      {statusOrder.map((status) => (
                        <button
                          key={status}
                          onClick={() => updateStatus(record.studentId, status)}
                          title={statusConfig[status].label}
                          className={`h-7 w-7 rounded-full transition-all ${
                            statusConfig[status].dot
                          } ${
                            record.status === status
                              ? "ring-2 ring-offset-2 ring-gray-400"
                              : "opacity-30 hover:opacity-60"
                          }`}
                        />
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center text-sm text-gray-500">
            Bu guruh uchun bugungi davomat topilmadi.
          </div>
        )}
      </div>
    </div>
  );
};

export default Attendance;
