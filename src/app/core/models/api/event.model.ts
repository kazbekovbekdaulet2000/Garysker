import { DescriptionModel, NameModel } from "../name.model";
import { VideoTranscodeModel } from "./video/video-transcode.model";

export interface EventModel extends NameModel, DescriptionModel {
  id: number,
  address_ru: string,
  address_kk: string,
  address_link: string,
  event_date:string,
  bookmarks_count: number,
  bookmarked: boolean,
  views: number,
  poster: string,
  canceled: boolean,
  max_user_count: number | null,
  participants_count: number,
  participant: boolean,
  video: VideoTranscodeModel
}