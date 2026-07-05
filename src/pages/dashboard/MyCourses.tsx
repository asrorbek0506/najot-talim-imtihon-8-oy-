import { useMemo, useState } from "react";
import { Icon } from "../../components/ui/Icon";
import MyCourseCard from "../../components/dashboard/MyCourseCard";
import { useMyCourses } from "../../hooks/api/useEnrollments";

type Tab = "all" | "active" | "completed";

const tabs: { key: Tab; label: string }[] = [
  { key: "all", label: "Barchasi" },
  { key: "active", label: "Faol" },
  { key: "completed", label: "Tugallangan" },
];

const MyCourses = () => {
  const [tab, setTab] = useState<Tab>("all");
  const [search, setSearch] = useState("");
  const { data: enrollments, isLoading } = useMyCourses();

  const filtered = useMemo(() => {
    return (enrollments ?? []).filter((enrollment) => {
      const matchesTab = tab === "all" || enrollment.status === tab;
      const matchesSearch = enrollment.course.name
        .toLowerCase()
        .includes(search.trim().toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [enrollments, tab, search]);

  const activeCount = (enrollments ?? []).filter(
    (e) => e.status === "active",
  ).length;
  const completedCount = (enrollments ?? []).filter(
    (e) => e.status === "completed",
  ).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mening kurslarim</h1>
        <p className="mt-1 text-sm text-gray-500">
          {activeCount} ta faol, {completedCount} ta tugallangan kurs
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-x-1 rounded-xl bg-gray-100 p-1">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                tab === t.key
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <label className="relative block w-full max-w-xs">
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon.search />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Kurs qidirish..."
            className="w-full rounded-lg border border-gray-200 py-2.5 pl-11 pr-4 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </label>
      </div>

      {isLoading ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }, (_, i) => (
            <div
              key={i}
              className="h-64 animate-pulse rounded-xl bg-gray-100"
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white py-16 text-center">
          <p className="text-base font-semibold text-gray-900">
            Hech qanday kurs topilmadi
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Filtr yoki qidiruv so'zini o'zgartirib ko'ring.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((enrollment) => (
            <MyCourseCard key={enrollment.id} enrollment={enrollment} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourses;
