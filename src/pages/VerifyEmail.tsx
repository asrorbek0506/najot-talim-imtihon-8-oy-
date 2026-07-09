import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Button from "../components/ui/Button";
import { Icon } from "../components/ui/Icon";
import { useVerifyEmail } from "../hooks/api/useVerifyEmail";

type Status = "verifying" | "success" | "error" | "missing";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const { mutateAsync } = useVerifyEmail();
  const [status, setStatus] = useState<Status>(token ? "verifying" : "missing");
  const hasRun = useRef(false);

  useEffect(() => {
    if (!token || hasRun.current) return;
    hasRun.current = true;

    mutateAsync(token)
      .then(() => setStatus("success"))
      .catch(() => setStatus("error"));
  }, [token, mutateAsync]);

  const content = {
    verifying: {
      icon: <Icon.mail />,
      iconColor: "bg-blue-50 text-blue-600",
      title: "Email tekshirilmoqda...",
      description: "Iltimos, biroz kuting.",
    },
    success: {
      icon: <Icon.checkCircle />,
      iconColor: "bg-emerald-50 text-emerald-600",
      title: "Email tasdiqlandi!",
      description:
        "Email manzilingiz muvaffaqiyatli tasdiqlandi. Endi tizimga kirishingiz mumkin.",
    },
    error: {
      icon: <Icon.alertCircle />,
      iconColor: "bg-red-50 text-red-500",
      title: "Tasdiqlashda xatolik",
      description:
        "Havola yaroqsiz yoki muddati tugagan bo'lishi mumkin. Qaytadan urinib ko'ring yoki administratsiya bilan bog'laning.",
    },
    missing: {
      icon: <Icon.alertCircle />,
      iconColor: "bg-orange-50 text-orange-500",
      title: "Havola topilmadi",
      description:
        "Tasdiqlash havolasi noto'g'ri. Emailingizdagi havolani qayta bosing.",
    },
  }[status];

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6 py-12">
      <div className="mx-auto w-full max-w-md text-center">
        <span
          className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full ${content.iconColor}`}
        >
          {content.icon}
        </span>
        <h1 className="mt-5 text-2xl font-bold text-slate-900">
          {content.title}
        </h1>
        <p className="mt-2 text-sm text-slate-500">{content.description}</p>

        {status !== "verifying" && (
          <Link to="/login" className="mt-6 inline-block">
            <Button rightIcon={<Icon.arrowRight />}>
              Kirish sahifasiga o'tish
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
