import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { Icon } from "../ui/Icon";

interface ImageUploadProps {
  currentUrl?: string | null;
  onUpload: (file: File) => Promise<unknown>;
  isUploading?: boolean;
  maxSizeMB?: number;
  shape?: "circle" | "square";
  label?: string;
}

const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

const ImageUpload = ({
  currentUrl,
  onUpload,
  isUploading,
  maxSizeMB = 2,
  shape = "circle",
  label = "Rasm yuklash",
}: ImageUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!allowedTypes.includes(file.type)) {
      toast.error("Faqat JPEG, PNG yoki WebP formatlarga ruxsat berilgan");
      return;
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      toast.error(`Fayl hajmi ${maxSizeMB}MB dan oshmasligi kerak`);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    try {
      await onUpload(file);
      toast.success("Rasm muvaffaqiyatli yuklandi");
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? "Rasmni yuklashda xatolik");
      setPreview(null);
    } finally {
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const displayUrl = preview || currentUrl;
  const roundedClass = shape === "circle" ? "rounded-full" : "rounded-xl";

  return (
    <div className="flex flex-col items-center gap-y-3">
      <div
        className={`relative h-24 w-24 overflow-hidden ${roundedClass} border border-gray-200 bg-gray-50`}
      >
        {displayUrl ? (
          <img
            src={displayUrl}
            alt="Preview"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-300">
            <Icon.user />
          </div>
        )}
        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-xs text-white">
            Yuklanmoqda...
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={isUploading}
        className="text-sm font-medium text-blue-600 hover:text-blue-700 disabled:opacity-60"
      >
        {label}
      </button>
      <p className="text-xs text-gray-400">
        JPEG/PNG/WebP, {maxSizeMB}MB gacha
      </p>
    </div>
  );
};

export default ImageUpload;
