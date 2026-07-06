import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "../../config/axios";
import Endpoints from "../../config/endpoints";
import type { BaseResponse } from "../../types/auth.type";
import type { PaginatedResult } from "../../types/api/course.type";
import type {
  AdminInstructor,
  CreateInstructorPayload,
  UpdateInstructorPayload,
} from "../../types/api/admin-people.type";

interface QueryInstructorsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  specialty?: string;
}

export const useAdminInstructors = (params: QueryInstructorsParams = {}) => {
  const fetchInstructors = async () => {
    const { data } = await axios.get<
      BaseResponse<PaginatedResult<AdminInstructor>>
    >(Endpoints.admin.instructors, { params });
    return data.data;
  };

  return useQuery({
    queryKey: ["admin/instructors", params],
    queryFn: fetchInstructors,
    placeholderData: (previous) => previous,
  });
};

export const useAdminInstructor = (id: string | undefined) => {
  const fetchInstructor = async () => {
    const { data } = await axios.get<BaseResponse<AdminInstructor>>(
      Endpoints.admin.instructor(id as string),
    );
    return data.data;
  };

  return useQuery({
    queryKey: ["admin/instructors", id],
    queryFn: fetchInstructor,
    enabled: Boolean(id),
  });
};

export const useCreateInstructor = () => {
  const queryClient = useQueryClient();
  const createInstructor = async (payload: CreateInstructorPayload) => {
    const { data } = await axios.post<BaseResponse<AdminInstructor>>(
      Endpoints.admin.instructors,
      payload,
    );
    return data.data;
  };
  return useMutation({
    mutationFn: createInstructor,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["admin/instructors"] }),
  });
};

export const useUpdateInstructor = (id: string) => {
  const queryClient = useQueryClient();
  const updateInstructor = async (payload: UpdateInstructorPayload) => {
    const { data } = await axios.patch<BaseResponse<AdminInstructor>>(
      Endpoints.admin.instructor(id),
      payload,
    );
    return data.data;
  };
  return useMutation({
    mutationFn: updateInstructor,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["admin/instructors"] }),
  });
};

export const useDeleteInstructor = () => {
  const queryClient = useQueryClient();
  const deleteInstructor = async (id: string) => {
    const { data } = await axios.delete(Endpoints.admin.instructor(id));
    return data.data;
  };
  return useMutation({
    mutationFn: deleteInstructor,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["admin/instructors"] }),
  });
};
