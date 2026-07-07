import { Icon } from "../ui/Icon";
import { useMyCourses } from "../../hooks/api/useEnrollments";
import { useMyCertificates } from "../../hooks/api/useCertificates";

const DashboardStats = () => {
  const { data: enrollments, isLoading: loadingCourses } = useMyCourses();
  const { data: certificates, isLoading: loadingCerts } = useMyCertificates();

  const courses = enrollments ?? [];
  const activeCount = courses.filter((c) => c.status === "active").length;
  const completedCount = courses.filter((c) => c.status === "completed").length;

  const stats = [
    {
      label: "Jami kurslar",
      value: courses.length,
      icon: "book" as const,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Faol kurslar",
      value: activeCount,
      icon: "play" as const,
      color: "bg-orange-50 text-orange-600",
    },
    {
      label: "Tugallangan",
      value: completedCount,
      icon: "checkSquare" as const,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Sertifikatlar",
      value: certificates?.length ?? 0,
      icon: "award" as const,
      color: "bg-purple-50 text-purple-600",
    },
  ];

  const isLoading = loadingCourses || loadingCerts;

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat) => {
        const IconComponent = Icon[stat.icon];
        return (
          <div
            key={stat.label}
            className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
          >
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.color}`}
            >
              <IconComponent />
            </span>
            <p className="mt-4 text-3xl font-bold text-gray-900">
              {isLoading ? "—" : stat.value}
            </p>
            <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;
