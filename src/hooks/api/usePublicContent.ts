import { useQuery } from "@tanstack/react-query";
import axios from "../../config/axios";
import Endpoints from "../../config/endpoints";
import type { BaseResponse } from "../../types/auth.type";
import type {
  PublicStats,
  PublicTestimonial,
} from "../../types/api/stats.type";

export const usePublicStats = () => {
  const fetchStats = async () => {
    const { data } = await axios.get<BaseResponse<PublicStats>>(
      Endpoints.public.stats,
    );
    return data.data;
  };

  return useQuery({
    queryKey: ["public/stats"],
    queryFn: fetchStats,
  });
};

export const useTestimonials = (limit = 6) => {
  const fetchTestimonials = async () => {
    const { data } = await axios.get<BaseResponse<PublicTestimonial[]>>(
      Endpoints.public.testimonials,
      { params: { limit } },
    );
    return data.data;
  };

  return useQuery({
    queryKey: ["public/testimonials", limit],
    queryFn: fetchTestimonials,
  });
};
