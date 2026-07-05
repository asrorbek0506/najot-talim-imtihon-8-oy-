import { useMutation } from "@tanstack/react-query";
import axios from "../../config/axios";
import Endpoints from "../../config/endpoints";
import type { BaseResponse } from "../../types/auth.type";
import type { CreateContactPayload } from "../../types/api/contact.type";

export const useSubmitContact = () => {
  const submitContact = async (payload: CreateContactPayload) => {
    const { data } = await axios.post<BaseResponse<{ message: string }>>(
      Endpoints.public.contact,
      payload,
    );
    return data.data;
  };

  return useMutation({ mutationFn: submitContact });
};
