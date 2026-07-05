import type { Icon } from "../components/ui/Icon";

export type IconName = keyof typeof Icon;

export interface DashboardNavItem {
  label: string;
  icon: IconName;
  path: string;
}

export interface DashboardNavGroup {
  title: string;
  items: DashboardNavItem[];
}

export interface DashboardStat {
  value: string;
  label: string;
  icon: IconName;
  color: string;
  trend?: string;
}

export interface ActiveCourse {
  courseId: string;
  image: string;
  category: string;
  categoryColor: string;
  title: string;
  teacher: string;
  teacherPhoto: string;
  completedLessons: number;
  totalLessons: number;
  progress: number;
  progressColor: string;
}

export interface RecommendedCourse {
  image: string;
  category: string;
  categoryColor: string;
  title: string;
  lessons: number;
  hours: number;
}

export interface WeekDay {
  label: string;
  status: "done" | "today" | "upcoming";
  value?: string;
}

export interface ContinueLearning {
  courseId: string;
  image: string;
  title: string;
  module: string;
  completedLessons: number;
  totalLessons: number;
  progress: number;
}

export interface MyCourse extends ActiveCourse {
  id: string;
  courseId: string;
  status: "active" | "completed";
  lastActivity: string;
}

export interface CourseResult {
  id: string;
  course: string;
  teacher: string;
  testsCompleted: number;
  totalTests: number;
  averageScore: number;
  lastTestDate: string;
}

export interface Certificate {
  id: string;
  courseTitle: string;
  teacher: string;
  issuedAt: string;
  certificateId: string;
  image: string;
}

export interface PaymentRecord {
  id: string;
  date: string;
  course: string;
  amount: string;
  method: string;
  status: "paid" | "pending" | "failed";
}
