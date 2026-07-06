import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "../../config/axios";
import Endpoints from "../../config/endpoints";
import type { BaseResponse } from "../../types/auth.type";
import type { PaginatedResult } from "../../types/api/course.type";
import type {
  AdminBlogComment,
  AdminBlogPost,
  AdminBlogPostDetail,
  AdminContactMessage,
  CreateBlogPostPayload,
  UpdateBlogPostPayload,
} from "../../types/api/admin-content.type";
import type { BlogCategoryItem } from "../../types/api/blog.type";

// ---------------- Blog posts ----------------
interface QueryBlogParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  status?: string;
}

export const useAdminBlogPosts = (params: QueryBlogParams = {}) => {
  const fetchPosts = async () => {
    const { data } = await axios.get<
      BaseResponse<PaginatedResult<AdminBlogPost>>
    >(Endpoints.admin.blogPosts, { params });
    return data.data;
  };
  return useQuery({
    queryKey: ["admin/blog/posts", params],
    queryFn: fetchPosts,
    placeholderData: (previous) => previous,
  });
};

export const useAdminBlogPost = (id: string | undefined) => {
  const fetchPost = async () => {
    const { data } = await axios.get<BaseResponse<AdminBlogPostDetail>>(
      Endpoints.admin.blogPost(id as string),
    );
    return data.data;
  };
  return useQuery({
    queryKey: ["admin/blog/posts", id],
    queryFn: fetchPost,
    enabled: Boolean(id),
  });
};

export const useCreateBlogPost = () => {
  const queryClient = useQueryClient();
  const createPost = async (payload: CreateBlogPostPayload) => {
    const { data } = await axios.post<BaseResponse<AdminBlogPostDetail>>(
      Endpoints.admin.blogPosts,
      payload,
    );
    return data.data;
  };
  return useMutation({
    mutationFn: createPost,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["admin/blog/posts"] }),
  });
};

export const useUpdateBlogPost = (id: string) => {
  const queryClient = useQueryClient();
  const updatePost = async (payload: UpdateBlogPostPayload) => {
    const { data } = await axios.patch<BaseResponse<AdminBlogPostDetail>>(
      Endpoints.admin.blogPost(id),
      payload,
    );
    return data.data;
  };
  return useMutation({
    mutationFn: updatePost,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["admin/blog/posts"] }),
  });
};

export const useDeleteBlogPost = () => {
  const queryClient = useQueryClient();
  const deletePost = async (id: string) => {
    const { data } = await axios.delete(Endpoints.admin.blogPost(id));
    return data.data;
  };
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["admin/blog/posts"] }),
  });
};

export const usePublishBlogPost = () => {
  const queryClient = useQueryClient();
  const publish = async (id: string) => {
    const { data } = await axios.patch(Endpoints.admin.blogPostPublish(id));
    return data.data;
  };
  return useMutation({
    mutationFn: publish,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["admin/blog/posts"] }),
  });
};

export const useAdminBlogCategories = () => {
  const fetchCategories = async () => {
    const { data } = await axios.get<BaseResponse<BlogCategoryItem[]>>(
      Endpoints.public.blogCategories,
    );
    return data.data;
  };
  return useQuery({
    queryKey: ["public/blog/categories"],
    queryFn: fetchCategories,
  });
};

export const useCreateBlogCategory = () => {
  const queryClient = useQueryClient();
  const createCategory = async (payload: { name: string; slug: string }) => {
    const { data } = await axios.post(Endpoints.admin.blogCategories, payload);
    return data.data;
  };
  return useMutation({
    mutationFn: createCategory,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["public/blog/categories"] }),
  });
};

// ---------------- Blog comments ----------------
export const useAdminBlogComments = (
  params: { page?: number; limit?: number; status?: string } = {},
) => {
  const fetchComments = async () => {
    const { data } = await axios.get<
      BaseResponse<PaginatedResult<AdminBlogComment>>
    >(Endpoints.admin.blogComments, { params });
    return data.data;
  };
  return useQuery({
    queryKey: ["admin/blog/comments", params],
    queryFn: fetchComments,
    placeholderData: (previous) => previous,
  });
};

export const useModerateBlogComment = () => {
  const queryClient = useQueryClient();
  const moderate = async ({
    id,
    status,
  }: {
    id: string;
    status: "approved" | "rejected";
  }) => {
    const { data } = await axios.patch(
      Endpoints.admin.blogCommentModerate(id),
      { status },
    );
    return data.data;
  };
  return useMutation({
    mutationFn: moderate,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["admin/blog/comments"] }),
  });
};

// ---------------- Contact ----------------
export const useAdminContact = (
  params: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
  } = {},
) => {
  const fetchMessages = async () => {
    const { data } = await axios.get<
      BaseResponse<PaginatedResult<AdminContactMessage>>
    >(Endpoints.admin.contact, { params });
    return data.data;
  };
  return useQuery({
    queryKey: ["admin/contact", params],
    queryFn: fetchMessages,
    placeholderData: (previous) => previous,
  });
};

export const useUpdateContactStatus = () => {
  const queryClient = useQueryClient();
  const updateStatus = async ({
    id,
    status,
  }: {
    id: string;
    status: "new" | "read" | "replied";
  }) => {
    const { data } = await axios.patch(Endpoints.admin.contactStatus(id), {
      status,
    });
    return data.data;
  };
  return useMutation({
    mutationFn: updateStatus,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["admin/contact"] }),
  });
};
