import type { IconName } from "./dashboard.type";

export interface AdminNavItem {
  label: string;
  icon: IconName;
  path: string;
}

export interface AdminStat {
  label: string;
  value: string;
  change: string;
  changeType: "up" | "down";
  icon: IconName;
  color: string;
}

export type StudentStatus = "active" | "inactive" | "graduated";

export interface Student {
  id: string;
  avatar: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  groupId: string;
  groupName: string;
  status: StudentStatus;
  balanceDue: number;
  joinedAt: string;
  birthDate: string;
  address: string;
  parentName: string;
  parentPhone: string;
}

export type GroupStatus = "active" | "upcoming" | "completed";

export interface Group {
  id: string;
  name: string;
  courseName: string;
  teacher: string;
  teacherPhoto: string;
  studentsCount: number;
  maxStudents: number;
  days: string;
  time: string;
  room: string;
  startDate: string;
  status: GroupStatus;
  color: string;
}

export type AttendanceStatus = "present" | "absent" | "late" | "excused";

export interface AttendanceEntry {
  studentId: string;
  studentName: string;
  avatar: string;
  groupName: string;
  status: AttendanceStatus;
}

export interface ScheduleSlot {
  day: string;
  time: string;
  groupName: string;
  teacher: string;
  room: string;
  color: string;
}

export interface TopStudent {
  name: string;
  avatar: string;
  group: string;
  score: string;
}

export interface RecentPayment {
  name: string;
  avatar: string;
  amount: string;
  date: string;
  status: "paid" | "pending";
}

export interface ChartPoint {
  label: string;
  value: number;
}
