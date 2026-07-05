import { usePublicStats } from "../../hooks/api/usePublicContent";
import type { PublicStats } from "../../types/api/stats.type";

const statMeta: { key: keyof PublicStats; label: string; color: string }[] = [
  {
    key: "students",
    label: "Faol talabalar",
    color: "bg-blue-50 text-blue-600",
  },
  {
    key: "graduates",
    label: "Bitiruvchilar",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    key: "instructors",
    label: "O'qituvchilar",
    color: "bg-purple-50 text-purple-600",
  },
  {
    key: "courses",
    label: "Faol kurslar",
    color: "bg-orange-50 text-orange-600",
  },
];

const Stats = () => {
  const { data, isLoading } = usePublicStats();

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 gap-6 rounded-2xl border border-gray-100 bg-white p-8 shadow-lg shadow-gray-100/80 lg:grid-cols-4">
        {statMeta.map((stat) => (
          <div key={stat.key} className="flex items-center gap-x-4">
            <span
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-lg font-bold ${stat.color}`}
            >
              ◆
            </span>
            <div>
              <p className="text-2xl font-bold">
                {isLoading ? "—" : `${data?.[stat.key] ?? 0}+`}
              </p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;
