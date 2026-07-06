import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { Icon } from "../../components/ui/Icon";
import {
  useAdminStudent,
  useCreateStudent,
  useUpdateStudent,
} from "../../hooks/api/useAdminStudents";
import type { CreateStudentPayload } from "../../types/api/admin-people.type";

interface StudentFormValues extends CreateStudentPayload {
  status: "active" | "inactive" | "graduated";
}

const StudentForm = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const { data: existing } = useAdminStudent(id);
  const { mutateAsync: createStudent, isPending: isCreating } =
    useCreateStudent();
  const { mutateAsync: updateStudent, isPending: isUpdating } =
    useUpdateStudent(id ?? "");

  const form = useForm<StudentFormValues>({
    defaultValues: { status: "active" },
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
        middleName: existing.middleName ?? "",
        birthDate: existing.birthDate?.slice(0, 10) ?? "",
        gender: existing.gender ?? undefined,
        address: existing.address ?? "",
        status: existing.status,
      });
    }
  }, [existing, reset]);

  const onSubmit = async (values: StudentFormValues) => {
    try {
      if (isEdit && id) {
        const { password, ...rest } = values as any;
        await updateStudent(rest);
        toast.success("Talaba ma'lumotlari yangilandi");
      } else {
        await createStudent(values);
        toast.success("Yangi talaba qo'shildi");
      }
      navigate("/admin/students");
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? "Xatolik yuz berdi");
    }
  };

  const isPending = isCreating || isUpdating;

  return (
    <div className="space-y-6">
      <Link
        to="/admin/students"
        className="flex w-fit items-center gap-x-2 text-sm font-medium text-gray-600 hover:text-gray-900"
      >
        <Icon.arrowLeft />
        Talabalar ro'yxati
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {isEdit ? "Talabani tahrirlash" : "Yangi talaba qo'shish"}
        </h1>
      </div>

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
            <Input
              name="birthDate"
              type="date"
              form={form}
              placeholder=""
              label="Tug'ilgan sana"
            />
            <div>
              <label className="text-sm font-medium text-gray-700">Jinsi</label>
              <select
                {...form.register("gender")}
                className="mt-1.5 w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option value="">Tanlanmagan</option>
                <option value="male">Erkak</option>
                <option value="female">Ayol</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Holat</label>
              <select
                {...form.register("status")}
                className="mt-1.5 w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option value="active">Faol</option>
                <option value="inactive">Faol emas</option>
                <option value="graduated">Bitirgan</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <Input
              name="address"
              type="text"
              form={form}
              placeholder="Manzil"
              label="Manzil"
              leftIcon={<Icon.location />}
            />
          </div>
        </div>

        <div className="flex gap-x-3">
          <Button type="submit" disabled={isPending}>
            {isPending
              ? "Saqlanmoqda..."
              : isEdit
                ? "Saqlash"
                : "Talabani qo'shish"}
          </Button>
          <Link to="/admin/students">
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

export default StudentForm;
