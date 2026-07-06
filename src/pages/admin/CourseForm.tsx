import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { Icon } from "../../components/ui/Icon";
import LessonsFieldArray from "../../components/admin/LessonsFieldArray";
import {
  useAdminCourse,
  useCreateCourse,
  useUpdateCourse,
} from "../../hooks/api/useAdminCourses";
import { useAdminInstructors } from "../../hooks/api/useAdminInstructors";
import { courseCategoryOptions } from "../../utils/format";
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
    formState: { errors },
    reset,
  } = form;

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
      const payload = {
        ...values,
        price: Number(values.price),
        oldPrice: values.oldPrice ? Number(values.oldPrice) : undefined,
        durationMonths: Number(values.durationMonths),
      };
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
              rules={{ required: "Kurs nomini kiriting" }}
            />
            <Input
              name="slug"
              type="text"
              form={form}
              placeholder="frontend-bootcamp"
              label="Slug (URL)"
              required
              error={errors.slug?.message}
              rules={{ required: "Slug kiriting" }}
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
              rules={{ required: "Narxni kiriting" }}
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
              rules={{ required: "Davomiylikni kiriting" }}
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
            <Input
              name="imageUrl"
              type="text"
              form={form}
              placeholder="/uploads/courses/abc.jpg yoki https://..."
              label="Muqova rasm URL"
            />
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium text-gray-700">
              Qisqa tavsif
            </label>
            <textarea
              {...register("description", { required: true })}
              rows={2}
              className="mt-1.5 w-full resize-none rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>
          <div className="mt-4">
            <label className="text-sm font-medium text-gray-700">
              To'liq tavsif
            </label>
            <textarea
              {...register("longDescription", { required: true })}
              rows={5}
              className="mt-1.5 w-full resize-none rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
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
