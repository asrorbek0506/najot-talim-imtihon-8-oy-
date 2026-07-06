import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "../../config/axios";
import Endpoints from "../../config/endpoints";
import type { BaseResponse } from "../../types/auth.type";
import type { PaginatedResult } from "../../types/api/course.type";
import type {
  AdminCourseDetail,
  AdminCourseListItem,
  CreateCoursePayload,
  UpdateCoursePayload,
} from "../../types/api/admin-course.type";

interface QueryAdminCoursesParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  level?: string;
  status?: string;
}

export const useAdminCourses = (params: QueryAdminCoursesParams = {}) => {
  const fetchCourses = async () => {
    const { data } = await axios.get<
      BaseResponse<PaginatedResult<AdminCourseListItem>>
    >(Endpoints.admin.courses, { params });
    return data.data;
  };

  return useQuery({
    queryKey: ["admin/courses", params],
    queryFn: fetchCourses,
    placeholderData: (previous) => previous,
  });
};

export const useAdminCourse = (id: string | undefined) => {
  const fetchCourse = async () => {
    const { data } = await axios.get<BaseResponse<AdminCourseDetail>>(
      Endpoints.admin.course(id as string),
    );
    return data.data;
  };

  return useQuery({
    queryKey: ["admin/courses", id],
    queryFn: fetchCourse,
    enabled: Boolean(id),
  });
};

export const useCreateCourse = () => {
  const queryClient = useQueryClient();
  const createCourse = async (payload: CreateCoursePayload) => {
    const { data } = await axios.post<BaseResponse<AdminCourseDetail>>(
      Endpoints.admin.courses,
      payload,
    );
    return data.data;
  };
  return useMutation({
    mutationFn: createCourse,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["admin/courses"] }),
  });
};

export const useUpdateCourse = (id: string) => {
  const queryClient = useQueryClient();
  const updateCourse = async (payload: UpdateCoursePayload) => {
    const { data } = await axios.patch<BaseResponse<AdminCourseDetail>>(
      Endpoints.admin.course(id),
      payload,
    );
    return data.data;
  };
  return useMutation({
    mutationFn: updateCourse,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["admin/courses"] }),
  });
};

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();
  const deleteCourse = async (id: string) => {
    const { data } = await axios.delete(Endpoints.admin.course(id));
    return data.data;
  };
  return useMutation({
    mutationFn: deleteCourse,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["admin/courses"] }),
  });
};
