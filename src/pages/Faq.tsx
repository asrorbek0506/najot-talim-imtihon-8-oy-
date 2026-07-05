import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "../components/ui/PageHero";
import Button from "../components/ui/Button";
import { Icon } from "../components/ui/Icon";
import { faqs } from "../data/home.data";

const Faq = () => {
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filtered = useMemo(
    () =>
      faqs.filter((faq) =>
        faq.question.toLowerCase().includes(search.trim().toLowerCase()),
      ),
    [search],
  );

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <PageHero
        breadcrumb="Ko'p so'raladigan savollar"
        title="Ko'p so'raladigan savollar"
        subtitle="Kurslar, to'lov va ro'yxatdan o'tish bo'yicha eng ko'p beriladigan savollarga javoblar."
      />

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <label className="relative block">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <Icon.search />
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Savolingizni qidiring..."
              className="w-full rounded-xl border border-gray-200 py-3.5 pl-12 pr-4 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </label>

          {filtered.length === 0 ? (
            <p className="mt-10 text-center text-sm text-gray-500">
              Hech qanday mos savol topilmadi.
            </p>
          ) : (
            <div className="mt-8 divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-100">
              {filtered.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div key={faq.question}>
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="flex w-full items-center justify-between gap-x-4 bg-white px-6 py-5 text-left transition-colors hover:bg-gray-50"
                    >
                      <span className="text-sm font-semibold text-gray-900">
                        {faq.question}
                      </span>
                      <span
                        className={`shrink-0 text-gray-400 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      >
                        <Icon.chevronDown />
                      </span>
                    </button>
                    {isOpen && (
                      <div className="bg-gray-50/60 px-6 pb-5">
                        <p className="text-sm leading-relaxed text-gray-600">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          <div className="mt-14 rounded-2xl bg-blue-600 p-8 text-center text-white">
            <h2 className="text-xl font-bold">Javob topa olmadingizmi?</h2>
            <p className="mt-2 text-sm text-blue-100">
              Konsultantlarimiz sizga savollaringiz bo'yicha yordam berishga
              tayyor.
            </p>
            <Link to="/contact" className="mt-5 inline-block">
              <Button variant="google" rightIcon={<Icon.arrowRight />}>
                Biz bilan bog'lanish
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Faq;
