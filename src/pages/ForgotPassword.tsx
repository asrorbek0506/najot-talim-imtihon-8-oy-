import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Icon } from "../components/ui/Icon";
import { useForgotPassword } from "../hooks/api/usePasswordReset";

interface ForgotPasswordForm {
  email: string;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ForgotPassword = () => {
  const form = useForm<ForgotPasswordForm>();
  const { mutateAsync, isPending } = useForgotPassword();
  const [sent, setSent] = useState(false);
  const {
    formState: { errors },
  } = form;

  const onSubmit = async (values: ForgotPasswordForm) => {
    try {
      await mutateAsync(values);
      setSent(true);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "Xatolik yuz berdi, qayta urinib ko'ring",
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6 py-12">
      <div className="mx-auto w-full max-w-md">
        <Link
          to="/login"
          className="flex items-center gap-x-1.5 text-sm font-medium text-slate-500 transition hover:text-slate-800"
        >
          <Icon.arrowLeft />
          Kirish sahifasiga
        </Link>

        <div className="mt-8">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Icon.lock />
          </span>
          <h1 className="mt-5 text-2xl font-bold text-slate-900">
            Parolni unutdingizmi?
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Email manzilingizni kiriting — biz sizga parolni tiklash uchun
            havola yuboramiz.
          </p>
        </div>

        {sent ? (
          <div className="mt-8 rounded-2xl border border-emerald-100 bg-emerald-50 p-6">
            <p className="flex items-center gap-x-2 text-sm font-semibold text-emerald-700">
              <Icon.checkCircle />
              Xat yuborildi
            </p>
            <p className="mt-2 text-sm text-emerald-700/80">
              Agar bu email bizda ro'yxatdan o'tgan bo'lsa, parolni tiklash
              havolasi shu manzilga yuborildi. Pochta qutingizni tekshiring.
            </p>
          </div>
        ) : (
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8 flex flex-col gap-y-4"
            noValidate
          >
            <Input
              name="email"
              type="email"
              form={form}
              placeholder="aziz@example.uz"
              label="Email manzil"
              required
              leftIcon={<Icon.mail />}
              error={errors.email?.message}
              rules={{
                required: "Email kiritilishi shart",
                pattern: {
                  value: emailPattern,
                  message: "Email manzil noto'g'ri kiritilgan",
                },
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
              Tiklash havolasini yuborish
            </Button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-slate-500">
          Parolingizni eslaysizmi?{" "}
          <Link
            to="/login"
            className="font-semibold text-blue-600 hover:underline"
          >
            Kirish
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
