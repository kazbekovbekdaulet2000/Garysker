import { UserModel } from "./user.model";

export interface ReviewModel {
  id: number,
  created_at: string,
  updated_at: string,
  body: string,
  owner: UserModel,

    // id	integer
    // owner	UserInfo{...}
    // created_at	string($date-time)
    // updated_at	string($date-time)
    // likes_count	integer
    // bookmarks_count	integer
    // rating	integer
    // body
}