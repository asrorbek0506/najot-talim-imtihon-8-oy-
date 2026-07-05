import { Link } from "react-router-dom";
import type { BlogPostListItem } from "../../types/api/blog.type";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1000&q=60";

const formatDate = (iso: string | null) =>
  iso
    ? new Date(iso).toLocaleDateString("uz-UZ", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

const BlogCard = ({ post }: { post: BlogPostListItem }) => {
  const authorName = post.author
    ? `${post.author.firstName} ${post.author.lastName}`
    : "Muallif";

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-lg">
      <Link to={`/blog/${post.slug}`}>
        <img
          src={post.imageUrl || FALLBACK_IMAGE}
          alt={post.title}
          className="h-44 w-full object-cover"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between text-xs text-gray-500">
          {post.category && (
            <span className="rounded-full bg-blue-50 px-2.5 py-1 font-medium text-blue-600">
              {post.category.name}
            </span>
          )}
          <span>{post.readMinutes} daq o'qish</span>
        </div>

        <Link to={`/blog/${post.slug}`}>
          <h3 className="mt-3 line-clamp-2 text-base font-semibold text-gray-900 transition-colors hover:text-blue-600">
            {post.title}
          </h3>
        </Link>

        <p className="mt-2 line-clamp-2 flex-1 text-sm text-gray-500">
          {post.excerpt}
        </p>

        <div className="mt-4 flex items-center gap-x-2.5 border-t border-gray-100 pt-4">
          <img
            src={post.author?.avatarUrl || "https://i.pravatar.cc/60"}
            alt={authorName}
            className="h-7 w-7 rounded-full object-cover"
          />
          <div>
            <p className="text-xs font-medium text-gray-900">{authorName}</p>
            <p className="text-[11px] text-gray-400">
              {formatDate(post.publishedAt ?? post.createdAt)}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
