import type { ApiCourseLevel } from "../types/api/course.type";

export const courseCategoryLabels: Record<string, string> = {
  frontend: "Frontend",
  backend: "Backend",
  design: "Dizayn",
  mobile: "Mobil",
  marketing: "Marketing",
  data: "Data Science",
  security: "Xavfsizlik",
};

export const courseCategoryOptions: { value: string; label: string }[] = [
  { value: "", label: "Barchasi" },
  ...Object.entries(courseCategoryLabels).map(([value, label]) => ({
    value,
    label,
  })),
];

export const getCategoryLabel = (category: string): string =>
  courseCategoryLabels[category] ?? category;

export const formatPrice = (
  price: string | number | null | undefined,
): string => {
  if (price === null || price === undefined) return "";
  const numeric = typeof price === "string" ? Number(price) : price;
  if (Number.isNaN(numeric)) return "";
  return `${Math.round(numeric).toLocaleString("uz-UZ")} so'm`;
};

export const courseLevelLabels: Record<ApiCourseLevel, string> = {
  beginner: "Boshlang'ich",
  intermediate: "O'rta",
  advanced: "Yuqori",
};

export const formatDurationMonths = (months: number): string => {
  if (months === 1) return "1 oy";
  if (months < 5) return `${months} oy`;
  return `${months} oy`;
};

export const formatRating = (
  rating: string | number | null | undefined,
): string => {
  if (rating === null || rating === undefined) return "0.0";
  const numeric = typeof rating === "string" ? Number(rating) : rating;
  if (Number.isNaN(numeric)) return "0.0";
  return numeric.toFixed(1);
};
