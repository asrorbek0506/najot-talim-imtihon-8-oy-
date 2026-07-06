export type PaymentStatusType = "pending" | "paid" | "refunded" | "failed";
export type PaymentMethodType = "payme" | "click" | "card";

export interface AdminPayment {
  id: string;
  amount: string | number;
  method: PaymentMethodType;
  status: PaymentStatusType;
  paidAt: string | null;
  transactionId: string | null;
  notes: string | null;
  createdAt: string;
  student: {
    id: string;
    studentId: string;
    user: {
      firstName: string;
      lastName: string;
      phone?: string;
      email?: string;
    };
  };
  course: { id: string; name: string; slug?: string; price?: string | number };
}

export interface CreatePaymentPayload {
  studentId: string;
  courseId: string;
  amount: number;
  method: PaymentMethodType;
  status?: PaymentStatusType;
  paidAt?: string;
  transactionId?: string;
  notes?: string;
}

export interface AdminEnrollment {
  id: string;
  status: "active" | "completed" | "cancelled" | "refunded";
  progress: number;
  enrolledAt: string;
  completedAt: string | null;
  course: { id: string; name: string };
  student: {
    studentId: string;
    user: { firstName: string; lastName: string };
  };
}

export type CertificateStatus = "issued" | "revoked";

export interface AdminCertificate {
  id: string;
  serialNo: string;
  issuedAt: string;
  status: CertificateStatus;
  course: { id: string; name: string };
  student: {
    studentId: string;
    user: { firstName: string; lastName: string };
  };
}

export type ReviewStatusType = "pending" | "approved" | "rejected";

export interface AdminReview {
  id: string;
  rating: number;
  text: string | null;
  status: ReviewStatusType;
  createdAt: string;
  course: { id: string; name: string };
  student: {
    user: { firstName: string; lastName: string; avatarUrl?: string | null };
  };
}
