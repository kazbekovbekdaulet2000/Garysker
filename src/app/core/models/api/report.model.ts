import { UserModel } from "./user.model";

export interface ReportModel {
  id: number,
  title: string,
  image: string,
  created_at: string,
  category: string,
  category_icon?: string,
  read_time: string,
  likes_count: number,
  liked: boolean,
  bookmarks_count: number,
  bookmarked: boolean,
  comments_count: number
  views: number
}

export interface ReportDetailModel extends ReportModel{
  author: UserModel,
  body: string,
  icon?: string,
}