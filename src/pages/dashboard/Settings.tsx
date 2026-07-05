import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Switch from "../../components/ui/Switch";
import { Icon } from "../../components/ui/Icon";

const languages = ["O'zbek tili", "Русский", "English"];

const Settings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    marketing: false,
  });
  const [language, setLanguage] = useState(languages[0]);
  const [twoFactor, setTwoFactor] = useState(false);

  const updateNotification = (
    key: keyof typeof notifications,
    value: boolean,
  ) => {
    setNotifications((prev) => ({ ...prev, [key]: value }));
    toast.success("Sozlama saqlandi");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Sozlamalar</h1>
        <p className="mt-1 text-sm text-gray-500">
          Bildirishnomalar, til va xavfsizlik sozlamalarini boshqaring.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900">Bildirishnomalar</h2>
        <div className="mt-2 divide-y divide-gray-100">
          <Switch
            checked={notifications.email}
            onChange={(v) => updateNotification("email", v)}
            label="Email orqali bildirishnomalar"
            description="Yangi darslar, natijalar va e'lonlar haqida xabar oling."
          />
          <Switch
            checked={notifications.sms}
            onChange={(v) => updateNotification("sms", v)}
            label="SMS orqali bildirishnomalar"
            description="To'lov va dars eslatmalari SMS orqali yuboriladi."
          />
          <Switch
            checked={notifications.push}
            onChange={(v) => updateNotification("push", v)}
            label="Push bildirishnomalar"
            description="Brauzer/ilova orqali tezkor bildirishnomalar."
          />
          <Switch
            checked={notifications.marketing}
            onChange={(v) => updateNotification("marketing", v)}
            label="Marketing xabarlari"
            description="Aksiya va chegirmalar haqida ma'lumot oling."
          />
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900">Til va mintaqa</h2>
        <div className="mt-4 max-w-xs">
          <label className="text-sm font-medium text-gray-700">
            Interfeys tili
          </label>
          <select
            value={language}
            onChange={(e) => {
              setLanguage(e.target.value);
              toast.success("Til o'zgartirildi");
            }}
            className="mt-1.5 w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900">Xavfsizlik</h2>
        <div className="mt-2 divide-y divide-gray-100">
          <Switch
            checked={twoFactor}
            onChange={(v) => {
              setTwoFactor(v);
              toast.success(
                v
                  ? "Ikki bosqichli tasdiqlash yoqildi"
                  : "Ikki bosqichli tasdiqlash o'chirildi",
              );
            }}
            label="Ikki bosqichli tasdiqlash (2FA)"
            description="Hisobingiz xavfsizligini kuchaytiradi."
          />
          <div className="flex items-center justify-between py-3">
            <span>
              <span className="block text-sm font-medium text-gray-900">
                Parol
              </span>
              <span className="mt-0.5 block text-xs text-gray-500">
                Oxirgi marta 3 oy oldin o'zgartirilgan.
              </span>
            </span>
            <Link
              to="/dashboard/profile"
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              O'zgartirish
            </Link>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-red-100 bg-red-50/40 p-6">
        <h2 className="flex items-center gap-x-2 text-lg font-bold text-red-600">
          <Icon.alertCircle />
          Xavfli hudud
        </h2>
        <p className="mt-2 text-sm text-red-500">
          Hisobingizni o'chirsangiz, barcha kurslar, sertifikatlar va progress
          ma'lumotlari butunlay o'chiriladi. Bu amalni ortga qaytarib bo'lmaydi.
        </p>
        <button className="mt-4 rounded-lg border border-red-200 bg-white px-4 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50">
          Hisobni o'chirish
        </button>
      </div>
    </div>
  );
};

export default Settings;
