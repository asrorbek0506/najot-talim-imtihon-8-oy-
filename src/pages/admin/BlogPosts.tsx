import { useState } from "react";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Icon } from "../../components/ui/Icon";
import {
  useAdminBlogPosts,
  useDeleteBlogPost,
  usePublishBlogPost,
} from "../../hooks/api/useAdminContent";

const statusStyles: Record<string, string> = {
  draft: "bg-gray-100 text-gray-500",
  published: "bg-emerald-50 text-emerald-600",
  archived: "bg-orange-50 text-orange-600",
};

const statusLabels: Record<string, string> = {
  draft: "Qoralama",
  published: "Chop etilgan",
  archived: "Arxivlangan",
};

const BlogPosts = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search);
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useAdminBlogPosts({
    page,
    limit: 10,
    search: debouncedSearch.trim() || undefined,
    status: status || undefined,
  });
  const { mutateAsync: publishPost } = usePublishBlogPost();
  const { mutateAsync: deletePost } = useDeleteBlogPost();

  const handlePublish = async (id: string) => {
    try {
      await publishPost(id);
      toast.success("Maqola chop etildi");
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? "Xatolik yuz berdi");
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`"${title}" maqolasini o'chirmoqchimisiz?`)) return;
    try {
      await deletePost(id);
      toast.success("Maqola o'chirildi");
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? "Xatolik yuz berdi");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog</h1>
          <p className="mt-1 text-sm text-gray-500">
            Jami {data?.total ?? 0} ta maqola
          </p>
        </div>
        <div className="flex items-center gap-x-2">
          <Link
            to="/admin/blog/comments"
            className="flex items-center gap-x-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Izohlar moderatsiyasi
          </Link>
          <Link
            to="/admin/blog/new"
            className="flex items-center gap-x-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            <Icon.plus />
            Yangi maqola
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
            placeholder="Maqola sarlavhasi..."
            className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-11 pr-4 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </label>
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          className="rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
        >
          <option value="">Barcha holatlar</option>
          <option value="draft">Qoralama</option>
          <option value="published">Chop etilgan</option>
          <option value="archived">Arxivlangan</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-xs uppercase tracking-wide text-gray-400">
                <th className="px-6 py-3 font-medium">Maqola</th>
                <th className="px-6 py-3 font-medium">Kategoriya</th>
                <th className="px-6 py-3 font-medium">Ko'rishlar</th>
                <th className="px-6 py-3 font-medium">Holat</th>
                <th className="px-6 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {(data?.items ?? []).map((post) => (
                <tr
                  key={post.id}
                  className="transition-colors hover:bg-gray-50"
                >
                  <td className="px-6 py-3.5 font-medium text-gray-900">
                    {post.title}
                  </td>
                  <td className="px-6 py-3.5 text-gray-600">
                    {post.category?.name ?? "—"}
                  </td>
                  <td className="px-6 py-3.5 text-gray-600">
                    {post.viewsCount}
                  </td>
                  <td className="px-6 py-3.5">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[post.status]}`}
                    >
                      {statusLabels[post.status]}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-x-3">
                      {post.status !== "published" && (
                        <button
                          onClick={() => handlePublish(post.id)}
                          className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
                        >
                          Chop etish
                        </button>
                      )}
                      <Link
                        to={`/admin/blog/${post.id}/edit`}
                        className="text-gray-400 hover:text-blue-600"
                        aria-label="Tahrirlash"
                      >
                        <Icon.edit />
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id, post.title)}
                        className="text-gray-400 hover:text-red-500"
                        aria-label="O'chirish"
                      >
                        <Icon.trash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!isLoading && (data?.items.length ?? 0) === 0 && (
          <p className="py-16 text-center text-sm text-gray-500">
            Hech qanday maqola topilmadi
          </p>
        )}

        {data && data.totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4">
            <p className="text-xs text-gray-400">
              {data.page} / {data.totalPages} sahifa
            </p>
            <div className="flex items-center gap-x-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-400 disabled:opacity-50"
              >
                <Icon.arrowLeft />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
                disabled={page === data.totalPages}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-400 disabled:opacity-50"
              >
                <Icon.arrowRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPosts;
