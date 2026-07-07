import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { Icon } from "../../components/ui/Icon";
import LessonsFieldArray from "../../components/admin/LessonsFieldArray";
import ImageUpload from "../../components/admin/ImageUpload";
import {
  useAdminCourse,
  useCreateCourse,
  useUpdateCourse,
} from "../../hooks/api/useAdminCourses";
import { useUploadCourseImage } from "../../hooks/api/useFileUpload";
import { useAdminInstructors } from "../../hooks/api/useAdminInstructors";
import { courseCategoryOptions } from "../../utils/format";
import { cleanEmptyStrings } from "../../utils/clean-payload";
import type { CreateCoursePayload } from "../../types/api/admin-course.type";

const CourseForm = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const { data: existing } = useAdminCourse(id);
  const { data: instructorsData } = useAdminInstructors({ limit: 100 });
  const { mutateAsync: createCourse, isPending: isCreating } =
    useCreateCourse();
  const { mutateAsync: updateCourse, isPending: isUpdating } = useUpdateCourse(
    id ?? "",
  );
  const { mutateAsync: uploadImage, isPending: isUploadingImage } =
    useUploadCourseImage(id ?? "");

  const form = useForm<CreateCoursePayload>({
    defaultValues: {
      level: "beginner",
      status: "draft",
      isFeatured: false,
      modules: [],
    },
  });
  const {
    control,
    register,
    formState: { errors, dirtyFields },
    reset,
    watch,
    setValue,
  } = form;

  const nameValue = watch("name");

  useEffect(() => {
    if (isEdit || dirtyFields.slug || !nameValue) return;
    const generatedSlug = nameValue
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
    setValue("slug", generatedSlug);
  }, [nameValue, isEdit, dirtyFields.slug, setValue]);

  const {
    fields: moduleFields,
    append: appendModule,
    remove: removeModule,
  } = useFieldArray({
    control,
    name: "modules",
  });

  useEffect(() => {
    if (existing) {
      reset({
        name: existing.name,
        slug: existing.slug,
        description: existing.description,
        longDescription: existing.longDescription,
        category: existing.category,
        level: existing.level,
        price: Number(existing.price),
        oldPrice: existing.oldPrice ? Number(existing.oldPrice) : undefined,
        durationMonths: existing.durationMonths,
        imageUrl: existing.imageUrl ?? "",
        instructorId: existing.instructorId ?? "",
        isFeatured: existing.isFeatured,
        status: existing.status,
        modules: existing.modules,
      });
    }
  }, [existing, reset]);

  const onSubmit = async (values: CreateCoursePayload) => {
    try {
      const payload = cleanEmptyStrings({
        ...values,
        price: Number(values.price),
        oldPrice: values.oldPrice ? Number(values.oldPrice) : undefined,
        durationMonths: Number(values.durationMonths),
        modules: (values.modules ?? []).map((module, moduleIndex) => ({
          ...module,
          order: moduleIndex + 1,
          lessons: (module.lessons ?? []).map((lesson, lessonIndex) => ({
            ...lesson,
            order: lessonIndex + 1,
            durationMinutes: Number(lesson.durationMinutes),
          })),
        })),
      });
      if (isEdit && id) {
        await updateCourse(payload);
        toast.success("Kurs yangilandi");
      } else {
        await createCourse(payload);
        toast.success("Yangi kurs yaratildi");
      }
      navigate("/admin/courses");
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? "Xatolik yuz berdi");
    }
  };

  const isPending = isCreating || isUpdating;

  return (
    <div className="space-y-6">
      <Link
        to="/admin/courses"
        className="flex w-fit items-center gap-x-2 text-sm font-medium text-gray-600 hover:text-gray-900"
      >
        <Icon.arrowLeft />
        Kurslar ro'yxati
      </Link>

      <h1 className="text-2xl font-bold text-gray-900">
        {isEdit ? "Kursni tahrirlash" : "Yangi kurs yaratish"}
      </h1>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
        noValidate
      >
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-base font-bold text-gray-900">
            Asosiy ma'lumotlar
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Input
              name="name"
              type="text"
              form={form}
              placeholder="Masalan: Frontend Bootcamp"
              label="Kurs nomi"
              required
              error={errors.name?.message}
              rules={{
                required: "Kurs nomini kiriting",
                minLength: { value: 2, message: "Kamida 2 ta belgi" },
              }}
            />
            <Input
              name="slug"
              type="text"
              form={form}
              placeholder="frontend-bootcamp"
              label="Slug (URL)"
              required
              error={errors.slug?.message}
              rules={{
                required: "Slug kiriting",
                pattern: {
                  value: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                  message: "Faqat kichik lotin harflari, raqam va '-' belgisi",
                },
              }}
            />

            <div>
              <label className="text-sm font-medium text-gray-700">
                Kategoriya
              </label>
              <select
                {...register("category", { required: true })}
                className="mt-1.5 w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                {courseCategoryOptions
                  .filter((c) => c.value)
                  .map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Daraja
              </label>
              <select
                {...register("level")}
                className="mt-1.5 w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option value="beginner">Boshlang'ich</option>
                <option value="intermediate">O'rta</option>
                <option value="advanced">Yuqori</option>
              </select>
            </div>

            <Input
              name="price"
              type="number"
              form={form}
              placeholder="1500000"
              label="Narx (so'm)"
              required
              error={errors.price?.message}
              rules={{
                required: "Narxni kiriting",
                validate: (value) =>
                  Number(value) > 0 || "Narx musbat son bo'lishi kerak",
              }}
            />
            <Input
              name="oldPrice"
              type="number"
              form={form}
              placeholder="2000000"
              label="Eski narx (ixtiyoriy)"
            />
            <Input
              name="durationMonths"
              type="number"
              form={form}
              placeholder="6"
              label="Davomiyligi (oy)"
              required
              error={errors.durationMonths?.message}
              rules={{
                required: "Davomiylikni kiriting",
                validate: (value) =>
                  Number(value) >= 1 || "Kamida 1 oy bo'lishi kerak",
              }}
            />

            <div>
              <label className="text-sm font-medium text-gray-700">
                O'qituvchi
              </label>
              <select
                {...register("instructorId")}
                className="mt-1.5 w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option value="">Tanlanmagan</option>
                {(instructorsData?.items ?? []).map((instructor) => (
                  <option key={instructor.id} value={instructor.id}>
                    {instructor.firstName} {instructor.lastName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Holat</label>
              <select
                {...register("status")}
                className="mt-1.5 w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option value="draft">Qoralama</option>
                <option value="active">Faol</option>
                <option value="archived">Arxivlangan</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            {isEdit ? (
              <div className="flex items-center gap-x-6 rounded-lg border border-gray-100 p-4">
                <ImageUpload
                  currentUrl={existing?.imageUrl}
                  onUpload={(file) => uploadImage(file)}
                  isUploading={isUploadingImage}
                  shape="square"
                  label="Muqovani yuklash"
                />
                <p className="text-xs text-gray-400">
                  Yoki quyida to'g'ridan-to'g'ri URL kiriting.
                </p>
              </div>
            ) : (
              <p className="mb-2 text-xs text-gray-400">
                Rasm yuklash faqat kurs yaratilgandan so'ng mavjud bo'ladi —
                hozircha URL kiriting yoki bo'sh qoldiring.
              </p>
            )}
            <div className="mt-3">
              <Input
                name="imageUrl"
                type="text"
                form={form}
                placeholder="/uploads/courses/abc.jpg yoki https://..."
                label="Muqova rasm URL"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium text-gray-700">
              Qisqa tavsif
            </label>
            <textarea
              {...register("description", {
                required: "Qisqa tavsifni kiriting",
                minLength: { value: 10, message: "Kamida 10 ta belgi" },
              })}
              rows={2}
              className="mt-1.5 w-full resize-none rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
            {errors.description && (
              <p className="mt-1 text-xs text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>
          <div className="mt-4">
            <label className="text-sm font-medium text-gray-700">
              To'liq tavsif
            </label>
            <textarea
              {...register("longDescription", {
                required: "To'liq tavsifni kiriting",
                minLength: { value: 20, message: "Kamida 20 ta belgi" },
              })}
              rows={5}
              className="mt-1.5 w-full resize-none rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
            {errors.longDescription && (
              <p className="mt-1 text-xs text-red-500">
                {errors.longDescription.message}
              </p>
            )}
          </div>

          <label className="mt-4 flex items-center gap-x-2 text-sm text-gray-700">
            <input
              type="checkbox"
              {...register("isFeatured")}
              className="h-4 w-4 rounded"
            />
            Bosh sahifada tavsiya etilgan (featured) sifatida ko'rsatish
          </label>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-900">
              Kurs dasturi (modullar)
            </h2>
            <button
              type="button"
              onClick={() =>
                appendModule({
                  title: "",
                  order: moduleFields.length + 1,
                  lessons: [],
                })
              }
              className="flex items-center gap-x-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
            >
              <Icon.plus />
              Modul qo'shish
            </button>
          </div>

          <div className="mt-4 space-y-4">
            {moduleFields.map((module, moduleIndex) => (
              <div
                key={module.id}
                className="rounded-xl border border-gray-100 p-4"
              >
                <div className="flex items-center gap-x-2">
                  <input
                    {...register(`modules.${moduleIndex}.title` as const, {
                      required: true,
                    })}
                    placeholder={`Modul ${moduleIndex + 1} nomi`}
                    className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium focus:border-blue-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => removeModule(moduleIndex)}
                    className="text-gray-400 hover:text-red-500"
                    aria-label="Modulni o'chirish"
                  >
                    <Icon.trash />
                  </button>
                </div>

                <LessonsFieldArray
                  control={control}
                  register={register}
                  moduleIndex={moduleIndex}
                />
              </div>
            ))}

            {moduleFields.length === 0 && (
              <p className="text-sm text-gray-400">Hali modul qo'shilmagan.</p>
            )}
          </div>
        </div>

        <div className="flex gap-x-3">
          <Button type="submit" disabled={isPending}>
            {isPending
              ? "Saqlanmoqda..."
              : isEdit
                ? "Saqlash"
                : "Kursni yaratish"}
          </Button>
          <Link to="/admin/courses">
            <button
              type="button"
              className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              Bekor qilish
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default CourseForm;
