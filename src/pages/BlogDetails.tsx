import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Icon } from "../components/ui/Icon";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useAddComment, useBlogPost } from "../hooks/api/useBlog";
import type { CreateCommentPayload } from "../types/api/blog.type";

const formatDate = (iso: string | null) =>
  iso
    ? new Date(iso).toLocaleDateString("uz-UZ", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

const BlogDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, isError } = useBlogPost(slug);
  const { mutateAsync, isPending } = useAddComment(slug);

  const form = useForm<CreateCommentPayload>();
  const {
    formState: { errors },
  } = form;

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  const onSubmit = async (data: CreateCommentPayload) => {
    try {
      await mutateAsync(data);
      toast.success(
        "Izohingiz qabul qilindi va moderatsiyadan so'ng chop etiladi",
      );
      form.reset();
    } catch {
      toast.error("Izohni yuborishda xatolik yuz berdi");
    }
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl animate-pulse px-4 py-16 sm:px-6">
        <div className="h-6 w-1/2 rounded bg-gray-100" />
        <div className="mt-6 h-72 rounded-2xl bg-gray-100" />
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Maqola topilmadi</h1>
        <p className="mt-2 text-sm text-gray-500">
          Siz izlagan maqola mavjud emas yoki o'chirilgan bo'lishi mumkin.
        </p>
        <Link to="/blog" className="mt-6">
          <Button>Barcha maqolalarga qaytish</Button>
        </Link>
      </div>
    );
  }

  const authorName = post.author
    ? `${post.author.firstName} ${post.author.lastName}`
    : "Muallif";

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <section className="border-b border-gray-100 bg-gray-50/60 py-10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-x-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-gray-900">
              Bosh sahifa
            </Link>
            <span>›</span>
            <Link to="/blog" className="hover:text-gray-900">
              Blog
            </Link>
            {post.category && (
              <>
                <span>›</span>
                <span className="font-medium text-gray-900">
                  {post.category.name}
                </span>
              </>
            )}
          </nav>

          {post.category && (
            <span className="mt-5 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
              {post.category.name}
            </span>
          )}
          <h1 className="mt-4 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">
            {post.title}
          </h1>

          <div className="mt-6 flex items-center gap-x-3">
            <img
              src={post.author?.avatarUrl || "https://i.pravatar.cc/100"}
              alt={authorName}
              className="h-11 w-11 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {authorName}
              </p>
              <p className="text-xs text-gray-500">
                {formatDate(post.publishedAt ?? post.createdAt)} ·{" "}
                {post.readMinutes} daq o'qish
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {post.imageUrl && (
            <img
              src={post.imageUrl}
              alt={post.title}
              className="h-72 w-full rounded-2xl object-cover sm:h-96"
            />
          )}

          <div className="mt-8 space-y-5">
            {post.content
              .split("\n")
              .filter(Boolean)
              .map((paragraph, index) => (
                <p key={index} className="leading-relaxed text-gray-700">
                  {paragraph}
                </p>
              ))}
          </div>

          <div className="mt-10 flex items-center justify-between border-t border-gray-100 pt-6">
            <Link
              to="/blog"
              className="flex items-center gap-x-2 text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              <Icon.arrowLeft />
              Barcha maqolalar
            </Link>
            <span className="text-xs text-gray-400">
              {post.viewsCount} marta ko'rilgan
            </span>
          </div>

          <div className="mt-14 border-t border-gray-100 pt-10">
            <h2 className="text-lg font-bold text-gray-900">
              Izohlar ({post.comments.length})
            </h2>

            <div className="mt-6 space-y-5">
              {post.comments.length === 0 && (
                <p className="text-sm text-gray-500">
                  Hali izohlar yo'q. Birinchi bo'lib fikr bildiring!
                </p>
              )}
              {post.comments.map((comment) => (
                <div
                  key={comment.id}
                  className="rounded-2xl border border-gray-100 p-5"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-900">
                      {comment.authorName}
                    </p>
                    <p className="text-xs text-gray-400">
                      {formatDate(comment.createdAt)}
                    </p>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    {comment.text}
                  </p>

                  {comment.replies.length > 0 && (
                    <div className="mt-4 space-y-3 border-l-2 border-gray-100 pl-4">
                      {comment.replies.map((reply) => (
                        <div key={reply.id}>
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-semibold text-gray-900">
                              {reply.authorName}
                            </p>
                            <p className="text-xs text-gray-400">
                              {formatDate(reply.createdAt)}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-gray-600">
                            {reply.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-8 rounded-2xl border border-gray-100 bg-gray-50/60 p-6"
              noValidate
            >
              <h3 className="text-sm font-bold text-gray-900">
                Izoh qoldirish
              </h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Input
                  name="authorName"
                  type="text"
                  form={form}
                  placeholder="Ismingiz"
                  label="Ism"
                  required
                  error={errors.authorName?.message}
                  rules={{ required: "Ismingizni kiriting" }}
                />
                <Input
                  name="authorEmail"
                  type="email"
                  form={form}
                  placeholder="email@example.com"
                  label="Email"
                  required
                  error={errors.authorEmail?.message}
                  rules={{
                    required: "Email kiriting",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Email noto'g'ri",
                    },
                  }}
                />
              </div>
              <div className="mt-4">
                <label className="text-sm font-medium text-gray-700">
                  Izoh
                </label>
                <textarea
                  {...form.register("text", {
                    required: "Izoh matnini kiriting",
                  })}
                  rows={4}
                  placeholder="Fikringizni shu yerga yozing..."
                  className="mt-1.5 w-full resize-none rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
                {errors.text && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.text.message}
                  </p>
                )}
              </div>
              <Button type="submit" className="mt-4" disabled={isPending}>
                {isPending ? "Yuborilmoqda..." : "Izohni yuborish"}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetails;
