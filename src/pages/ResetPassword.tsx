import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Icon } from "../components/ui/Icon";
import { useResetPassword } from "../hooks/api/usePasswordReset";

interface ResetPasswordForm {
  newPassword: string;
  confirmPassword: string;
}

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useResetPassword();
  const [showPassword, setShowPassword] = useState("password");

  const form = useForm<ResetPasswordForm>();
  const {
    formState: { errors },
    watch,
  } = form;

  const onSubmit = async (values: ResetPasswordForm) => {
    if (!token) {
      toast.error("Tiklash havolasi yaroqsiz yoki muddati tugagan");
      return;
    }
    try {
      await mutateAsync({ token, newPassword: values.newPassword });
      toast.success(
        "Parolingiz muvaffaqiyatli yangilandi. Endi tizimga kiring.",
      );
      navigate("/login");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "Xatolik yuz berdi, qayta urinib ko'ring",
      );
    }
  };

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white px-6 py-12">
        <div className="mx-auto w-full max-w-md text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-500">
            <Icon.alertCircle />
          </span>
          <h1 className="mt-5 text-2xl font-bold text-slate-900">
            Havola yaroqsiz
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Parolni tiklash havolasi noto'g'ri yoki muddati tugagan. Qaytadan
            so'rov yuboring.
          </p>
          <Link to="/forgot-password" className="mt-6 inline-block">
            <Button>Qaytadan so'rov yuborish</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6 py-12">
      <div className="mx-auto w-full max-w-md">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <Icon.lock />
        </span>
        <h1 className="mt-5 text-2xl font-bold text-slate-900">
          Yangi parol o'rnating
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Hisobingiz uchun yangi, mustahkam parol tanlang.
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-8 flex flex-col gap-y-4"
          noValidate
        >
          <Input
            name="newPassword"
            type={showPassword}
            form={form}
            placeholder="Yangi parol"
            label="Yangi parol"
            required
            leftIcon={<Icon.lock />}
            error={errors.newPassword?.message}
            rules={{
              required: "Yangi parolni kiriting",
              minLength: {
                value: 8,
                message: "Kamida 8 ta belgi bo'lishi kerak",
              },
              pattern: {
                value: /^(?=.*[A-Z])(?=.*\d).+$/,
                message: "Kamida 1 ta katta harf va 1 ta raqam bo'lishi kerak",
              },
            }}
            rightIcon={
              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    showPassword === "password" ? "text" : "password",
                  )
                }
              >
                {showPassword === "password" ? <Icon.eye /> : <Icon.eyeOff />}
              </button>
            }
          />
          <Input
            name="confirmPassword"
            type="password"
            form={form}
            placeholder="Parolni tasdiqlang"
            label="Parolni tasdiqlang"
            required
            leftIcon={<Icon.lock />}
            error={errors.confirmPassword?.message}
            rules={{
              required: "Parolni tasdiqlang",
              validate: (value) =>
                value === watch("newPassword") || "Parollar mos kelmadi",
            }}
          />

          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={isPending}
            rightIcon={<Icon.arrowRight />}
            className="mt-1"
          >
            Parolni yangilash
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          <Link
            to="/login"
            className="font-semibold text-blue-600 hover:underline"
          >
            Kirish sahifasiga qaytish
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
