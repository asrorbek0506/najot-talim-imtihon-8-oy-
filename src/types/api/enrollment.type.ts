import type { ApiCourseInstructor, ApiCourseModule } from "./course.type";

export type EnrollmentStatus = "active" | "completed" | "cancelled";
export type PaymentMethod = "payme" | "click" | "card";

export interface MyCourseListItem {
  id: string;
  status: EnrollmentStatus;
  progress: number;
  enrolledAt: string;
  completedAt: string | null;
  lastViewedLessonId: string | null;
  course: {
    id: string;
    name: string;
    slug: string;
    imageUrl: string | null;
    category: string;
    lessonsCount: number;
    instructor: {
      user: {
        firstName: string;
        lastName: string;
        avatarUrl: string | null;
      };
    } | null;
  };
}

export interface MyCourseLesson {
  id: string;
  moduleId: string;
  title: string;
  durationMinutes: number;
  order: number;
  videoUrl: string | null;
  content: string | null;
  isPreview: boolean;
  completed: boolean;
  watchedSeconds: number;
}

export interface MyCourseModule extends Omit<ApiCourseModule, "lessons"> {
  lessons: MyCourseLesson[];
}

export interface MyCourseDetail {
  enrollment: {
    status: EnrollmentStatus;
    progress: number;
    lastViewedLessonId: string | null;
    completedAt: string | null;
  };
  course: {
    id: string;
    name: string;
    slug: string;
    description: string;
    longDescription: string;
    imageUrl: string | null;
    instructor:
      | (Omit<ApiCourseInstructor, "id" | "rating"> & { specialty: string })
      | null;
    modules: MyCourseModule[];
  };
}

export interface CheckoutPayload {
  courseId: string;
  method: PaymentMethod;
  transactionId?: string;
}

export interface CheckoutResult {
  enrollment: {
    id: string;
    status: EnrollmentStatus;
    course: { id: string; name: string; slug: string; imageUrl: string | null };
  };
  payment: { id: string; amount: string | number; status: string };
}
