export interface InstructorSocialLinks {
  github?: string;
  linkedin?: string;
  telegram?: string;
}

export interface ApiInstructorListItem {
  id: string;
  specialty: string;
  experience: number;
  bio: string | null;
  rating: string | number;
  socialLinks: InstructorSocialLinks | null;
  firstName: string;
  lastName: string;
  middleName?: string | null;
  avatarUrl?: string | null;
}

export interface ApiInstructorCourse {
  id: string;
  name: string;
  slug: string;
  imageUrl: string | null;
  rating: string | number;
  studentsCount: number;
}

export interface ApiInstructorDetail extends ApiInstructorListItem {
  courses: ApiInstructorCourse[];
}
