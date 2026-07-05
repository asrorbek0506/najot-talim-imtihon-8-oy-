import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import CourseHero from "../components/course-details/CourseHero";
import CourseSidebar from "../components/course-details/CourseSidebar";
import CourseLearnings from "../components/course-details/CourseLearnings";
import CourseCurriculum from "../components/course-details/CourseCurriculum";
import CourseInstructor from "../components/course-details/CourseInstructor";
import CourseReviews from "../components/course-details/CourseReviews";
import RelatedCourses from "../components/course-details/RelatedCourses";
import Button from "../components/ui/Button";
import { useCourseBySlug, useCourses } from "../hooks/api/useCourses";

const CourseDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: course, isLoading, isError } = useCourseBySlug(slug);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  const { data: relatedData } = useCourses(
    course ? { category: course.category, limit: 5 } : {},
  );

  const related = useMemo(
    () =>
      (relatedData?.items ?? []).filter((c) => c.id !== course?.id).slice(0, 4),
    [relatedData, course],
  );

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl animate-pulse px-4 py-16 sm:px-6 lg:px-8">
        <div className="h-64 rounded-2xl bg-gray-100" />
        <div className="mt-8 h-6 w-1/2 rounded bg-gray-100" />
        <div className="mt-4 h-4 w-1/3 rounded bg-gray-100" />
      </div>
    );
  }

  if (isError || !course) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Kurs topilmadi</h1>
        <p className="mt-2 text-sm text-gray-500">
          Siz izlagan kurs mavjud emas yoki o'chirilgan bo'lishi mumkin.
        </p>
        <Link to="/courses" className="mt-6">
          <Button>Barcha kurslarga qaytish</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <CourseHero course={course} />

      <section className="py-14">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          <div className="space-y-12 lg:col-span-2">
            <CourseLearnings course={course} />
            <CourseCurriculum course={course} />
            <CourseInstructor course={course} />
            <CourseReviews course={course} />
          </div>

          <div className="lg:col-span-1">
            <CourseSidebar course={course} />
          </div>
        </div>
      </section>

      <RelatedCourses courses={related} />
    </div>
  );
};

export default CourseDetails;
