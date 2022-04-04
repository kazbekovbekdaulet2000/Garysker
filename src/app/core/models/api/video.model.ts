import { UserModel } from "./user.model";


export interface VideoModel {
  id: number,
  title: string,
  image: string,
  image_2: string,
  created_at: string,
  category: number,
  likes_count: number,
  liked: boolean,
  bookmarks_count: number,
  bookmarked: boolean,
  views: number,
  comments_count: number,
  body: string,
  duriation: string
}

export interface VideoDetailModel extends VideoModel {
  author: UserModel,
  video: string,
  video_quality: Array<{
    path: string,
    quality: number
  }>
  original_quality: number,
  subs_kk: string,
  youtube: string,
}