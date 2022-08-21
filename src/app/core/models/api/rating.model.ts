import { UserModel } from "./user.model";

export interface RatingModel {
  id: number,
  created_at: string,
  updated_at: string,
  body: string,
  rating: number,
  owner: UserModel,
  liked: boolean,
  likes_count: number
}