import { LectorDetailModel, LectorModel } from "./lector.model"
import { OrganizationModel } from "./organization.model"

export interface LessonModel{
  id: number
  name_kk: string
  name_ru: string
  description_kk: string
  description_ru: string
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
  video: string
  modules: number[]
  participated: boolean
  test_id: number
  order: number
  course_participation: boolean
}