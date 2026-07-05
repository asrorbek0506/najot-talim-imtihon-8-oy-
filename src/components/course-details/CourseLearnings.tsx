import type { ApiCourseDetail } from "../../types/api/course.type";

const CourseLearnings = ({ course }: { course: ApiCourseDetail }) => {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900">Kurs haqida</h2>
      <p className="mt-3 whitespace-pre-line leading-relaxed text-gray-600">
        {course.longDescription}
      </p>
    </div>
  );
};

export default CourseLearnings;
