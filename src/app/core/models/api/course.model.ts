import { DescriptionModel, NameModel } from "../name.model";
import { OrganizationModel } from "./organization.model";
import { VideoTranscodeModel } from "./video/video-transcode.model";


export interface CourseModel extends NameModel, DescriptionModel {
  organization: OrganizationModel;
  created_at: string;
  updated_at: string;
  participant: boolean;
  likes_count: number;
  comments_count: number;
  reviews_count: number;
  bookmarks_count: number;
  duriation: string;
  views: number;
  image: string;
  lesson_count: number;
  languages: string;
  category: number;
  teaser: VideoTranscodeModel
}

export interface CourseDetailModel extends CourseModel {
  rating: number;
  completed: boolean;
  course_instance: {
    completed: boolean;
    course: number;
    current_lesson: number;
    progress: number;
    user: number
  }
  ratings_count: number;
  user_rating: boolean;
}