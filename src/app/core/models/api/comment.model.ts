import { UserModel } from "./user.model";

export interface CommentModel {
  id: number,
  replies: CommentModel[],
  created_at: string,
  updated_at: string,
  body: string,
  reply: number,
  owner: UserModel
}