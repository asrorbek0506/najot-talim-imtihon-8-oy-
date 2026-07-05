import { useState } from "react";
import { Icon } from "../ui/Icon";
import type { ApiCourseDetail } from "../../types/api/course.type";

const CourseCurriculum = ({ course }: { course: ApiCourseDetail }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const totalLessons = course.modules.reduce(
    (sum, m) => sum + m.lessons.length,
    0,
  );

  if (course.modules.length === 0) {
    return (
      <div>
        <h2 className="text-lg font-bold text-gray-900">Kurs dasturi</h2>
        <p className="mt-3 text-sm text-gray-500">
          Kurs dasturi tez orada e'lon qilinadi.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">Kurs dasturi</h2>
        <p className="text-sm text-gray-500">
          {course.modules.length} modul · {totalLessons} dars
        </p>
      </div>

      <div className="mt-4 divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-100">
        {course.modules.map((module, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={module.id}>
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-x-4 bg-white px-5 py-4 text-left transition-colors hover:bg-gray-50"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {module.title}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {module.lessons.length} dars
                  </p>
                </div>
                <span
                  className={`shrink-0 text-gray-400 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                >
                  <Icon.chevronDown />
                </span>
              </button>

              {isOpen && (
                <div className="bg-gray-50/60 px-5 pb-4">
                  {module.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="flex items-center justify-between gap-x-4 border-t border-gray-100 py-3 first:border-t-0"
                    >
                      <span className="flex items-center gap-x-2.5 text-sm text-gray-700">
                        <span className="text-gray-400">
                          <Icon.play />
                        </span>
                        {lesson.title}
                        {lesson.isPreview && (
                          <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-600">
                            Bepul namuna
                          </span>
                        )}
                      </span>
                      <span className="shrink-0 text-xs text-gray-400">
                        {lesson.durationMinutes} daq
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CourseCurriculum;
