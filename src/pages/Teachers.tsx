import { useState } from "react";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import TeachersGrid from "../components/teachers/TeachersGrid";
import TeachersToolbar from "../components/teachers/TeachersToolbar";
import PageHero from "../components/ui/PageHero";
import { useInstructors } from "../hooks/api/useInstructors";

const Teachers = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search);
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching } = useInstructors({
    page,
    limit: 8,
    search: debouncedSearch.trim() || undefined,
  });

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <PageHero
        breadcrumb="O'qituvchilar"
        title="Bizning o'qituvchilar"
        subtitle="Tajribali mutaxassislar o'z bilim va tajribasini siz bilan ulashishga tayyor."
      />
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <TeachersToolbar
            search={search}
            onSearchChange={(v) => {
              setSearch(v);
              setPage(1);
            }}
          />
          <TeachersGrid
            teachers={data?.items ?? []}
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

export default Teachers;
