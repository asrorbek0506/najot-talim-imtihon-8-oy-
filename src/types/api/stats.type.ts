export interface PublicStats {
  students: number;
  graduates: number;
  instructors: number;
  courses: number;
  certificates: number;
}

export interface PublicTestimonial {
  rating: number;
  text: string | null;
  createdAt: string;
  course: { id: string; name: string; slug: string } | null;
  name: string;
  avatarUrl: string | null;
}
