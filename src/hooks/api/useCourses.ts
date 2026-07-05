import { useQuery } from "@tanstack/react-query";
import axios from "../../config/axios";
import Endpoints from "../../config/endpoints";
import type { BaseResponse } from "../../types/auth.type";
import type {
  ApiCourseDetail,
  ApiCourseListItem,
  PaginatedResult,
  QueryCoursesParams,
} from "../../types/api/course.type";

export const useCourses = (params: QueryCoursesParams = {}) => {
  const fetchCourses = async () => {
    const { data } = await axios.get<
      BaseResponse<PaginatedResult<ApiCourseListItem>>
    >(Endpoints.public.courses, { params });
    return data.data;
  };

  return useQuery({
    queryKey: ["public/courses", params],
    queryFn: fetchCourses,
    placeholderData: (previous) => previous,
  });
};

export const useCourseBySlug = (slug: string | undefined) => {
  const fetchCourse = async () => {
    const { data } = await axios.get<BaseResponse<ApiCourseDetail>>(
      Endpoints.public.courseBySlug(slug as string),
    );
    return data.data;
  };

  return useQuery({
    queryKey: ["public/courses", slug],
    queryFn: fetchCourse,
    enabled: Boolean(slug),
    retry: false,
  });
};

export default useCourses;
