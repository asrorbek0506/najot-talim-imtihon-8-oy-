import { useState } from "react";
import { toast } from "react-toastify";
import { Icon } from "../../components/ui/Icon";
import {
  useAdminContact,
  useUpdateContactStatus,
} from "../../hooks/api/useAdminContent";
import type { ContactStatusType } from "../../types/api/admin-content.type";

const statusStyles: Record<ContactStatusType, string> = {
  new: "bg-blue-50 text-blue-600",
  read: "bg-gray-100 text-gray-500",
  replied: "bg-emerald-50 text-emerald-600",
};

const statusLabels: Record<ContactStatusType, string> = {
  new: "Yangi",
  read: "O'qilgan",
  replied: "Javob berilgan",
};

const Contact = () => {
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const { data, isLoading } = useAdminContact({
    page,
    limit: 10,
    status: status || undefined,
  });
  const { mutateAsync: updateStatus } = useUpdateContactStatus();

  const handleExpand = async (id: string, currentStatus: ContactStatusType) => {
    setExpandedId(expandedId === id ? null : id);
    if (currentStatus === "new") {
      try {
        await updateStatus({ id, status: "read" });
      } catch {
        // silent — bu faqat holatni yangilaydi, muhim emas
      }
    }
  };

  const handleMarkReplied = async (id: string) => {
    try {
      await updateStatus({ id, status: "replied" });
      toast.success("Murojaat 'javob berilgan' deb belgilandi");
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? "Xatolik yuz berdi");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Murojaatlar</h1>
          <p className="mt-1 text-sm text-gray-500">
            Jami {data?.total ?? 0} ta murojaat
          </p>
        </div>
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          className="rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
        >
          <option value="">Barcha holatlar</option>
          <option value="new">Yangi</option>
          <option value="read">O'qilgan</option>
          <option value="replied">Javob berilgan</option>
        </select>
      </div>

      <div className="space-y-3">
        {isLoading && <p className="text-sm text-gray-400">Yuklanmoqda...</p>}
        {!isLoading && (data?.items.length ?? 0) === 0 && (
          <p className="rounded-2xl border border-gray-100 bg-white py-16 text-center text-sm text-gray-500">
            Hech qanday murojaat topilmadi
          </p>
        )}

        {(data?.items ?? []).map((msg) => (
          <div
            key={msg.id}
            className="rounded-2xl border border-gray-100 bg-white shadow-sm"
          >
            <button
              onClick={() => handleExpand(msg.id, msg.status)}
              className="flex w-full items-center justify-between gap-x-4 p-5 text-left"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-x-2">
                  <p className="truncate text-sm font-semibold text-gray-900">
                    {msg.name}
                  </p>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${statusStyles[msg.status]}`}
                  >
                    {statusLabels[msg.status]}
                  </span>
                </div>
                <p className="mt-1 truncate text-xs text-gray-500">
                  {msg.subject || "Mavzu ko'rsatilmagan"}
                </p>
              </div>
              <span className="shrink-0 text-xs text-gray-400">
                {new Date(msg.createdAt).toLocaleDateString("uz-UZ")}
              </span>
            </button>

            {expandedId === msg.id && (
              <div className="border-t border-gray-100 p-5">
                <dl className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <dt className="text-xs text-gray-400">Email</dt>
                    <dd className="text-sm text-gray-900">{msg.email}</dd>
                  </div>
                  {msg.phone && (
                    <div>
                      <dt className="text-xs text-gray-400">Telefon</dt>
                      <dd className="text-sm text-gray-900">{msg.phone}</dd>
                    </div>
                  )}
                </dl>
                <p className="mt-3 text-sm leading-relaxed text-gray-700">
                  {msg.message}
                </p>

                {msg.status !== "replied" && (
                  <button
                    onClick={() => handleMarkReplied(msg.id)}
                    className="mt-4 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                  >
                    Javob berildi deb belgilash
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {data && data.totalPages > 1 && (
        <div className="flex items-center justify-center gap-x-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-400 disabled:opacity-50"
          >
            <Icon.arrowLeft />
          </button>
          <button
            onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
            disabled={page === data.totalPages}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-400 disabled:opacity-50"
          >
            <Icon.arrowRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default Contact;
