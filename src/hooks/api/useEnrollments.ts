import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "../../config/axios";
import Endpoints from "../../config/endpoints";
import type { BaseResponse } from "../../types/auth.type";
import type {
  CheckoutPayload,
  CheckoutResult,
  MyCourseDetail,
  MyCourseListItem,
} from "../../types/api/enrollment.type";

export const useMyCourses = () => {
  const fetchMyCourses = async () => {
    const { data } = await axios.get<BaseResponse<MyCourseListItem[]>>(
      Endpoints.student.myCourses,
    );
    return data.data;
  };

  return useQuery({
    queryKey: ["student/enrollments"],
    queryFn: fetchMyCourses,
  });
};

export const useMyCourseDetail = (courseId: string | undefined) => {
  const fetchDetail = async () => {
    const { data } = await axios.get<BaseResponse<MyCourseDetail>>(
      Endpoints.student.myCourseDetail(courseId as string),
    );
    return data.data;
  };

  return useQuery({
    queryKey: ["student/enrollments", courseId],
    queryFn: fetchDetail,
    enabled: Boolean(courseId),
  });
};

export const useCheckout = () => {
  const queryClient = useQueryClient();

  const checkout = async (payload: CheckoutPayload) => {
    const { data } = await axios.post<BaseResponse<CheckoutResult>>(
      Endpoints.student.checkout,
      payload,
    );
    return data.data;
  };

  return useMutation({
    mutationFn: checkout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student/enrollments"] });
    },
  });
};
