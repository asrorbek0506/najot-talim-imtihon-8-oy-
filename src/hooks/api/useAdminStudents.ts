import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "../../config/axios";
import Endpoints from "../../config/endpoints";
import type { BaseResponse } from "../../types/auth.type";
import type { PaginatedResult } from "../../types/api/course.type";
import type {
  AdminStudent,
  CreateStudentPayload,
  UpdateStudentPayload,
} from "../../types/api/admin-people.type";

interface QueryStudentsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  sortBy?: string;
  order?: "asc" | "desc";
}

export const useAdminStudents = (params: QueryStudentsParams = {}) => {
  const fetchStudents = async () => {
    const { data } = await axios.get<
      BaseResponse<PaginatedResult<AdminStudent>>
    >(Endpoints.admin.students, { params });
    return data.data;
  };

  return useQuery({
    queryKey: ["admin/students", params],
    queryFn: fetchStudents,
    placeholderData: (previous) => previous,
  });
};

export const useAdminStudent = (id: string | undefined) => {
  const fetchStudent = async () => {
    const { data } = await axios.get<BaseResponse<AdminStudent>>(
      Endpoints.admin.student(id as string),
    );
    return data.data;
  };

  return useQuery({
    queryKey: ["admin/students", id],
    queryFn: fetchStudent,
    enabled: Boolean(id),
  });
};

export const useAdminStudentEnrollments = (id: string | undefined) => {
  const fetchEnrollments = async () => {
    const { data } = await axios.get<BaseResponse<unknown[]>>(
      Endpoints.admin.studentEnrollments(id as string),
    );
    return data.data;
  };

  return useQuery({
    queryKey: ["admin/students", id, "enrollments"],
    queryFn: fetchEnrollments,
    enabled: Boolean(id),
  });
};

export const useAdminStudentPayments = (id: string | undefined) => {
  const fetchPayments = async () => {
    const { data } = await axios.get<
      BaseResponse<{
        stats: { totalPaid: number; count: number };
        items: any[];
      }>
    >(Endpoints.admin.studentPayments(id as string));
    return data.data;
  };

  return useQuery({
    queryKey: ["admin/students", id, "payments"],
    queryFn: fetchPayments,
    enabled: Boolean(id),
  });
};

export const useCreateStudent = () => {
  const queryClient = useQueryClient();
  const createStudent = async (payload: CreateStudentPayload) => {
    const { data } = await axios.post<BaseResponse<AdminStudent>>(
      Endpoints.admin.students,
      payload,
    );
    return data.data;
  };
  return useMutation({
    mutationFn: createStudent,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["admin/students"] }),
  });
};

export const useUpdateStudent = (id: string) => {
  const queryClient = useQueryClient();
  const updateStudent = async (payload: UpdateStudentPayload) => {
    const { data } = await axios.patch<BaseResponse<AdminStudent>>(
      Endpoints.admin.student(id),
      payload,
    );
    return data.data;
  };
  return useMutation({
    mutationFn: updateStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin/students"] });
    },
  });
};

export const useDeleteStudent = () => {
  const queryClient = useQueryClient();
  const deleteStudent = async (id: string) => {
    const { data } = await axios.delete(Endpoints.admin.student(id));
    return data.data;
  };
  return useMutation({
    mutationFn: deleteStudent,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["admin/students"] }),
  });
};
