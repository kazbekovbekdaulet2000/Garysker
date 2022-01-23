import { UserModel } from "./user.model";


export interface VideoModel {
  id: number,
  title: string,
  image: string,
  created_at: string,
  category: string,
  likes_count: number,
  liked: boolean,
  bookmarks_count: number,
  bookmarked: boolean,
  views: number,
}

export interface VideoDetailModel extends VideoModel {
  author: UserModel,
  body: string,
  video: string  
}
