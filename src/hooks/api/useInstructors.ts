import { useQuery } from "@tanstack/react-query";
import axios from "../../config/axios";
import Endpoints from "../../config/endpoints";
import type { BaseResponse } from "../../types/auth.type";
import type {
  ApiInstructorDetail,
  ApiInstructorListItem,
} from "../../types/api/instructor.type";
import type { PaginatedResult } from "../../types/api/course.type";

interface QueryInstructorsParams {
  page?: number;
  limit?: number;
  search?: string;
}

export const useInstructors = (params: QueryInstructorsParams = {}) => {
  const fetchInstructors = async () => {
    const { data } = await axios.get<
      BaseResponse<PaginatedResult<ApiInstructorListItem>>
    >(Endpoints.public.instructors, { params });
    return data.data;
  };

  return useQuery({
    queryKey: ["public/instructors", params],
    queryFn: fetchInstructors,
    placeholderData: (previous) => previous,
  });
};

export const useInstructor = (id: string | undefined) => {
  const fetchInstructor = async () => {
    const { data } = await axios.get<BaseResponse<ApiInstructorDetail>>(
      Endpoints.public.instructorById(id as string),
    );
    return data.data;
  };

  return useQuery({
    queryKey: ["public/instructors", id],
    queryFn: fetchInstructor,
    enabled: Boolean(id),
    retry: false,
  });
};
