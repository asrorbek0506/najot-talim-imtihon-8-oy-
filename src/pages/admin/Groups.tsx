import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "../../components/ui/Icon";
import { groups } from "../../data/admin.data";
import type { GroupStatus } from "../../types/admin.type";

const statusLabels: Record<GroupStatus, string> = {
  active: "Faol",
  upcoming: "Boshlanadi",
  completed: "Tugallangan",
};

const statusStyles: Record<GroupStatus, string> = {
  active: "bg-emerald-50 text-emerald-600",
  upcoming: "bg-orange-50 text-orange-600",
  completed: "bg-gray-100 text-gray-500",
};

const Groups = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"Barchasi" | GroupStatus>(
    "Barchasi",
  );

  const filtered = useMemo(() => {
    return groups.filter((group) => {
      const matchesSearch = group.name
        .toLowerCase()
        .includes(search.trim().toLowerCase());
      const matchesStatus =
        statusFilter === "Barchasi" || group.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Guruhlar</h1>
          <p className="mt-1 text-sm text-gray-500">
            Jami {groups.length} ta guruh, {filtered.length} tasi ko'rsatilmoqda
          </p>
        </div>
        <Link
          to="/admin/groups/new"
          className="flex items-center justify-center gap-x-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          <Icon.plus />
          Yangi guruh yaratish
        </Link>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative block w-full max-w-sm">
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon.search />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Guruh nomini qidiring..."
            className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-11 pr-4 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </label>

        <div className="flex items-center gap-x-1 rounded-xl bg-gray-100 p-1">
          {(["Barchasi", "active", "upcoming", "completed"] as const).map(
            (status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  statusFilter === status
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {status === "Barchasi" ? "Barchasi" : statusLabels[status]}
              </button>
            ),
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white py-16 text-center">
          <p className="text-base font-semibold text-gray-900">
            Hech qanday guruh topilmadi
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((group) => (
            <Link
              key={group.id}
              to={`/admin/groups/${group.id}`}
              className="block rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${group.color}`}
                >
                  {group.name}
                </span>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[group.status]}`}
                >
                  {statusLabels[group.status]}
                </span>
              </div>

              <h3 className="mt-4 text-base font-semibold text-gray-900">
                {group.courseName}
              </h3>

              <div className="mt-3 flex items-center gap-x-2.5">
                <img
                  src={group.teacherPhoto}
                  alt={group.teacher}
                  className="h-6 w-6 rounded-full object-cover"
                />
                <span className="text-sm text-gray-500">{group.teacher}</span>
              </div>

              <div className="mt-4 space-y-2 border-t border-gray-100 pt-4 text-xs text-gray-500">
                <p className="flex items-center gap-x-2">
                  <Icon.calendar />
                  {group.days} · {group.time}
                </p>
                <p className="flex items-center gap-x-2">
                  <Icon.location />
                  {group.room}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-x-2 text-xs text-gray-500">
                  <Icon.users />
                  {group.studentsCount}/{group.maxStudents} talaba
                </div>
                <div className="h-1.5 w-24 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-blue-500"
                    style={{
                      width: `${Math.min(100, (group.studentsCount / group.maxStudents) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Groups;
