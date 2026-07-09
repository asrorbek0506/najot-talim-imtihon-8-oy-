import { useMutation } from "@tanstack/react-query";
import axios from "../../config/axios";
import Endpoints from "../../config/endpoints";

interface ForgotPasswordPayload {
  email: string;
}

interface ResetPasswordPayload {
  token: string;
  newPassword: string;
}

export const useForgotPassword = () => {
  const forgotPassword = async (payload: ForgotPasswordPayload) => {
    const { data } = await axios.post(Endpoints.auth.forgotPassword, payload);
    return data.data;
  };
  return useMutation({ mutationFn: forgotPassword });
};

export const useResetPassword = () => {
  const resetPassword = async (payload: ResetPasswordPayload) => {
    const { data } = await axios.post(Endpoints.auth.resetPassword, payload);
    return data.data;
  };
  return useMutation({ mutationFn: resetPassword });
};
