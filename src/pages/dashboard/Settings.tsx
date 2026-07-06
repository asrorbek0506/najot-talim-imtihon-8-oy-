import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Icon } from "../../components/ui/Icon";
import { useRevokeSession, useSessions } from "../../hooks/api/useSessions";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString("uz-UZ", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const Settings = () => {
  const { data: sessions, isLoading } = useSessions();
  const { mutateAsync: revokeSession, isPending } = useRevokeSession();

  const handleRevoke = async (id: string) => {
    try {
      await revokeSession(id);
      toast.success("Sessiya tugatildi");
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? "Xatolik yuz berdi");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Faol sessiyalar</h1>
        <p className="mt-1 text-sm text-gray-500">
          Hisobingizga kirilgan barcha qurilmalar ro'yxati. Tanimagan sessiyani
          darhol tugating.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        {isLoading ? (
          <p className="text-sm text-gray-400">Yuklanmoqda...</p>
        ) : !sessions || sessions.length === 0 ? (
          <p className="text-sm text-gray-500">Faol sessiyalar topilmadi.</p>
        ) : (
          <div className="divide-y divide-gray-100">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between gap-x-4 py-4"
              >
                <div className="flex items-center gap-x-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon.settings />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {session.device || "Noma'lum qurilma"}
                    </p>
                    <p className="text-xs text-gray-400">
                      {session.ipAddress ? `${session.ipAddress} · ` : ""}
                      Oxirgi faollik: {formatDate(session.lastActiveAt)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleRevoke(session.id)}
                  disabled={isPending}
                  className="rounded-lg border border-red-100 px-3.5 py-2 text-xs font-medium text-red-500 transition-colors hover:bg-red-50"
                >
                  Tugatish
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-gray-900">Parol</h2>
            <p className="mt-1 text-xs text-gray-500">
              Parolingizni muntazam yangilab turing.
            </p>
          </div>
          <Link
            to="/dashboard/profile"
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            O'zgartirish
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Settings;
