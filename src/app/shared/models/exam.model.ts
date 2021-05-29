export interface Exam {
  id?: number;
  courseId?: number;
  courseName?: string;
  name?: string;
  description?: string;
  date?: Date;
  scoreThreshold?: number;
}
