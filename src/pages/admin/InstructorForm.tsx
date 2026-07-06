import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { Icon } from "../../components/ui/Icon";
import {
  useAdminInstructor,
  useCreateInstructor,
  useUpdateInstructor,
} from "../../hooks/api/useAdminInstructors";
import type { CreateInstructorPayload } from "../../types/api/admin-people.type";

interface InstructorFormValues extends CreateInstructorPayload {
  status: "active" | "inactive";
}

const InstructorForm = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const { data: existing } = useAdminInstructor(id);
  const { mutateAsync: createInstructor, isPending: isCreating } =
    useCreateInstructor();
  const { mutateAsync: updateInstructor, isPending: isUpdating } =
    useUpdateInstructor(id ?? "");

  const form = useForm<InstructorFormValues>({
    defaultValues: { status: "active", experience: 0 },
  });
  const {
    formState: { errors },
    reset,
  } = form;

  useEffect(() => {
    if (existing) {
      reset({
        firstName: existing.firstName,
        lastName: existing.lastName,
        email: existing.email,
        phone: existing.phone,
        specialty: existing.specialty,
        experience: existing.experience,
        bio: existing.bio ?? "",
        status: existing.status,
      });
    }
  }, [existing, reset]);

  const onSubmit = async (values: InstructorFormValues) => {
    try {
      if (isEdit && id) {
        const { password, ...rest } = values as any;
        await updateInstructor(rest);
        toast.success("O'qituvchi ma'lumotlari yangilandi");
      } else {
        await createInstructor(values);
        toast.success("Yangi o'qituvchi qo'shildi");
      }
      navigate("/admin/instructors");
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? "Xatolik yuz berdi");
    }
  };

  const isPending = isCreating || isUpdating;

  return (
    <div className="space-y-6">
      <Link
        to="/admin/instructors"
        className="flex w-fit items-center gap-x-2 text-sm font-medium text-gray-600 hover:text-gray-900"
      >
        <Icon.arrowLeft />
        O'qituvchilar ro'yxati
      </Link>

      <h1 className="text-2xl font-bold text-gray-900">
        {isEdit ? "O'qituvchini tahrirlash" : "Yangi o'qituvchi qo'shish"}
      </h1>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-3xl space-y-6"
        noValidate
      >
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-base font-bold text-gray-900">
            Shaxsiy ma'lumotlar
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Input
              name="firstName"
              type="text"
              form={form}
              placeholder="Ism"
              label="Ism"
              required
              error={errors.firstName?.message}
              rules={{ required: "Ism kiritilishi shart" }}
            />
            <Input
              name="lastName"
              type="text"
              form={form}
              placeholder="Familiya"
              label="Familiya"
              required
              error={errors.lastName?.message}
              rules={{ required: "Familiya kiritilishi shart" }}
            />
            <Input
              name="email"
              type="email"
              form={form}
              placeholder="email@example.com"
              label="Email"
              required
              leftIcon={<Icon.mail />}
              error={errors.email?.message}
              rules={{ required: "Email kiritilishi shart" }}
            />
            <Input
              name="phone"
              type="tel"
              form={form}
              placeholder="+998901234567"
              label="Telefon raqam"
              required
              leftIcon={<Icon.phone />}
              error={errors.phone?.message}
              rules={{ required: "Telefon raqam kiritilishi shart" }}
            />
            {!isEdit && (
              <Input
                name="password"
                type="password"
                form={form}
                placeholder="Vaqtinchalik parol"
                label="Parol"
                required
                leftIcon={<Icon.lock />}
                error={errors.password?.message}
                rules={{ required: "Parol kiritilishi shart", minLength: 8 }}
              />
            )}
            <div>
              <label className="text-sm font-medium text-gray-700">Holat</label>
              <select
                {...form.register("status")}
                className="mt-1.5 w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option value="active">Faol</option>
                <option value="inactive">Faol emas</option>
              </select>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-base font-bold text-gray-900">
            Kasbiy ma'lumotlar
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Input
              name="specialty"
              type="text"
              form={form}
              placeholder="Masalan: JavaScript / Frontend"
              label="Mutaxassislik"
              required
              error={errors.specialty?.message}
              rules={{ required: "Mutaxassislikni kiriting" }}
            />
            <Input
              name="experience"
              type="number"
              form={form}
              placeholder="0"
              label="Tajriba (yil)"
            />
          </div>
          <div className="mt-4">
            <label className="text-sm font-medium text-gray-700">Bio</label>
            <textarea
              {...form.register("bio")}
              rows={4}
              placeholder="Qisqacha tarjimai hol..."
              className="mt-1.5 w-full resize-none rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        <div className="flex gap-x-3">
          <Button type="submit" disabled={isPending}>
            {isPending
              ? "Saqlanmoqda..."
              : isEdit
                ? "Saqlash"
                : "O'qituvchini qo'shish"}
          </Button>
          <Link to="/admin/instructors">
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

export default InstructorForm;
