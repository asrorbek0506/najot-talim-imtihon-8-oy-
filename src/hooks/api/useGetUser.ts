import { useQuery } from "@tanstack/react-query";
import Endpoints from "../../config/endpoints";
import axios from "../../config/axios";
import { getItem } from "../../utils/localstorage";
import type { BaseResponse, AuthUser } from "../../types/auth.type";

const useGetUser = () => {
  const token = getItem();

  const getUser = async () => {
    return await axios.get<BaseResponse<AuthUser>>(Endpoints.auth.me);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["user/me"],
    queryFn: getUser,
    enabled: Boolean(token),
    retry: false,
  });

  return { data, isLoading, isError };
};

export default useGetUser;
