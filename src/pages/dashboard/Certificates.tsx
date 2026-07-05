import { Icon } from "../../components/ui/Icon";
import { useMyCertificates } from "../../hooks/api/useCertificates";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("uz-UZ", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const Certificates = () => {
  const { data: certificates, isLoading } = useMyCertificates();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Sertifikatlarim</h1>
        <p className="mt-1 text-sm text-gray-500">
          Muvaffaqiyatli tugallangan kurslaringiz uchun sertifikatlar.
        </p>
      </div>

      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }, (_, i) => (
            <div
              key={i}
              className="h-64 animate-pulse rounded-2xl bg-gray-100"
            />
          ))}
        </div>
      ) : !certificates || certificates.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white py-16 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-purple-50 text-purple-600">
            <Icon.award />
          </span>
          <p className="mt-4 text-base font-semibold text-gray-900">
            Hali sertifikatlaringiz yo'q
          </p>
          <p className="mt-1 max-w-xs text-sm text-gray-500">
            Kurslardan birini 100% tugatgach, video dars sahifasidan
            sertifikatingizni olishingiz mumkin.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert) => {
            const teacher = cert.course.instructor?.user;
            return (
              <div
                key={cert.id}
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative h-36">
                  <img
                    src={cert.course.imageUrl || undefined}
                    alt={cert.course.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-900/70 to-transparent" />
                  <span className="absolute bottom-3 left-4 flex items-center gap-x-2 text-xs font-medium text-white">
                    <Icon.award />
                    Sertifikat
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="text-base font-semibold text-gray-900">
                    {cert.course.name}
                  </h3>
                  {teacher && (
                    <p className="mt-1 text-sm text-gray-500">
                      {teacher.firstName} {teacher.lastName}
                    </p>
                  )}

                  <div className="mt-4 space-y-1.5 border-t border-gray-100 pt-4 text-xs text-gray-500">
                    <p>Berilgan sana: {formatDate(cert.issuedAt)}</p>
                    <p className="truncate">Seriya: {cert.serialNo}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Certificates;
