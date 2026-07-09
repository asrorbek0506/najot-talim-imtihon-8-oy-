import { useMutation } from "@tanstack/react-query";
import axios from "../../config/axios";
import Endpoints from "../../config/endpoints";

export const useVerifyEmail = () => {
  const verifyEmail = async (token: string) => {
    const { data } = await axios.post(Endpoints.auth.verifyEmail, { token });
    return data.data;
  };
  return useMutation({ mutationFn: verifyEmail });
};
