import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { Icon } from "../../components/ui/Icon";
import { groups } from "../../data/admin.data";

interface AddStudentForm {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  birthDate: string;
  address: string;
  groupId: string;
  parentName: string;
  parentPhone: string;
}

const AddStudent = () => {
  const navigate = useNavigate();
  const form = useForm<AddStudentForm>({
    defaultValues: { groupId: groups[0]?.id ?? "" },
  });
  const {
    formState: { errors },
  } = form;

  const onSubmit = (data: AddStudentForm) => {
    toast.success(
      `${data.firstName} ${data.lastName} muvaffaqiyatli qo'shildi`,
    );
    navigate("/admin/students");
  };

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
          Yangi talaba qo'shish
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Talaba ma'lumotlarini to'liq kiriting.
        </p>
      </div>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-6 lg:grid-cols-3"
        noValidate
      >
        <div className="space-y-6 lg:col-span-2">
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
                name="phone"
                type="tel"
                form={form}
                placeholder="+998 90 123 45 67"
                label="Telefon raqam"
                required
                leftIcon={<Icon.phone />}
                error={errors.phone?.message}
                rules={{ required: "Telefon raqam kiritilishi shart" }}
              />
              <Input
                name="email"
                type="email"
                form={form}
                placeholder="email@example.com"
                label="Email"
                leftIcon={<Icon.mail />}
                error={errors.email?.message}
                rules={{
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Email manzil noto'g'ri",
                  },
                }}
              />
              <Input
                name="birthDate"
                type="date"
                form={form}
                placeholder=""
                label="Tug'ilgan sana"
              />
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Guruh
                </label>
                <select
                  {...form.register("groupId", { required: "Guruhni tanlang" })}
                  className="mt-1.5 w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                >
                  {groups.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.name} — {group.courseName}
                    </option>
                  ))}
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

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-base font-bold text-gray-900">
              Ota-ona / vasiy ma'lumotlari
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Input
                name="parentName"
                type="text"
                form={form}
                placeholder="F.I.Sh"
                label="Ota-ona F.I.Sh"
              />
              <Input
                name="parentPhone"
                type="tel"
                form={form}
                placeholder="+998 90 123 45 67"
                label="Ota-ona telefon raqami"
                leftIcon={<Icon.phone />}
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-base font-bold text-gray-900">Profil rasmi</h2>
            <div className="mt-4 flex flex-col items-center gap-y-3 rounded-xl border border-dashed border-gray-200 p-6 text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                <Icon.user />
              </span>
              <button
                type="button"
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Rasm yuklash
              </button>
              <p className="text-xs text-gray-400">PNG yoki JPG, 2MB gacha</p>
            </div>

            <Button type="submit" fullWidth className="mt-6">
              Talabani qo'shish
            </Button>
            <Link to="/admin/students" className="mt-3 block">
              <button
                type="button"
                className="w-full rounded-xl border border-gray-200 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                Bekor qilish
              </button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddStudent;
