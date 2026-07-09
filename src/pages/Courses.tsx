import { useMemo, useState } from "react";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import PageHero from "../components/ui/PageHero";
import CoursesToolbar, {
  type SortOption,
} from "../components/courses/CoursesToolbar";
import CoursesGrid from "../components/courses/CoursesGrid";
import { useCourses } from "../hooks/api/useCourses";
import type {
  ApiCourseLevel,
  QueryCoursesParams,
} from "../types/api/course.type";

const sortToQuery: Record<
  SortOption,
  Pick<QueryCoursesParams, "sortBy" | "order">
> = {
  popular: { sortBy: "createdAt", order: "desc" },
  priceAsc: { sortBy: "price", order: "asc" },
  priceDesc: { sortBy: "price", order: "desc" },
  rating: { sortBy: "rating", order: "desc" },
};

const Courses = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search);
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState<ApiCourseLevel | "">("");
  const [sort, setSort] = useState<SortOption>("popular");
  const [page, setPage] = useState(1);

  const queryParams: QueryCoursesParams = useMemo(
    () => ({
      page,
      limit: 8,
      search: debouncedSearch.trim() || undefined,
      category: category || undefined,
      level: level || undefined,
      ...sortToQuery[sort],
    }),
    [page, debouncedSearch, category, level, sort],
  );

  const { data, isLoading, isFetching } = useCourses(queryParams);

  const updateAndResetPage = (fn: () => void) => {
    fn();
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <PageHero
        breadcrumb="Kurslar"
        title="Barcha kurslarimiz"
        subtitle="Mehnat bozorida eng talab qilinadigan yo'nalishlar bo'yicha amaliy kurslar."
      />
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CoursesToolbar
            search={search}
            onSearchChange={(v) => updateAndResetPage(() => setSearch(v))}
            category={category}
            onCategoryChange={(v) => updateAndResetPage(() => setCategory(v))}
            level={level}
            onLevelChange={(v) => updateAndResetPage(() => setLevel(v))}
            sort={sort}
            onSortChange={(v) => updateAndResetPage(() => setSort(v))}
          />
          <CoursesGrid
            courses={data?.items ?? []}
            total={data?.total ?? 0}
            page={data?.page ?? 1}
            totalPages={data?.totalPages ?? 1}
            isLoading={isLoading || isFetching}
            onPageChange={setPage}
          />
        </div>
      </section>
    </div>
  );
};

export default Courses;
