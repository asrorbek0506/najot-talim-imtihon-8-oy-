import { Icon } from "../../components/ui/Icon";
import { courseResults } from "../../data/dashboard.data";

const overallAverage = Math.round(
  courseResults.reduce((sum, r) => sum + r.averageScore, 0) /
    courseResults.length,
);
const totalTestsCompleted = courseResults.reduce(
  (sum, r) => sum + r.testsCompleted,
  0,
);
const totalTests = courseResults.reduce((sum, r) => sum + r.totalTests, 0);
const bestResult = [...courseResults].sort(
  (a, b) => b.averageScore - a.averageScore,
)[0];

const scoreColor = (score: number) => {
  if (score >= 85) return "text-emerald-600 bg-emerald-50";
  if (score >= 70) return "text-blue-600 bg-blue-50";
  return "text-orange-600 bg-orange-50";
};

const barColor = (score: number) => {
  if (score >= 85) return "bg-emerald-500";
  if (score >= 70) return "bg-blue-500";
  return "bg-orange-400";
};

const Results = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Natijalarim</h1>
        <p className="mt-1 text-sm text-gray-500">
          Barcha kurslar bo'yicha test va topshiriq natijalaringiz.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Icon.barChart />
          </span>
          <p className="mt-4 text-2xl font-bold text-gray-900">
            {overallAverage}%
          </p>
          <p className="mt-1 text-sm text-gray-500">O'rtacha natija</p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <Icon.checkSquare />
          </span>
          <p className="mt-4 text-2xl font-bold text-gray-900">
            {totalTestsCompleted} / {totalTests}
          </p>
          <p className="mt-1 text-sm text-gray-500">Topshirilgan testlar</p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
            <Icon.trendingUp />
          </span>
          <p className="mt-4 truncate text-2xl font-bold text-gray-900">
            {bestResult.averageScore}%
          </p>
          <p className="mt-1 truncate text-sm text-gray-500">
            Eng yaxshi natija — {bestResult.course}
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900">
          Kurslar bo'yicha natijalar
        </h2>

        <div className="mt-5 space-y-5">
          {courseResults.map((result) => (
            <div
              key={result.id}
              className="border-b border-gray-100 pb-5 last:border-0 last:pb-0"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {result.course}
                  </p>
                  <p className="text-xs text-gray-500">
                    {result.teacher} · {result.testsCompleted}/
                    {result.totalTests} test · oxirgi: {result.lastTestDate}
                  </p>
                </div>
                <span
                  className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold ${scoreColor(
                    result.averageScore,
                  )}`}
                >
                  {result.averageScore}%
                </span>
              </div>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  className={`h-full rounded-full ${barColor(result.averageScore)}`}
                  style={{ width: `${result.averageScore}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Results;
