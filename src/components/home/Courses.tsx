import { Link } from "react-router-dom";
import { Icon } from "../ui/Icon";
import SectionHeading from "../ui/SectionHeading";
import CourseCard from "../courses/CourseCard";
import { useCourses } from "../../hooks/api/useCourses";

const Courses = () => {
  const { data, isLoading } = useCourses({ featured: true, limit: 4 });
  const featured = data?.items ?? [];

  return (
    <section id="kurslar" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Mashhur kurslar"
          title="Eng yaxshi ko'rinadigan kurslarimiz"
          subtitle="Mehnat bozorida eng talab qilinadigan zamonaviy yo'nalishlar bo'yicha amaliy ta'lim."
        />

        {isLoading ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }, (_, i) => (
              <div
                key={i}
                className="h-80 animate-pulse rounded-2xl bg-gray-100"
              />
            ))}
          </div>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            to="/courses"
            className="inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Barcha kurslarni ko'rish <Icon.arrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Courses;
