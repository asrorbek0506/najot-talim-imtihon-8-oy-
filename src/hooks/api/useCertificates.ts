import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "../../config/axios";
import Endpoints from "../../config/endpoints";
import type { BaseResponse } from "../../types/auth.type";
import type { MyCertificate } from "../../types/api/certificate.type";

export const useMyCertificates = () => {
  const fetchCertificates = async () => {
    const { data } = await axios.get<BaseResponse<MyCertificate[]>>(
      Endpoints.student.certificates,
    );
    return data.data;
  };

  return useQuery({
    queryKey: ["student/certificates"],
    queryFn: fetchCertificates,
  });
};

export const useClaimCertificate = () => {
  const queryClient = useQueryClient();

  const claim = async (courseId: string) => {
    const { data } = await axios.post<BaseResponse<MyCertificate>>(
      Endpoints.student.claimCertificate(courseId),
    );
    return data.data;
  };

  return useMutation({
    mutationFn: claim,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student/certificates"] });
    },
  });
};
