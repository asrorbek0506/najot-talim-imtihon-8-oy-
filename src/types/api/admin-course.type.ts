import type { ApiCourseLevel, ApiCourseStatus } from "./course.type";

export interface AdminCourseListItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  level: ApiCourseLevel;
  price: string | number;
  oldPrice?: string | number | null;
  durationMonths: number;
  lessonsCount: number;
  studentsCount: number;
  imageUrl?: string | null;
  isFeatured: boolean;
  rating: string | number;
  ratingCount: number;
  status: ApiCourseStatus;
  createdAt: string;
}

export interface AdminCourseLessonInput {
  id?: string;
  title: string;
  durationMinutes: number;
  order: number;
  videoUrl?: string;
  content?: string;
  isPreview?: boolean;
}

export interface AdminCourseModuleInput {
  id?: string;
  title: string;
  order: number;
  lessons: AdminCourseLessonInput[];
}

export interface AdminCourseDetail extends AdminCourseListItem {
  longDescription: string;
  previewVideoUrl?: string | null;
  instructorId?: string | null;
  instructor?: {
    id: string;
    user: { firstName: string; lastName: string };
  } | null;
  modules: AdminCourseModuleInput[];
}

export interface CreateCoursePayload {
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  category: string;
  level?: ApiCourseLevel;
  price: number;
  oldPrice?: number;
  durationMonths: number;
  lessonsCount?: number;
  imageUrl?: string;
  previewVideoUrl?: string;
  instructorId?: string;
  isFeatured?: boolean;
  status?: ApiCourseStatus;
  modules?: AdminCourseModuleInput[];
}

export type UpdateCoursePayload = Partial<CreateCoursePayload>;
