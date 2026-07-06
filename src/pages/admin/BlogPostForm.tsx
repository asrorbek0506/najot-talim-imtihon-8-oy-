import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { Icon } from "../../components/ui/Icon";
import {
  useAdminBlogCategories,
  useAdminBlogPost,
  useCreateBlogCategory,
  useCreateBlogPost,
  useUpdateBlogPost,
} from "../../hooks/api/useAdminContent";
import type { CreateBlogPostPayload } from "../../types/api/admin-content.type";

const BlogPostForm = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const { data: existing } = useAdminBlogPost(id);
  const { data: categories } = useAdminBlogCategories();
  const { mutateAsync: createCategory } = useCreateBlogCategory();
  const { mutateAsync: createPost, isPending: isCreating } =
    useCreateBlogPost();
  const { mutateAsync: updatePost, isPending: isUpdating } = useUpdateBlogPost(
    id ?? "",
  );

  const [newCategoryName, setNewCategoryName] = useState("");

  const form = useForm<CreateBlogPostPayload>({
    defaultValues: { status: "draft", readMinutes: 5, isFeatured: false },
  });
  const {
    register,
    formState: { errors },
    reset,
  } = form;

  useEffect(() => {
    if (existing) {
      reset({
        title: existing.title,
        slug: existing.slug,
        excerpt: existing.excerpt,
        content: existing.content,
        imageUrl: existing.imageUrl ?? "",
        categoryId: existing.categoryId ?? "",
        readMinutes: existing.readMinutes,
        isFeatured: existing.isFeatured,
        status: existing.status,
      });
    }
  }, [existing, reset]);

  const onSubmit = async (values: CreateBlogPostPayload) => {
    try {
      if (isEdit && id) {
        await updatePost(values);
        toast.success("Maqola yangilandi");
      } else {
        await createPost(values);
        toast.success("Yangi maqola yaratildi");
      }
      navigate("/admin/blog");
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? "Xatolik yuz berdi");
    }
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;
    const slug = newCategoryName
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
    try {
      await createCategory({ name: newCategoryName.trim(), slug });
      toast.success("Kategoriya qo'shildi");
      setNewCategoryName("");
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? "Xatolik yuz berdi");
    }
  };

  const isPending = isCreating || isUpdating;

  return (
    <div className="space-y-6">
      <Link
        to="/admin/blog"
        className="flex w-fit items-center gap-x-2 text-sm font-medium text-gray-600 hover:text-gray-900"
      >
        <Icon.arrowLeft />
        Blog ro'yxati
      </Link>

      <h1 className="text-2xl font-bold text-gray-900">
        {isEdit ? "Maqolani tahrirlash" : "Yangi maqola"}
      </h1>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-3xl space-y-6"
        noValidate
      >
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              name="title"
              type="text"
              form={form}
              placeholder="Maqola sarlavhasi"
              label="Sarlavha"
              required
              error={errors.title?.message}
              rules={{ required: "Sarlavhani kiriting" }}
            />
            <Input
              name="slug"
              type="text"
              form={form}
              placeholder="maqola-sarlavhasi"
              label="Slug (URL)"
              required
              error={errors.slug?.message}
              rules={{ required: "Slug kiriting" }}
            />

            <div>
              <label className="text-sm font-medium text-gray-700">
                Kategoriya
              </label>
              <select
                {...register("categoryId")}
                className="mt-1.5 w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option value="">Tanlanmagan</option>
                {(categories ?? []).map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <div className="mt-2 flex gap-x-2">
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Yangi kategoriya nomi"
                  className="flex-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs focus:border-blue-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddCategory}
                  className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
                >
                  Qo'shish
                </button>
              </div>
            </div>

            <Input
              name="readMinutes"
              type="number"
              form={form}
              placeholder="5"
              label="O'qish vaqti (daqiqa)"
            />

            <div>
              <label className="text-sm font-medium text-gray-700">Holat</label>
              <select
                {...register("status")}
                className="mt-1.5 w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option value="draft">Qoralama</option>
                <option value="published">Chop etilgan</option>
                <option value="archived">Arxivlangan</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <Input
              name="imageUrl"
              type="text"
              form={form}
              placeholder="/uploads/blog/abc.jpg yoki https://..."
              label="Rasm URL"
            />
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium text-gray-700">
              Qisqacha mazmun
            </label>
            <textarea
              {...register("excerpt", { required: true })}
              rows={2}
              className="mt-1.5 w-full resize-none rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium text-gray-700">
              To'liq matn
            </label>
            <textarea
              {...register("content", { required: true })}
              rows={10}
              className="mt-1.5 w-full resize-none rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <label className="mt-4 flex items-center gap-x-2 text-sm text-gray-700">
            <input
              type="checkbox"
              {...register("isFeatured")}
              className="h-4 w-4 rounded"
            />
            Blog sahifasida asosiy (featured) maqola sifatida ko'rsatish
          </label>
        </div>

        <div className="flex gap-x-3">
          <Button type="submit" disabled={isPending}>
            {isPending
              ? "Saqlanmoqda..."
              : isEdit
                ? "Saqlash"
                : "Maqolani yaratish"}
          </Button>
          <Link to="/admin/blog">
            <button
              type="button"
              className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              Bekor qilish
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default BlogPostForm;
