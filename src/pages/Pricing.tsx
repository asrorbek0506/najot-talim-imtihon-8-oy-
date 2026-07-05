import { Link } from "react-router-dom";
import PageHero from "../components/ui/PageHero";
import Button from "../components/ui/Button";
import SectionHeading from "../components/ui/SectionHeading";
import { Icon } from "../components/ui/Icon";
import {
  comparisonRows,
  paymentMethods,
  pricingPlans,
} from "../data/pricing.data";

const renderCell = (value: boolean | string) => {
  if (typeof value === "string") {
    return <span className="text-sm text-gray-700">{value}</span>;
  }
  return value ? (
    <span className="mx-auto flex h-5 w-5 items-center justify-center text-emerald-500">
      <Icon.checkCircle />
    </span>
  ) : (
    <span className="mx-auto block h-px w-4 bg-gray-300" />
  );
};

const Pricing = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <PageHero
        breadcrumb="Narxlar"
        title="Har bir kurs uchun adolatli narx"
        subtitle="Byudjetingiz va maqsadingizga mos tarifni tanlang. Barcha tariflar bo'lib to'lash imkoniyatiga ega."
      />

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-2xl border p-8 ${
                  plan.popular
                    ? "border-blue-600 bg-blue-600 text-white shadow-xl"
                    : "border-gray-100 bg-white shadow-sm"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-orange-500 px-3.5 py-1 text-xs font-semibold text-white">
                    Eng ommabop
                  </span>
                )}

                <h3
                  className={`text-lg font-bold ${plan.popular ? "text-white" : "text-gray-900"}`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`mt-2 text-sm ${plan.popular ? "text-blue-100" : "text-gray-500"}`}
                >
                  {plan.desc}
                </p>

                <div className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span
                    className={plan.popular ? "text-blue-100" : "text-gray-500"}
                  >
                    so'm/{plan.period}
                  </span>
                </div>

                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-x-2.5 text-sm"
                    >
                      <span
                        className={`mt-0.5 shrink-0 ${plan.popular ? "text-white" : "text-emerald-500"}`}
                      >
                        <Icon.checkCircle />
                      </span>
                      <span
                        className={
                          plan.popular ? "text-blue-50" : "text-gray-600"
                        }
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link to="/register" className="mt-8">
                  <Button
                    fullWidth
                    variant={plan.popular ? "google" : "primary"}
                    className={
                      plan.popular
                        ? "!bg-white !text-blue-600 hover:!bg-blue-50"
                        : ""
                    }
                  >
                    Tanlash
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-gray-500">
            <span className="font-medium text-gray-700">To'lov usullari:</span>
            {paymentMethods.map((method) => (
              <span key={method} className="flex items-center gap-x-1.5">
                <Icon.creditCard />
                {method}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-gray-100 bg-gray-50/50 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Solishtirish"
            title="Tariflarni batafsil solishtiring"
            subtitle="Har bir tarifda nima borligini aniq ko'ring va o'zingizga mosini tanlang."
          />

          <div className="mt-10 overflow-x-auto rounded-2xl border border-gray-100 bg-white">
            <table className="w-full min-w-[640px] text-center text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">
                    Imkoniyat
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-900">
                    Boshlang'ich
                  </th>
                  <th className="px-6 py-4 font-semibold text-blue-600">
                    Standart
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-900">
                    Premium
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {comparisonRows.map((row) => (
                  <tr key={row.feature}>
                    <td className="px-6 py-4 text-left font-medium text-gray-700">
                      {row.feature}
                    </td>
                    <td className="px-6 py-4">{renderCell(row.starter)}</td>
                    <td className="px-6 py-4">{renderCell(row.standard)}</td>
                    <td className="px-6 py-4">{renderCell(row.premium)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Savollaringiz bormi?
          </h2>
          <p className="mt-3 text-gray-500">
            To'lov shartlari va tariflar haqida ko'proq bilish uchun ko'p
            so'raladigan savollar sahifasiga tashrif buyuring.
          </p>
          <Link to="/faq" className="mt-6 inline-block">
            <Button rightIcon={<Icon.arrowRight />}>Savollarni ko'rish</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
