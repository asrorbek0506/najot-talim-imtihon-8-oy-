import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Icon } from "../../components/ui/Icon";
import Button from "../../components/ui/Button";
import {
  downloadReceipt,
  useAdminPayment,
  useRefundPayment,
  useUpdatePaymentStatus,
} from "../../hooks/api/useAdminFinance";
import { formatPrice } from "../../utils/format";
import type { PaymentStatusType } from "../../types/api/admin-finance.type";

const statusLabels: Record<PaymentStatusType, string> = {
  pending: "Kutilmoqda",
  paid: "To'landi",
  refunded: "Qaytarildi",
  failed: "Amalga oshmadi",
};

const PaymentDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: payment, isLoading } = useAdminPayment(id);
  const { mutateAsync: updateStatus, isPending: isUpdating } =
    useUpdatePaymentStatus();
  const { mutateAsync: refund, isPending: isRefunding } = useRefundPayment();
  const [isDownloading, setIsDownloading] = useState(false);

  if (isLoading) {
    return (
      <div className="animate-pulse text-sm text-gray-400">Yuklanmoqda...</div>
    );
  }

  if (!payment) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
        <h1 className="text-xl font-bold text-gray-900">To'lov topilmadi</h1>
        <Link to="/admin/payments" className="mt-6">
          <Button>To'lovlar ro'yxatiga qaytish</Button>
        </Link>
      </div>
    );
  }

  const paymentStatus: PaymentStatusType = payment.status;

  const handleStatusChange = async (status: PaymentStatusType) => {
    if (!id) return;
    try {
      await updateStatus({ id, status });
      toast.success("To'lov holati yangilandi");
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? "Xatolik yuz berdi");
    }
  };

  const handleRefund = async () => {
    if (!id) return;
    if (!window.confirm("To'lovni rostdan ham qaytarmoqchimisiz?")) return;
    try {
      await refund({ id, reason: "Admin tomonidan qaytarildi" });
      toast.success("To'lov qaytarildi");
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? "Xatolik yuz berdi");
    }
  };

  const handleDownload = async () => {
    if (!id) return;
    setIsDownloading(true);
    try {
      await downloadReceipt(id);
    } catch {
      toast.error("Kvitansiyani yuklab olishda xatolik");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Link
        to="/admin/payments"
        className="flex w-fit items-center gap-x-2 text-sm font-medium text-gray-600 hover:text-gray-900"
      >
        <Icon.arrowLeft />
        To'lovlar ro'yxati
      </Link>

      <div className="mx-auto max-w-2xl space-y-6">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-bold text-gray-900">
              To'lov tafsiloti
            </h1>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                paymentStatus === "paid"
                  ? "bg-emerald-50 text-emerald-600"
                  : paymentStatus === "refunded"
                    ? "bg-purple-50 text-purple-600"
                    : "bg-orange-50 text-orange-600"
              }`}
            >
              {statusLabels[paymentStatus]}
            </span>
          </div>

          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs text-gray-400">Talaba</dt>
              <dd className="mt-1 text-sm font-medium text-gray-900">
                {payment.student.user.firstName} {payment.student.user.lastName}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-gray-400">Kurs</dt>
              <dd className="mt-1 text-sm font-medium text-gray-900">
                {payment.course.name}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-gray-400">Summa</dt>
              <dd className="mt-1 text-sm font-medium text-gray-900">
                {formatPrice(payment.amount)}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-gray-400">To'lov usuli</dt>
              <dd className="mt-1 text-sm font-medium text-gray-900">
                {payment.method}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-gray-400">Yaratilgan sana</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {new Date(payment.createdAt).toLocaleString("uz-UZ")}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-gray-400">To'langan sana</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {payment.paidAt
                  ? new Date(payment.paidAt).toLocaleString("uz-UZ")
                  : "—"}
              </dd>
            </div>
            {payment.transactionId && (
              <div className="sm:col-span-2">
                <dt className="text-xs text-gray-400">Tranzaksiya ID</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {payment.transactionId}
                </dd>
              </div>
            )}
            {payment.notes && (
              <div className="sm:col-span-2">
                <dt className="text-xs text-gray-400">Izoh</dt>
                <dd className="mt-1 text-sm text-gray-900">{payment.notes}</dd>
              </div>
            )}
          </dl>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-base font-bold text-gray-900">Amallar</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {payment.status === "pending" && (
              <button
                onClick={() => handleStatusChange("paid")}
                disabled={isUpdating}
                className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-60"
              >
                To'langan deb belgilash
              </button>
            )}
            {payment.status === "paid" && (
              <button
                onClick={handleRefund}
                disabled={isRefunding}
                className="rounded-lg border border-purple-200 px-4 py-2.5 text-sm font-medium text-purple-600 hover:bg-purple-50 disabled:opacity-60"
              >
                {isRefunding
                  ? "Qaytarilmoqda..."
                  : "To'lovni qaytarish (refund)"}
              </button>
            )}
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex items-center gap-x-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-60"
            >
              <Icon.download />
              {isDownloading ? "Yuklanmoqda..." : "Kvitansiya (PDF)"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
