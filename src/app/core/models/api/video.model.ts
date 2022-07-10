import { UserModel } from "./user.model";
import { VideoTranscodeModel } from "./video/video-transcode.model";


export interface VideoModel {
  id: number,
  title_kk: string,
  title_ru: string,
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
  body_kk: string,
  body_ru: string,
  duriation: string,
  tags: string[]
}

export interface VideoDetailModel extends VideoModel {
  author: UserModel,
  video_quality: Array<{
    path: string,
    quality: number
  }>
  original_quality: number,
  subs_kk: string,
  youtube: string,
  video: VideoTranscodeModel
}