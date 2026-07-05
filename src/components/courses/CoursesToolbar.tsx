import { Icon } from "../ui/Icon";
import { courseCategoryOptions, courseLevelLabels } from "../../utils/format";
import type { ApiCourseLevel } from "../../types/api/course.type";

export type SortOption = "popular" | "priceAsc" | "priceDesc" | "rating";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "popular", label: "Mashhurligi bo'yicha" },
  { value: "priceAsc", label: "Arzonidan qimmatiga" },
  { value: "priceDesc", label: "Qimmatidan arzoniga" },
  { value: "rating", label: "Reytingi bo'yicha" },
];

interface CoursesToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  level: ApiCourseLevel | "";
  onLevelChange: (value: ApiCourseLevel | "") => void;
  sort: SortOption;
  onSortChange: (value: SortOption) => void;
}

const CoursesToolbar = ({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  level,
  onLevelChange,
  sort,
  onSortChange,
}: CoursesToolbarProps) => {
  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <label className="relative block w-full max-w-sm">
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon.search />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Kurs nomini qidiring..."
            className="w-full rounded-lg border border-gray-200 py-2.5 pl-11 pr-4 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </label>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={level}
            onChange={(e) =>
              onLevelChange(e.target.value as ApiCourseLevel | "")
            }
            className="rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            <option value="">Barcha darajalar</option>
            {(
              Object.entries(courseLevelLabels) as [ApiCourseLevel, string][]
            ).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            {sortOptions.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {courseCategoryOptions.map((cat) => (
          <button
            key={cat.value || "all"}
            onClick={() => onCategoryChange(cat.value)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              category === cat.value
                ? "bg-blue-600 text-white"
                : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CoursesToolbar;
