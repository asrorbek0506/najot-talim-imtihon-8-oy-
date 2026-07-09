import { useState } from "react";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import { toast } from "react-toastify";
import { Icon } from "../../components/ui/Icon";
import {
  useAdminCertificates,
  useRevokeCertificate,
} from "../../hooks/api/useAdminFinance";

const Certificates = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search);
  const [page, setPage] = useState(1);
  const { data, isLoading } = useAdminCertificates({
    page,
    limit: 10,
    search: debouncedSearch.trim() || undefined,
  });
  const { mutateAsync: revoke, isPending } = useRevokeCertificate();

  const handleRevoke = async (id: string) => {
    if (!window.confirm("Sertifikatni rostdan ham bekor qilmoqchimisiz?"))
      return;
    try {
      await revoke(id);
      toast.success("Sertifikat bekor qilindi");
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? "Xatolik yuz berdi");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Sertifikatlar</h1>
        <p className="mt-1 text-sm text-gray-500">
          Jami {data?.total ?? 0} ta sertifikat berilgan
        </p>
      </div>

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

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-xs uppercase tracking-wide text-gray-400">
                <th className="px-6 py-3 font-medium">Talaba</th>
                <th className="px-6 py-3 font-medium">Kurs</th>
                <th className="px-6 py-3 font-medium">Seriya raqami</th>
                <th className="px-6 py-3 font-medium">Berilgan sana</th>
                <th className="px-6 py-3 font-medium">Holat</th>
                <th className="px-6 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {(data?.items ?? []).map((cert) => (
                <tr
                  key={cert.id}
                  className="transition-colors hover:bg-gray-50"
                >
                  <td className="px-6 py-3.5 font-medium text-gray-900">
                    {cert.student.user.firstName} {cert.student.user.lastName}
                  </td>
                  <td className="px-6 py-3.5 text-gray-600">
                    {cert.course.name}
                  </td>
                  <td className="px-6 py-3.5 text-gray-600">{cert.serialNo}</td>
                  <td className="px-6 py-3.5 text-gray-500">
                    {new Date(cert.issuedAt).toLocaleDateString("uz-UZ")}
                  </td>
                  <td className="px-6 py-3.5">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                        cert.status === "issued"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {cert.status === "issued" ? "Berilgan" : "Bekor qilingan"}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 text-right">
                    {cert.status === "issued" && (
                      <button
                        onClick={() => handleRevoke(cert.id)}
                        disabled={isPending}
                        className="text-sm font-medium text-red-500 hover:text-red-600"
                      >
                        Bekor qilish
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!isLoading && (data?.items.length ?? 0) === 0 && (
          <p className="py-16 text-center text-sm text-gray-500">
            Hech qanday sertifikat topilmadi
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

export default Certificates;
