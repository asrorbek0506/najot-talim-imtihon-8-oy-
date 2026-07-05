import SectionHeading from "../ui/SectionHeading";
import CourseCard from "../courses/CourseCard";
import type { ApiCourseListItem } from "../../types/api/course.type";

const RelatedCourses = ({ courses }: { courses: ApiCourseListItem[] }) => {
  if (courses.length === 0) return null;

  return (
    <section className="border-t border-gray-100 bg-gray-50/50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Shunga o'xshash"
          title="Boshqa mos kurslar"
          subtitle="Sizni qiziqtirishi mumkin bo'lgan boshqa kurslarimiz."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedCourses;
