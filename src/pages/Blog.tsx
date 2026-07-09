import { useMemo, useState } from "react";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import PageHero from "../components/ui/PageHero";
import BlogCard from "../components/blog/BlogCard";
import { Icon } from "../components/ui/Icon";
import { useBlogCategories, useBlogPosts } from "../hooks/api/useBlog";

const Blog = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const { data: categoriesData } = useBlogCategories();
  const categories = categoriesData ?? [];

  const { data: featuredData } = useBlogPosts({ featured: true, limit: 1 });
  const featured = featuredData?.items?.[0];

  const { data, isLoading, isFetching } = useBlogPosts({
    page,
    limit: 9,
    search: debouncedSearch.trim() || undefined,
    category: category || undefined,
  });

  const posts = useMemo(
    () => (data?.items ?? []).filter((p) => p.id !== featured?.id),
    [data, featured],
  );

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <PageHero
        breadcrumb="Blog"
        title="Foydali maqolalar va yangiliklar"
        subtitle="Dasturlash, dizayn va karyera bo'yicha amaliy maslahatlar hamda o'quv markazimizdagi so'nggi yangiliklar."
      />

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {featured && page === 1 && !search && !category && (
            <BlogCard post={featured} />
          )}

          <div className="mt-12 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <label className="relative block w-full max-w-sm">
              <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                <Icon.search />
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Maqola qidirish..."
                className="w-full rounded-lg border border-gray-200 py-2.5 pl-11 pr-4 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </label>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => {
                  setCategory("");
                  setPage(1);
                }}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  category === ""
                    ? "bg-blue-600 text-white"
                    : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                Barchasi
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setCategory(cat.slug);
                    setPage(1);
                  }}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    category === cat.slug
                      ? "bg-blue-600 text-white"
                      : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {cat.name}
                  {cat._count && (
                    <span className="ml-1 text-xs opacity-70">
                      ({cat._count.posts})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {isLoading || isFetching ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }, (_, i) => (
                <div
                  key={i}
                  className="h-80 animate-pulse rounded-2xl bg-gray-100"
                />
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="mt-16 flex flex-col items-center justify-center text-center">
              <p className="text-lg font-semibold text-gray-900">
                Hech qanday maqola topilmadi
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Boshqa kalit so'z yoki kategoriya bilan qayta urinib ko'ring.
              </p>
            </div>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}

          {data && data.totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-x-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-400 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Icon.arrowLeft />
              </button>
              {Array.from({ length: data.totalPages }, (_, i) => i + 1).map(
                (p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                      page === p
                        ? "bg-blue-600 text-white"
                        : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {p}
                  </button>
                ),
              )}
              <button
                onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
                disabled={page === data.totalPages}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-400 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Icon.arrowRight />
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
