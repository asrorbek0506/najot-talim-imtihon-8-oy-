import { useMutation } from "@tanstack/react-query";
import axios from "../../config/axios";
import Endpoints from "../../config/endpoints";

interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export const useChangePassword = () => {
  const changePassword = async (payload: ChangePasswordPayload) => {
    const { data } = await axios.patch(Endpoints.user.password, payload);
    return data.data;
  };

  return useMutation({ mutationFn: changePassword });
};
