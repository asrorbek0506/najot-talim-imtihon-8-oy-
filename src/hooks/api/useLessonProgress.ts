import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../../config/axios";
import Endpoints from "../../config/endpoints";

interface MarkProgressPayload {
  lessonId: string;
  completed?: boolean;
  watchedSeconds?: number;
}

export const useMarkLessonProgress = (courseId: string | undefined) => {
  const queryClient = useQueryClient();

  const markProgress = async ({ lessonId, ...body }: MarkProgressPayload) => {
    const { data } = await axios.post(
      Endpoints.student.lessonProgress(lessonId),
      body,
    );
    return data.data;
  };

  return useMutation({
    mutationFn: markProgress,
    onSuccess: () => {
      if (courseId) {
        queryClient.invalidateQueries({
          queryKey: ["student/enrollments", courseId],
        });
      }
      queryClient.invalidateQueries({ queryKey: ["student/enrollments"] });
    },
  });
};

export default useMarkLessonProgress;
