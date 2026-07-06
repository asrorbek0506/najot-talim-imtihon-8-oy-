import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../../config/axios";
import Endpoints from "../../config/endpoints";

const uploadFile = async (url: string, file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await axios.post(url, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data.data;
};

export const useUploadStudentAvatar = (studentId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (file: File) =>
      uploadFile(Endpoints.admin.studentAvatar(studentId), file),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin/students", studentId],
      });
      queryClient.invalidateQueries({ queryKey: ["admin/students"] });
    },
  });
};

export const useUploadInstructorAvatar = (instructorId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (file: File) =>
      uploadFile(Endpoints.admin.instructorAvatar(instructorId), file),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin/instructors", instructorId],
      });
      queryClient.invalidateQueries({ queryKey: ["admin/instructors"] });
    },
  });
};

export const useUploadCourseImage = (courseId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (file: File) =>
      uploadFile(Endpoints.admin.courseImage(courseId), file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin/courses", courseId] });
      queryClient.invalidateQueries({ queryKey: ["admin/courses"] });
    },
  });
};
