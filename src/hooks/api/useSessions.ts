import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "../../config/axios";
import Endpoints from "../../config/endpoints";
import type { BaseResponse } from "../../types/auth.type";

export interface UserSession {
  id: string;
  ipAddress: string | null;
  userAgent: string | null;
  device: string | null;
  lastActiveAt: string;
  createdAt: string;
  expiresAt: string;
}

export const useSessions = () => {
  const fetchSessions = async () => {
    const { data } = await axios.get<BaseResponse<UserSession[]>>(
      Endpoints.user.sessions,
    );
    return data.data;
  };
  return useQuery({ queryKey: ["user/sessions"], queryFn: fetchSessions });
};

export const useRevokeSession = () => {
  const queryClient = useQueryClient();
  const revoke = async (id: string) => {
    const { data } = await axios.delete(Endpoints.user.session(id));
    return data.data;
  };
  return useMutation({
    mutationFn: revoke,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["user/sessions"] }),
  });
};
