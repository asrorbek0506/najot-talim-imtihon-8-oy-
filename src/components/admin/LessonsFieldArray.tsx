import {
  useFieldArray,
  type Control,
  type UseFormRegister,
} from "react-hook-form";
import { Icon } from "../ui/Icon";
import type { CreateCoursePayload } from "../../types/api/admin-course.type";

interface LessonsFieldArrayProps {
  control: Control<CreateCoursePayload>;
  register: UseFormRegister<CreateCoursePayload>;
  moduleIndex: number;
}

const LessonsFieldArray = ({
  control,
  register,
  moduleIndex,
}: LessonsFieldArrayProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `modules.${moduleIndex}.lessons`,
  });

  return (
    <div className="mt-3 space-y-3 border-l-2 border-gray-100 pl-4">
      {fields.map((lesson, lessonIndex) => (
        <div key={lesson.id} className="grid grid-cols-12 items-center gap-2">
          <input
            {...register(
              `modules.${moduleIndex}.lessons.${lessonIndex}.title` as const,
              {
                required: true,
              },
            )}
            placeholder="Dars nomi"
            className="col-span-5 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          />
          <input
            type="number"
            {...register(
              `modules.${moduleIndex}.lessons.${lessonIndex}.durationMinutes` as const,
              { valueAsNumber: true, required: true },
            )}
            placeholder="Daq"
            className="col-span-2 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          />
          <input
            {...register(
              `modules.${moduleIndex}.lessons.${lessonIndex}.videoUrl` as const,
            )}
            placeholder="Video URL"
            className="col-span-4 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => remove(lessonIndex)}
            className="col-span-1 flex items-center justify-center text-gray-400 hover:text-red-500"
            aria-label="Darsni o'chirish"
          >
            <Icon.trash />
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          append({
            title: "",
            durationMinutes: 10,
            order: fields.length + 1,
            videoUrl: "",
            isPreview: false,
          })
        }
        className="flex items-center gap-x-1.5 text-xs font-medium text-blue-600 hover:text-blue-700"
      >
        <Icon.plus />
        Dars qo'shish
      </button>
    </div>
  );
};

export default LessonsFieldArray;
