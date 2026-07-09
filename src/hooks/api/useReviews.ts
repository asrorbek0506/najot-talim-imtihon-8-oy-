import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "../../config/axios";
import Endpoints from "../../config/endpoints";
import type { BaseResponse } from "../../types/auth.type";

interface CreateReviewPayload {
  courseId: string;
  rating: number;
  text?: string;
}

export const useCreateReview = () => {
  const queryClient = useQueryClient();

  const createReview = async (payload: CreateReviewPayload) => {
    const { data } = await axios.post<BaseResponse<{ message: string }>>(
      Endpoints.student.reviews,
      payload,
    );
    return data.data;
  };

  return useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student/reviews/mine"] });
    },
  });
};

export interface MyReview {
  id: string;
  rating: number;
  text: string | null;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  course: { id: string; name: string };
}

export const useMyReviews = () => {
  const fetchMyReviews = async () => {
    const { data } = await axios.get<BaseResponse<MyReview[]>>(
      Endpoints.student.myReviews,
    );
    return data.data;
  };

  return useQuery({
    queryKey: ["student/reviews/mine"],
    queryFn: fetchMyReviews,
  });
};
