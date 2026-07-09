import { useState } from "react";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import { Link } from "react-router-dom";
import { Icon } from "../../components/ui/Icon";
import { useAdminPayments } from "../../hooks/api/useAdminFinance";
import { formatPrice } from "../../utils/format";
import type {
  AdminPayment,
  PaymentStatusType,
} from "../../types/api/admin-finance.type";

const statusStyles: Record<PaymentStatusType, string> = {
  pending: "bg-orange-50 text-orange-600",
  paid: "bg-emerald-50 text-emerald-600",
  refunded: "bg-purple-50 text-purple-600",
  failed: "bg-red-50 text-red-600",
};

const statusLabels: Record<PaymentStatusType, string> = {
  pending: "Kutilmoqda",
  paid: "To'landi",
  refunded: "Qaytarildi",
  failed: "Amalga oshmadi",
};

const Payments = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search);
  const [status, setStatus] = useState<"" | PaymentStatusType>("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useAdminPayments({
    page,
    limit: 10,
    search: debouncedSearch.trim() || undefined,
    status: status || undefined,
  });

  const totalPaid = (data?.items ?? [])
    .filter((p) => p.status === "paid")
    .reduce((sum, p) => sum + Number(p.amount), 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">To'lovlar</h1>
          <p className="mt-1 text-sm text-gray-500">
            Jami {data?.total ?? 0} ta to'lov yozuvi
          </p>
        </div>
        <Link
          to="/admin/payments/new"
          className="flex items-center justify-center gap-x-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          <Icon.plus />
          Yangi to'lov
        </Link>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <p className="text-sm text-gray-500">
          Ushbu sahifadagi to'langan summa
        </p>
        <p className="mt-1 text-2xl font-bold text-gray-900">
          {formatPrice(totalPaid)}
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative block w-full max-w-sm">
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon.search />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Talaba yoki kurs qidirish..."
            className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-11 pr-4 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </label>
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value as "" | PaymentStatusType);
            setPage(1);
          }}
          className="rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
        >
          <option value="">Barcha holatlar</option>
          <option value="pending">Kutilmoqda</option>
          <option value="paid">To'landi</option>
          <option value="refunded">Qaytarildi</option>
          <option value="failed">Amalga oshmadi</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-xs uppercase tracking-wide text-gray-400">
                <th className="px-6 py-3 font-medium">Talaba</th>
                <th className="px-6 py-3 font-medium">Kurs</th>
                <th className="px-6 py-3 font-medium">Summa</th>
                <th className="px-6 py-3 font-medium">Usul</th>
                <th className="px-6 py-3 font-medium">Sana</th>
                <th className="px-6 py-3 font-medium">Holat</th>
                <th className="px-6 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {(data?.items ?? []).map((payment: AdminPayment) => (
                <tr
                  key={payment.id}
                  className="transition-colors hover:bg-gray-50"
                >
                  <td className="px-6 py-3.5 font-medium text-gray-900">
                    {payment.student.user.firstName}{" "}
                    {payment.student.user.lastName}
                  </td>
                  <td className="px-6 py-3.5 text-gray-600">
                    {payment.course.name}
                  </td>
                  <td className="px-6 py-3.5 text-gray-900">
                    {formatPrice(payment.amount)}
                  </td>
                  <td className="px-6 py-3.5 text-gray-600">
                    {payment.method}
                  </td>
                  <td className="px-6 py-3.5 text-gray-500">
                    {new Date(payment.createdAt).toLocaleDateString("uz-UZ")}
                  </td>
                  <td className="px-6 py-3.5">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[payment.status]}`}
                    >
                      {statusLabels[payment.status]}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 text-right">
                    <Link
                      to={`/admin/payments/${payment.id}`}
                      className="text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                      Ko'rish
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!isLoading && (data?.items.length ?? 0) === 0 && (
          <p className="py-16 text-center text-sm text-gray-500">
            Hech qanday to'lov topilmadi
          </p>
        )}

        {data && data.totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4">
            <p className="text-xs text-gray-400">
              {data.page} / {data.totalPages} sahifa
            </p>
            <div className="flex items-center gap-x-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-400 disabled:opacity-50"
              >
                <Icon.arrowLeft />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
                disabled={page === data.totalPages}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-400 disabled:opacity-50"
              >
                <Icon.arrowRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payments;
