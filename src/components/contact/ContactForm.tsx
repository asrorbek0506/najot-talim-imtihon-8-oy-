import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Icon } from "../ui/Icon";
import { useSubmitContact } from "../../hooks/api/useContact";
import type { CreateContactPayload } from "../../types/api/contact.type";

const inputClass =
  "w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100";

const ContactForm = () => {
  const { mutateAsync, isPending } = useSubmitContact();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateContactPayload>();

  const onSubmit = async (data: CreateContactPayload) => {
    try {
      await mutateAsync(data);
      toast.success("Murojaatingiz qabul qilindi. Tez orada bog'lanamiz.");
      reset();
    } catch {
      toast.error("Xabarni yuborishda xatolik yuz berdi, qayta urinib ko'ring");
    }
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm sm:p-8">
      <h2 className="text-2xl font-bold">Xabar yuborish</h2>
      <p className="mt-2 text-sm text-gray-500">
        24 soat ichida javob beramiz.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-7 space-y-5"
        noValidate
      >
        <div>
          <label className="mb-1.5 block text-sm font-medium">
            To'liq ism <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Aziz Karimov"
            className={inputClass}
            {...register("name", { required: "Ismingizni kiriting" })}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="aziz@example.uz"
              className={inputClass}
              {...register("email", {
                required: "Email kiriting",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Email manzil noto'g'ri",
                },
              })}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Telefon</label>
            <input
              type="tel"
              placeholder="+998 90 123 45 67"
              className={inputClass}
              {...register("phone")}
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium">Mavzu</label>
          <input
            type="text"
            placeholder="Masalan: Kurslar haqida savol"
            className={inputClass}
            {...register("subject")}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium">
            Xabar <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={5}
            placeholder="Xabaringizni shu yerda yozing..."
            className={`${inputClass} resize-none`}
            {...register("message", { required: "Xabar matnini kiriting" })}
          />
          {errors.message && (
            <p className="mt-1 text-xs text-red-500">
              {errors.message.message}
            </p>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center gap-x-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-60"
          >
            {isPending ? "Yuborilmoqda..." : "Xabarni yuborish"} <Icon.send />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
