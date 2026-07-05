import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { Icon } from "../../components/ui/Icon";
import useUserStore from "../../store/user.store";
import { useChangePassword } from "../../hooks/api/useChangePasswords";
import { useMyCourses } from "../../hooks/api/useEnrollments";
import { useMyCertificates } from "../../hooks/api/useCertificates";
import type { PasswordChangeForm } from "../../types/profile.type";

const Profile = () => {
  const user = useUserStore((state) => state.user);
  const { data: enrollments } = useMyCourses();
  const { data: certificates } = useMyCertificates();
  const { mutateAsync: changePassword, isPending } = useChangePassword();

  const passwordForm = useForm<PasswordChangeForm>();
  const [showCurrent, setShowCurrent] = useState("password");
  const [showNew, setShowNew] = useState("password");

  const {
    formState: { errors: passwordErrors },
  } = passwordForm;

  const onPasswordSubmit = async (values: PasswordChangeForm) => {
    try {
      await changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      toast.success("Parol muvaffaqiyatli yangilandi");
      passwordForm.reset();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "Parolni yangilashda xatolik yuz berdi",
      );
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Profil</h1>
        <p className="mt-1 text-sm text-gray-500">
          Shaxsiy ma'lumotlaringizni va xavfsizlik sozlamalarini boshqaring.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm lg:col-span-1">
          <img
            src={user?.avatarUrl || "https://i.pravatar.cc/150?img=11"}
            alt={user ? `${user.firstName} ${user.lastName}` : "Foydalanuvchi"}
            className="mx-auto h-24 w-24 rounded-full object-cover"
          />
          <h2 className="mt-4 text-base font-semibold text-gray-900">
            {user ? `${user.firstName} ${user.lastName}` : "Foydalanuvchi"}
          </h2>
          <p className="text-sm text-gray-500">Online talaba</p>

          <div className="mt-6 grid grid-cols-2 gap-3 border-t border-gray-100 pt-6 text-left">
            <div>
              <p className="text-lg font-bold text-gray-900">
                {enrollments?.length ?? 0}
              </p>
              <p className="text-xs text-gray-400">Kurslar</p>
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">
                {certificates?.length ?? 0}
              </p>
              <p className="text-xs text-gray-400">Sertifikat</p>
            </div>
          </div>
        </div>

        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900">
              Shaxsiy ma'lumotlar
            </h2>
            <p className="mt-1 text-xs text-gray-400">
              Bu ma'lumotlarni o'zgartirish uchun hozircha administratorga
              murojaat qiling.
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-gray-500">Ism</label>
                <p className="mt-1.5 rounded-lg border border-gray-100 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-700">
                  {user?.firstName}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Familiya
                </label>
                <p className="mt-1.5 rounded-lg border border-gray-100 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-700">
                  {user?.lastName}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Email
                </label>
                <p className="mt-1.5 rounded-lg border border-gray-100 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-700">
                  {user?.email}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Telefon raqam
                </label>
                <p className="mt-1.5 rounded-lg border border-gray-100 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-700">
                  {user?.phone}
                </p>
              </div>
            </div>
          </div>

          <form
            onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
            className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
            noValidate
          >
            <h2 className="text-lg font-bold text-gray-900">
              Parolni o'zgartirish
            </h2>

            <div className="mt-5 grid gap-4">
              <Input
                name="currentPassword"
                type={showCurrent}
                form={passwordForm}
                placeholder="Joriy parol"
                label="Joriy parol"
                required
                leftIcon={<Icon.lock />}
                error={passwordErrors.currentPassword?.message}
                rules={{ required: "Joriy parolni kiriting" }}
                rightIcon={
                  <button
                    type="button"
                    onClick={() =>
                      setShowCurrent(
                        showCurrent === "password" ? "text" : "password",
                      )
                    }
                  >
                    {showCurrent === "password" ? (
                      <Icon.eye />
                    ) : (
                      <Icon.eyeOff />
                    )}
                  </button>
                }
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  name="newPassword"
                  type={showNew}
                  form={passwordForm}
                  placeholder="Yangi parol"
                  label="Yangi parol"
                  required
                  leftIcon={<Icon.lock />}
                  error={passwordErrors.newPassword?.message}
                  rules={{
                    required: "Yangi parolni kiriting",
                    minLength: {
                      value: 8,
                      message: "Kamida 8 ta belgi bo'lishi kerak",
                    },
                    pattern: {
                      value: /^(?=.*[A-Z])(?=.*\d).+$/,
                      message:
                        "Kamida 1 ta katta harf va 1 ta raqam bo'lishi kerak",
                    },
                  }}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() =>
                        setShowNew(showNew === "password" ? "text" : "password")
                      }
                    >
                      {showNew === "password" ? <Icon.eye /> : <Icon.eyeOff />}
                    </button>
                  }
                />
                <Input
                  name="confirmPassword"
                  type="password"
                  form={passwordForm}
                  placeholder="Yangi parolni tasdiqlang"
                  label="Parolni tasdiqlang"
                  required
                  leftIcon={<Icon.lock />}
                  error={passwordErrors.confirmPassword?.message}
                  rules={{
                    required: "Parolni tasdiqlang",
                    validate: (value) =>
                      value === passwordForm.watch("newPassword") ||
                      "Parollar mos kelmadi",
                  }}
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="apple"
              className="mt-5"
              disabled={isPending}
            >
              {isPending ? "Yangilanmoqda..." : "Parolni yangilash"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
