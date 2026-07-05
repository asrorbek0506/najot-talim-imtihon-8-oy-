import { Link } from "react-router-dom";
import { Icon } from "../ui/Icon";
import SectionHeading from "../ui/SectionHeading";
import TeacherCard from "../ui/TeacherCard";
import { useInstructors } from "../../hooks/api/useInstructors";

const Teachers = () => {
  const { data, isLoading } = useInstructors({ limit: 3 });
  const teachers = data?.items ?? [];

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Jamoamiz"
          title="Bizning o'qituvchilar"
          subtitle="Soha mutaxassislari sizga bilim va tajriba ulashishga tayyor."
        />

        {isLoading ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }, (_, i) => (
              <div
                key={i}
                className="h-56 animate-pulse rounded-2xl bg-gray-100"
              />
            ))}
          </div>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teachers.map((teacher) => (
              <TeacherCard key={teacher.id} teacher={teacher} />
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            to="/teachers"
            className="inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Barcha o'qituvchilarni ko'rish <Icon.arrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Teachers;
