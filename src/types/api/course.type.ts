export type ApiCourseLevel = "beginner" | "intermediate" | "advanced";
export type ApiCourseStatus = "draft" | "active" | "archived";

export interface ApiCourseListItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  category: string;
  level: ApiCourseLevel;
  price: string | number;
  oldPrice?: string | number | null;
  durationMonths: number;
  lessonsCount: number;
  studentsCount: number;
  imageUrl?: string | null;
  previewVideoUrl?: string | null;
  isFeatured: boolean;
  rating: string | number;
  ratingCount: number;
  status: ApiCourseStatus;
  instructorId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ApiCourseInstructor {
  id: string;
  specialty: string;
  rating: string | number;
  firstName: string;
  lastName: string;
  avatarUrl?: string | null;
}

export interface ApiCourseLesson {
  id: string;
  moduleId: string;
  title: string;
  durationMinutes: number;
  order: number;
  videoUrl?: string | null;
  content?: string | null;
  isPreview: boolean;
}

export interface ApiCourseModule {
  id: string;
  courseId: string;
  title: string;
  order: number;
  lessons: ApiCourseLesson[];
}

export interface ApiCourseReview {
  rating: number;
  text: string | null;
  createdAt: string;
  student: {
    user: {
      firstName: string;
      lastName: string;
      avatarUrl?: string | null;
    };
  };
}

export interface ApiCourseDetail extends ApiCourseListItem {
  instructor: ApiCourseInstructor | null;
  modules: ApiCourseModule[];
  reviews?: ApiCourseReview[];
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface QueryCoursesParams {
  page?: number;
  limit?: number;
  sortBy?: "price" | "rating" | "name" | "createdAt";
  order?: "asc" | "desc";
  search?: string;
  category?: string;
  level?: ApiCourseLevel;
  priceMin?: number;
  priceMax?: number;
  featured?: boolean;
}
