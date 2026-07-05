export interface BlogAuthor {
  firstName: string;
  lastName: string;
  avatarUrl?: string | null;
}

export interface BlogCategoryItem {
  id: string;
  name: string;
  slug: string;
  _count?: { posts: number };
}

export interface BlogPostListItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  imageUrl: string | null;
  readMinutes: number;
  isFeatured: boolean;
  publishedAt: string | null;
  createdAt: string;
  category: { id: string; name: string; slug: string } | null;
  author: BlogAuthor | null;
}

export interface BlogCommentReply {
  id: string;
  authorName: string;
  text: string;
  createdAt: string;
}

export interface BlogComment extends BlogCommentReply {
  replies: BlogCommentReply[];
}

export interface BlogPostDetail extends BlogPostListItem {
  content: string;
  viewsCount: number;
  comments: BlogComment[];
}

export interface CreateCommentPayload {
  authorName: string;
  authorEmail: string;
  text: string;
  parentId?: string;
}
