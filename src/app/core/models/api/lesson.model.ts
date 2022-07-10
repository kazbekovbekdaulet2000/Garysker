import { DescriptionModel, NameModel } from "../name.model"
import { LectorDetailModel, LectorModel } from "./lector.model"
import { OrganizationModel } from "./organization.model"
import { VideoTranscodeModel } from "./video/video-transcode.model"

export interface LessonModel extends NameModel, DescriptionModel{
  id: number
  duriation: string
  finished: boolean
  accessible: boolean
  attempts: number
  lector: LectorModel | LectorDetailModel
}

export interface LessonDetailModel extends LessonModel{
  organization: OrganizationModel
  category: number
  lector: LectorDetailModel
  video: VideoTranscodeModel
  modules: number[]
  participated: boolean
  test_id: number
  order: number
  course_participation: boolean
}