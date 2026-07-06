import { Link } from "react-router-dom";
import PageHero from "../components/ui/PageHero";
import Button from "../components/ui/Button";
import { Icon } from "../components/ui/Icon";
import CourseCard from "../components/courses/CourseCard";
import { useCourses } from "../hooks/api/useCourses";

const steps = [
  {
    number: "01",
    title: "Kursni tanlang",
    description:
      "O'zingizga mos yo'nalish va darajadagi kursni katalogdan tanlang.",
    icon: <Icon.search />,
  },
  {
    number: "02",
    title: "Ro'yxatdan o'ting",
    description:
      "Bir necha daqiqada hisob yarating va shaxsiy ma'lumotlaringizni kiriting.",
    icon: <Icon.user />,
  },
  {
    number: "03",
    title: "To'lovni amalga oshiring",
    description:
      "Qulay to'lov usullaridan birini tanlab, kurs narxini to'lang.",
    icon: <Icon.creditCard />,
  },
  {
    number: "04",
    title: "O'qishni boshlang",
    description:
      "Shaxsiy kabinetingizga kiring va darslarni ko'rishni boshlang.",
    icon: <Icon.play />,
  },
];

const Enroll = () => {
  const { data, isLoading } = useCourses({
    limit: 4,
    sortBy: "createdAt",
    order: "desc",
  });

  const courses = data?.items ?? [];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <PageHero
        breadcrumb="Onlayn kursga yozilish"
        title="Onlayn kursga yozilish"
        subtitle="O'qishni boshlash uchun atigi 4 ta oddiy qadam. Bugunoq boshlang va yangi kasbga birinchi qadamni tashlang."
      />

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-blue-600">
              Jarayon
            </span>
            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              O'qishni boshlash — 4 qadam
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div
                key={step.number}
                className="relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <span className="text-sm font-bold text-blue-100">
                  {step.number}
                </span>
                <span className="mt-3 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  {step.icon}
                </span>
                <h3 className="mt-4 text-base font-bold text-gray-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-gray-100 bg-gray-50/60 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                Kurslar
              </span>
              <h2 className="mt-2 text-3xl font-bold text-gray-900">
                Mashhur onlayn kurslar
              </h2>
            </div>
            <Link
              to="/courses"
              className="text-sm font-semibold text-blue-600 hover:underline"
            >
              Barcha kurslarni ko'rish →
            </Link>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {isLoading
              ? Array.from({ length: 4 }, (_, i) => (
                  <div
                    key={i}
                    className="h-80 animate-pulse rounded-2xl border border-gray-100 bg-white"
                  />
                ))
              : courses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
          </div>
        </div>
      </section>

      <section className="bg-linear-to-br from-blue-600 via-blue-600 to-indigo-700 py-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 text-center text-white sm:px-6">
          <h2 className="text-3xl font-bold">Hoziroq bilim olishni boshlang</h2>
          <p className="text-blue-100">
            Ro'yxatdan o'ting va o'zingizga mos kursni tanlab, kelajakdagi
            kasbingiz sari birinchi qadamni tashlang.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to="/register">
              <Button
                rightIcon={<Icon.arrowRight />}
                className="!bg-white !text-blue-700 hover:!bg-blue-50"
              >
                Ro'yxatdan o'tish
              </Button>
            </Link>
            <Link to="/courses">
              <Button className="!bg-white/10 !text-white border border-white/30 hover:!bg-white/20">
                Kurslarni ko'rish
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Enroll;
