import { UserModel } from "./user.model";

export interface ReportModel {
  id: number,
  title_kk: string,
  title_ru: string,
  image: string,
  created_at: string,
  category: number,
  read_time: string,
  read_time_ru: string,
  read_time_kk: string,
  likes_count: number,
  liked: boolean,
  bookmarks_count: number,
  bookmarked: boolean,
  comments_count: number
  views: number,
  tags: string[]
}

export interface ReportDetailModel extends ReportModel{
  author: UserModel,
  body: string,
  icon?: string,
  preview_text_kk: string,
  preview_text_ru: string
}