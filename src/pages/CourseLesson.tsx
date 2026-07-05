import { useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Icon } from "../components/ui/Icon";
import Button from "../components/ui/Button";
import { useMyCourseDetail } from "../hooks/api/useEnrollments";
import { useMarkLessonProgress } from "../hooks/api/useLessonProgress";
import { useClaimCertificate } from "../hooks/api/useCertificates";
import { useCreateReview } from "../hooks/api/useReviews";

interface FlatLesson {
  id: string;
  moduleId: string;
  moduleTitle: string;
  title: string;
  durationMinutes: number;
  videoUrl: string | null;
  isPreview: boolean;
  completed: boolean;
}

const CourseLesson = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading, isError } = useMyCourseDetail(courseId);
  const { mutate: markProgress, isPending: isMarking } =
    useMarkLessonProgress(courseId);
  const { mutateAsync: claimCertificate, isPending: isClaiming } =
    useClaimCertificate();
  const { mutateAsync: submitReview, isPending: isReviewing } =
    useCreateReview();

  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");

  const flatLessons: FlatLesson[] = useMemo(() => {
    if (!data) return [];
    return data.course.modules.flatMap((module) =>
      module.lessons.map((lesson) => ({
        id: lesson.id,
        moduleId: module.id,
        moduleTitle: module.title,
        title: lesson.title,
        durationMinutes: lesson.durationMinutes,
        videoUrl: lesson.videoUrl,
        isPreview: lesson.isPreview,
        completed: lesson.completed,
      })),
    );
  }, [data]);

  const currentId =
    searchParams.get("dars") ??
    data?.enrollment.lastViewedLessonId ??
    flatLessons[0]?.id;
  const currentIndex = Math.max(
    0,
    flatLessons.findIndex((l) => l.id === currentId),
  );
  const current = flatLessons[currentIndex];

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-400">
        Yuklanmoqda...
      </div>
    );
  }

  if (isError || !data || !current) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center">
        <h1 className="text-xl font-bold text-gray-900">Kurs topilmadi</h1>
        <p className="mt-2 text-sm text-gray-500">
          Siz bu kursga yozilmagansiz yoki kurs mavjud emas.
        </p>
        <Link to="/dashboard/courses" className="mt-6">
          <Button>Kurslarimga qaytish</Button>
        </Link>
      </div>
    );
  }

  const { course, enrollment } = data;

  const goToLesson = (id: string) => setSearchParams({ dars: id });

  const toggleComplete = () => {
    markProgress(
      { lessonId: current.id, completed: !current.completed },
      {
        onSuccess: () =>
          toast.success(
            current.completed
              ? "Belgi olib tashlandi"
              : "Dars tugallandi deb belgilandi",
          ),
        onError: () => toast.error("Xatolik yuz berdi"),
      },
    );
  };

  const goNext = () => {
    const next = flatLessons[currentIndex + 1];
    if (next) goToLesson(next.id);
  };

  const goPrev = () => {
    const prev = flatLessons[currentIndex - 1];
    if (prev) goToLesson(prev.id);
  };

  const handleClaimCertificate = async () => {
    try {
      await claimCertificate(course.id);
      toast.success("Tabriklaymiz! Sertifikatingiz tayyorlandi.");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ?? "Sertifikat olishda xatolik",
      );
    }
  };

  const handleSubmitReview = async () => {
    try {
      await submitReview({
        courseId: course.id,
        rating,
        text: reviewText || undefined,
      });
      toast.success(
        "Sharhingiz uchun rahmat! Moderatsiyadan so'ng chop etiladi.",
      );
      setReviewText("");
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? "Sharh yuborishda xatolik");
    }
  };

  const completedCount = flatLessons.filter((l) => l.completed).length;
  const isCourseCompleted =
    enrollment.status === "completed" && enrollment.progress >= 100;

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-white">
      <header className="flex items-center gap-x-4 border-b border-slate-800 px-4 py-3 sm:px-6">
        <Link
          to="/dashboard/courses"
          className="flex items-center gap-x-2 text-sm text-slate-300 hover:text-white"
        >
          <Icon.arrowLeft />
          Mening kurslarim
        </Link>
        <span className="text-slate-600">/</span>
        <h1 className="truncate text-sm font-semibold text-white">
          {course.name}
        </h1>

        <div className="ml-auto hidden items-center gap-x-3 sm:flex">
          <div className="h-1.5 w-32 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-blue-500"
              style={{ width: `${enrollment.progress}%` }}
            />
          </div>
          <span className="text-xs text-slate-400">
            {completedCount}/{flatLessons.length} dars · {enrollment.progress}%
          </span>
        </div>
      </header>

      <div className="flex flex-1 flex-col lg:flex-row">
        <div className="flex-1">
          {current.videoUrl ? (
            <video
              key={current.id}
              src={current.videoUrl}
              controls
              className="aspect-video w-full bg-black"
            />
          ) : (
            <div className="flex aspect-video items-center justify-center bg-black text-slate-500">
              Video mavjud emas
            </div>
          )}

          <div className="px-4 py-6 sm:px-8">
            <p className="text-xs font-medium uppercase tracking-wide text-blue-400">
              {current.moduleTitle}
            </p>
            <h2 className="mt-2 text-xl font-bold text-white sm:text-2xl">
              {current.title}
            </h2>
            <p className="mt-1 flex items-center gap-x-2 text-sm text-slate-400">
              <Icon.clock />
              {current.durationMinutes} daq
            </p>

            <p className="mt-6 max-w-2xl leading-relaxed text-slate-300">
              {course.longDescription}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-slate-800 pt-6">
              <button
                onClick={goPrev}
                disabled={currentIndex === 0}
                className="flex items-center gap-x-2 rounded-lg border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Icon.arrowLeft />
                Oldingi dars
              </button>
              <button
                onClick={goNext}
                disabled={currentIndex === flatLessons.length - 1}
                className="flex items-center gap-x-2 rounded-lg border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Keyingi dars
                <Icon.arrowRight />
              </button>

              <button
                onClick={toggleComplete}
                disabled={isMarking}
                className={`ml-auto flex items-center gap-x-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
                  current.completed
                    ? "bg-emerald-600 text-white hover:bg-emerald-700"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                <Icon.checkCircle />
                {current.completed ? "Tugallangan" : "Darsni tugatdim"}
              </button>
            </div>

            {isCourseCompleted && (
              <div className="mt-8 rounded-2xl border border-emerald-800 bg-emerald-900/30 p-6">
                <h3 className="flex items-center gap-x-2 text-base font-bold text-emerald-300">
                  <Icon.award />
                  Tabriklaymiz, kursni tugatdingiz!
                </h3>
                <p className="mt-1 text-sm text-emerald-200/80">
                  Endi sertifikatingizni olishingiz mumkin.
                </p>
                <button
                  onClick={handleClaimCertificate}
                  disabled={isClaiming}
                  className="mt-4 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 disabled:opacity-60"
                >
                  {isClaiming ? "Yuklanmoqda..." : "Sertifikatni olish"}
                </button>
              </div>
            )}

            <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
              <h3 className="text-base font-bold text-white">
                Kursga sharh qoldirish
              </h3>
              <div className="mt-3 flex items-center gap-x-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="text-xl"
                  >
                    <span
                      className={
                        star <= rating ? "text-yellow-400" : "text-slate-700"
                      }
                    >
                      ★
                    </span>
                  </button>
                ))}
              </div>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                rows={3}
                placeholder="Kurs haqida fikringizni yozing (ixtiyoriy)..."
                className="mt-3 w-full resize-none rounded-lg border border-slate-700 bg-slate-800 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
              />
              <button
                onClick={handleSubmitReview}
                disabled={isReviewing}
                className="mt-3 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-60"
              >
                {isReviewing ? "Yuborilmoqda..." : "Sharhni yuborish"}
              </button>
            </div>
          </div>
        </div>

        <aside className="w-full border-t border-slate-800 bg-slate-900 lg:w-96 lg:border-l lg:border-t-0">
          <div className="border-b border-slate-800 p-5">
            <h3 className="text-sm font-bold text-white">Kurs dasturi</h3>
            <p className="mt-1 text-xs text-slate-400">
              {flatLessons.length} ta dars
            </p>
          </div>

          <div className="max-h-[70vh] overflow-y-auto p-3">
            {course.modules.map((module) => (
              <div key={module.id} className="mb-2">
                <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {module.title}
                </p>
                {module.lessons.map((lesson) => {
                  const isActive = lesson.id === current.id;
                  return (
                    <button
                      key={lesson.id}
                      onClick={() => goToLesson(lesson.id)}
                      className={`flex w-full items-center gap-x-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                        isActive
                          ? "bg-blue-600/20 text-white"
                          : "text-slate-300 hover:bg-slate-800"
                      }`}
                    >
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] ${
                          lesson.completed
                            ? "bg-emerald-500 text-white"
                            : isActive
                              ? "border border-blue-400 text-blue-400"
                              : "border border-slate-600 text-slate-500"
                        }`}
                      >
                        {lesson.completed ? (
                          <Icon.check />
                        ) : isActive ? (
                          <Icon.play />
                        ) : (
                          ""
                        )}
                      </span>
                      <span className="flex-1 truncate text-sm">
                        {lesson.title}
                      </span>
                      <span className="shrink-0 text-xs text-slate-500">
                        {lesson.durationMinutes} daq
                      </span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CourseLesson;
