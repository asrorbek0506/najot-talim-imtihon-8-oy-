import { Icon } from "../../components/ui/Icon";
import { paymentHistory } from "../../data/dashboard.data";

const statusStyles: Record<string, string> = {
  paid: "bg-emerald-50 text-emerald-600",
  pending: "bg-orange-50 text-orange-600",
  failed: "bg-red-50 text-red-600",
};

const statusLabels: Record<string, string> = {
  paid: "To'landi",
  pending: "Kutilmoqda",
  failed: "Amalga oshmadi",
};

const parseAmount = (amount: string) => Number(amount.replace(/[^\d]/g, ""));

const Payments = () => {
  const totalPaid = paymentHistory
    .filter((p) => p.status === "paid")
    .reduce((sum, p) => sum + parseAmount(p.amount), 0);
  const totalPending = paymentHistory
    .filter((p) => p.status === "pending")
    .reduce((sum, p) => sum + parseAmount(p.amount), 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">To'lovlar</h1>
        <p className="mt-1 text-sm text-gray-500">
          To'lovlar tarixi va hisob-fakturalaringiz.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <Icon.creditCard />
          </span>
          <p className="mt-4 text-2xl font-bold text-gray-900">
            {totalPaid.toLocaleString("uz-UZ")} so'm
          </p>
          <p className="mt-1 text-sm text-gray-500">Jami to'langan</p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
            <Icon.clock />
          </span>
          <p className="mt-4 text-2xl font-bold text-gray-900">
            {totalPending.toLocaleString("uz-UZ")} so'm
          </p>
          <p className="mt-1 text-sm text-gray-500">To'lov kutilmoqda</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900">To'lovlar tarixi</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-xs uppercase tracking-wide text-gray-400">
                <th className="px-6 py-3 font-medium">Sana</th>
                <th className="px-6 py-3 font-medium">Kurs</th>
                <th className="px-6 py-3 font-medium">Summa</th>
                <th className="px-6 py-3 font-medium">Usul</th>
                <th className="px-6 py-3 font-medium">Holat</th>
                <th className="px-6 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paymentHistory.map((payment) => (
                <tr
                  key={payment.id}
                  className="transition-colors hover:bg-gray-50"
                >
                  <td className="px-6 py-4 text-gray-600">{payment.date}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {payment.course}
                  </td>
                  <td className="px-6 py-4 text-gray-900">{payment.amount}</td>
                  <td className="px-6 py-4 text-gray-600">{payment.method}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                        statusStyles[payment.status]
                      }`}
                    >
                      {statusLabels[payment.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {payment.status === "paid" ? (
                      <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                        Yuklab olish
                      </button>
                    ) : (
                      <button className="text-sm font-medium text-orange-600 hover:text-orange-700">
                        To'lash
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Payments;
