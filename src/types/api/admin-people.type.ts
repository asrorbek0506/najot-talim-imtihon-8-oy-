export type AdminStudentStatus = "active" | "inactive" | "graduated";
export type AdminInstructorStatus = "active" | "inactive";
export type Gender = "male" | "female";

export interface AdminStudent {
  id: string;
  studentId: string;
  enrolledAt: string;
  status: AdminStudentStatus;
  userId: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  middleName?: string | null;
  birthDate?: string | null;
  gender?: Gender | null;
  address?: string | null;
  avatarUrl?: string | null;
  status_user?: string;
  role?: string;
  _count?: { enrollments: number; certificates?: number };
}

export interface AdminInstructor {
  id: string;
  instructorId: string;
  specialty: string;
  experience: number;
  bio?: string | null;
  rating: string | number;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    telegram?: string;
  } | null;
  status: AdminInstructorStatus;
  userId: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  middleName?: string | null;
  birthDate?: string | null;
  gender?: Gender | null;
  address?: string | null;
  avatarUrl?: string | null;
  _count?: { courses: number };
  courses?: {
    id: string;
    name: string;
    slug: string;
    imageUrl: string | null;
    studentsCount: number;
    rating: string | number;
  }[];
}

export interface CreateStudentPayload {
  email: string;
  phone: string;
  password: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  birthDate?: string;
  gender?: Gender;
  address?: string;
  enrolledAt?: string;
  status?: AdminStudentStatus;
}

export type UpdateStudentPayload = Partial<
  Omit<CreateStudentPayload, "password">
> & {
  userStatus?: "active" | "inactive" | "banned";
};

export interface CreateInstructorPayload {
  email: string;
  phone: string;
  password: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  birthDate?: string;
  gender?: Gender;
  address?: string;
  specialty: string;
  experience?: number;
  bio?: string;
  socialLinks?: { github?: string; linkedin?: string; telegram?: string };
  status?: AdminInstructorStatus;
}

export type UpdateInstructorPayload = Partial<
  Omit<CreateInstructorPayload, "password">
> & {
  userStatus?: "active" | "inactive" | "banned";
};
