import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "../../config/axios";
import Endpoints from "../../config/endpoints";
import { clearTokens, getRefreshToken } from "../../utils/localstorage";
import useUserStore from "../../store/user.store";

export const useLogout = () => {
  const navigate = useNavigate();
  const logoutStore = useUserStore((state) => state.logout);

  const onLogout = async () => {
    const refreshToken = getRefreshToken();
    if (refreshToken) {
      try {
        await axios.post(Endpoints.auth.logout, { refreshToken });
      } catch {
        // Sessiya allaqachon tugagan bo'lishi mumkin — baribir tozalaymiz
      }
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: onLogout,
    onSettled: () => {
      clearTokens();
      logoutStore();
      navigate("/login");
    },
  });

  return { logout: mutate, isPending };
};

export default useLogout;
