import { Link, useParams } from "react-router-dom";
import { Icon } from "../components/ui/Icon";
import Button from "../components/ui/Button";
import { useInstructor } from "../hooks/api/useInstructors";
import { formatRating } from "../utils/format";

const TeacherDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: teacher, isLoading, isError } = useInstructor(id);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl animate-pulse px-4 py-16 sm:px-6">
        <div className="mx-auto h-28 w-28 rounded-full bg-gray-100" />
        <div className="mx-auto mt-4 h-6 w-1/3 rounded bg-gray-100" />
      </div>
    );
  }

  if (isError || !teacher) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900">
          O'qituvchi topilmadi
        </h1>
        <Link to="/teachers" className="mt-6">
          <Button>O'qituvchilar ro'yxatiga qaytish</Button>
        </Link>
      </div>
    );
  }

  const fullName = `${teacher.firstName} ${teacher.lastName}`;

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <section className="border-b border-gray-100 bg-gray-50/60 py-14">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <img
            src={teacher.avatarUrl || "https://i.pravatar.cc/200"}
            alt={fullName}
            className="mx-auto h-28 w-28 rounded-full object-cover"
          />
          <h1 className="mt-5 text-2xl font-bold text-gray-900">{fullName}</h1>
          <p className="mt-1 text-base font-medium text-blue-600">
            {teacher.specialty}
          </p>

          <div className="mt-5 flex items-center justify-center gap-x-6 text-sm text-gray-600">
            <span className="flex items-center gap-x-1.5">
              <Icon.star />
              <span className="font-semibold text-gray-900">
                {formatRating(teacher.rating)}
              </span>
              reyting
            </span>
            <span className="flex items-center gap-x-1.5">
              <Icon.award />
              {teacher.experience} yil tajriba
            </span>
            <span className="flex items-center gap-x-1.5">
              <Icon.book />
              {teacher.courses.length} ta kurs
            </span>
          </div>

          {teacher.socialLinks && (
            <div className="mt-5 flex items-center justify-center gap-x-3">
              {teacher.socialLinks.telegram && (
                <a
                  href={teacher.socialLinks.telegram}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
                >
                  Telegram
                </a>
              )}
              {teacher.socialLinks.linkedin && (
                <a
                  href={teacher.socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
                >
                  LinkedIn
                </a>
              )}
              {teacher.socialLinks.github && (
                <a
                  href={teacher.socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
                >
                  GitHub
                </a>
              )}
            </div>
          )}
        </div>
      </section>

      {teacher.bio && (
        <section className="py-12">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg font-bold text-gray-900">Biografiya</h2>
            <p className="mt-3 leading-relaxed text-gray-600">{teacher.bio}</p>
          </div>
        </section>
      )}

      <section className="border-t border-gray-100 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-bold text-gray-900">
            {fullName} kurslari
          </h2>
          {teacher.courses.length === 0 ? (
            <p className="mt-3 text-sm text-gray-500">
              Hozircha faol kurslari mavjud emas.
            </p>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {teacher.courses.map((course) => (
                <Link
                  key={course.id}
                  to={`/courses/${course.slug}`}
                  className="block overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-lg"
                >
                  <img
                    src={course.imageUrl || undefined}
                    alt={course.name}
                    className="h-36 w-full object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-gray-900">
                      {course.name}
                    </h3>
                    <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                      <span className="flex items-center gap-x-1">
                        <Icon.star />
                        {formatRating(course.rating)}
                      </span>
                      <span>{course.studentsCount} talaba</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default TeacherDetails;
