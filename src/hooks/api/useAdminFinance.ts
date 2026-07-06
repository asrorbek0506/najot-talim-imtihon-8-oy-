import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "../../config/axios";
import Endpoints from "../../config/endpoints";
import type { BaseResponse } from "../../types/auth.type";
import type { PaginatedResult } from "../../types/api/course.type";
import type {
  AdminCertificate,
  AdminEnrollment,
  AdminPayment,
  AdminReview,
  CreatePaymentPayload,
  PaymentStatusType,
} from "../../types/api/admin-finance.type";

// ---------------- Payments ----------------
interface QueryPaymentsParams {
  page?: number;
  limit?: number;
  search?: string;
  studentId?: string;
  courseId?: string;
  status?: string;
  method?: string;
  year?: number;
  month?: number;
}

export const useAdminPayments = (params: QueryPaymentsParams = {}) => {
  const fetchPayments = async () => {
    const { data } = await axios.get<
      BaseResponse<PaginatedResult<AdminPayment>>
    >(Endpoints.admin.payments, { params });
    return data.data;
  };
  return useQuery({
    queryKey: ["admin/payments", params],
    queryFn: fetchPayments,
    placeholderData: (previous) => previous,
  });
};

export const useAdminPayment = (id: string | undefined) => {
  const fetchPayment = async () => {
    const { data } = await axios.get<BaseResponse<AdminPayment>>(
      Endpoints.admin.payment(id as string),
    );
    return data.data;
  };
  return useQuery({
    queryKey: ["admin/payments", id],
    queryFn: fetchPayment,
    enabled: Boolean(id),
  });
};

export const useCreatePayment = () => {
  const queryClient = useQueryClient();
  const createPayment = async (payload: CreatePaymentPayload) => {
    const { data } = await axios.post<BaseResponse<AdminPayment>>(
      Endpoints.admin.payments,
      payload,
    );
    return data.data;
  };
  return useMutation({
    mutationFn: createPayment,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["admin/payments"] }),
  });
};

export const useUpdatePaymentStatus = () => {
  const queryClient = useQueryClient();
  const updateStatus = async ({
    id,
    status,
    notes,
  }: {
    id: string;
    status: PaymentStatusType;
    notes?: string;
  }) => {
    const { data } = await axios.patch<BaseResponse<AdminPayment>>(
      Endpoints.admin.paymentStatus(id),
      { status, notes },
    );
    return data.data;
  };
  return useMutation({
    mutationFn: updateStatus,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["admin/payments"] }),
  });
};

export const useRefundPayment = () => {
  const queryClient = useQueryClient();
  const refund = async ({ id, reason }: { id: string; reason?: string }) => {
    const { data } = await axios.post<BaseResponse<AdminPayment>>(
      Endpoints.admin.paymentRefund(id),
      { reason },
    );
    return data.data;
  };
  return useMutation({
    mutationFn: refund,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["admin/payments"] }),
  });
};

export const downloadReceipt = async (id: string) => {
  const response = await axios.get(Endpoints.admin.paymentReceipt(id), {
    responseType: "blob",
  });
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.download = `receipt-${id.slice(0, 8)}.pdf`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};

// ---------------- Enrollments ----------------
export const useAdminEnrollments = (
  params: { courseId?: string; status?: string } = {},
) => {
  const fetchEnrollments = async () => {
    const { data } = await axios.get<BaseResponse<AdminEnrollment[]>>(
      Endpoints.admin.enrollments,
      {
        params,
      },
    );
    return data.data;
  };
  return useQuery({
    queryKey: ["admin/enrollments", params],
    queryFn: fetchEnrollments,
  });
};

// ---------------- Certificates ----------------
export const useAdminCertificates = (
  params: { page?: number; limit?: number; search?: string } = {},
) => {
  const fetchCertificates = async () => {
    const { data } = await axios.get<
      BaseResponse<PaginatedResult<AdminCertificate>>
    >(Endpoints.admin.certificates, { params });
    return data.data;
  };
  return useQuery({
    queryKey: ["admin/certificates", params],
    queryFn: fetchCertificates,
    placeholderData: (previous) => previous,
  });
};

export const useRevokeCertificate = () => {
  const queryClient = useQueryClient();
  const revoke = async (id: string) => {
    const { data } = await axios.patch(Endpoints.admin.certificateRevoke(id));
    return data.data;
  };
  return useMutation({
    mutationFn: revoke,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["admin/certificates"] }),
  });
};

// ---------------- Reviews ----------------
export const useAdminReviews = (
  params: { page?: number; limit?: number; status?: string } = {},
) => {
  const fetchReviews = async () => {
    const { data } = await axios.get<
      BaseResponse<PaginatedResult<AdminReview>>
    >(Endpoints.admin.reviews, { params });
    return data.data;
  };
  return useQuery({
    queryKey: ["admin/reviews", params],
    queryFn: fetchReviews,
    placeholderData: (previous) => previous,
  });
};

export const useModerateReview = () => {
  const queryClient = useQueryClient();
  const moderate = async ({
    id,
    status,
  }: {
    id: string;
    status: "approved" | "rejected";
  }) => {
    const { data } = await axios.patch(Endpoints.admin.reviewModerate(id), {
      status,
    });
    return data.data;
  };
  return useMutation({
    mutationFn: moderate,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["admin/reviews"] }),
  });
};
