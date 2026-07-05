export interface CourseModuleLesson {
  title: string;
  duration: string;
  preview?: boolean;
}

export interface CourseModule {
  title: string;
  duration: string;
  lessons: CourseModuleLesson[];
}

export interface CourseReview {
  name: string;
  photo: string;
  rating: number;
  date: string;
  text: string;
}

export type CourseLevel = "Boshlang'ich" | "O'rta" | "Yuqori";

export interface Course {
  id: string;
  image: string;
  category: string;
  level: CourseLevel;
  rating: string;
  reviews: string;
  title: string;
  desc: string;
  longDesc: string;
  teacher: string;
  teacherPhoto: string;
  price: string;
  oldPrice?: string;
  duration: string;
  students: string;
  language: string;
  updatedAt: string;
  whatYouWillLearn: string[];
  requirements: string[];
  curriculum: CourseModule[];
  reviewsList: CourseReview[];
}
