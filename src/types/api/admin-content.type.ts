export type BlogStatusType = "draft" | "published" | "archived";
export type CommentStatusType = "pending" | "approved" | "rejected";

export interface AdminBlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  imageUrl: string | null;
  readMinutes: number;
  isFeatured: boolean;
  publishedAt: string | null;
  createdAt: string;
  status: BlogStatusType;
  viewsCount: number;
  category: { id: string; name: string; slug: string } | null;
  author: {
    firstName: string;
    lastName: string;
    avatarUrl?: string | null;
  } | null;
}

export interface AdminBlogPostDetail extends Omit<
  AdminBlogPost,
  "category" | "author"
> {
  content: string;
  categoryId?: string | null;
  category: { id: string; name: string; slug: string } | null;
  author: { firstName: string; lastName: string } | null;
}

export interface CreateBlogPostPayload {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  imageUrl?: string;
  categoryId?: string;
  readMinutes?: number;
  isFeatured?: boolean;
  status?: BlogStatusType;
}

export type UpdateBlogPostPayload = Partial<CreateBlogPostPayload>;

export interface AdminBlogComment {
  id: string;
  authorName: string;
  authorEmail: string;
  text: string;
  status: CommentStatusType;
  createdAt: string;
  post: { id: string; title: string; slug: string };
}

export type ContactStatusType = "new" | "read" | "replied";

export interface AdminContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  status: ContactStatusType;
  createdAt: string;
}
