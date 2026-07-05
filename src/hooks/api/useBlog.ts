import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "../../config/axios";
import Endpoints from "../../config/endpoints";
import type { BaseResponse } from "../../types/auth.type";
import type {
  BlogCategoryItem,
  BlogPostDetail,
  BlogPostListItem,
  CreateCommentPayload,
} from "../../types/api/blog.type";
import type { PaginatedResult } from "../../types/api/course.type";

interface QueryBlogParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  featured?: boolean;
}

export const useBlogPosts = (params: QueryBlogParams = {}) => {
  const fetchPosts = async () => {
    const { data } = await axios.get<
      BaseResponse<PaginatedResult<BlogPostListItem>>
    >(Endpoints.public.blog, { params });
    return data.data;
  };

  return useQuery({
    queryKey: ["public/blog", params],
    queryFn: fetchPosts,
    placeholderData: (previous) => previous,
  });
};

export const useBlogCategories = () => {
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

export const useBlogPost = (slug: string | undefined) => {
  const fetchPost = async () => {
    const { data } = await axios.get<BaseResponse<BlogPostDetail>>(
      Endpoints.public.blogBySlug(slug as string),
    );
    return data.data;
  };

  return useQuery({
    queryKey: ["public/blog", slug],
    queryFn: fetchPost,
    enabled: Boolean(slug),
    retry: false,
  });
};

export const useAddComment = (slug: string | undefined) => {
  const queryClient = useQueryClient();

  const addComment = async (payload: CreateCommentPayload) => {
    const { data } = await axios.post<BaseResponse<{ message: string }>>(
      Endpoints.public.blogComments(slug as string),
      payload,
    );
    return data.data;
  };

  return useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      if (slug) {
        queryClient.invalidateQueries({ queryKey: ["public/blog", slug] });
      }
    },
  });
};
