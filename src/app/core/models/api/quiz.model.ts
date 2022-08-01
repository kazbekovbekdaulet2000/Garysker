import { NameModel } from "../name.model"

export interface QuizModel extends NameModel{
  id: number;
  max_points: number;
  created_at: string;
  updated_at: string;
  default_pass_percentage: number;
  default_attempts_count: number;
}