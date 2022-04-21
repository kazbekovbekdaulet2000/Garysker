import { CategoryModel } from "./category.model";
import { LectorModel } from "./lector.model";
import { OrganizationModel } from "./organization.model";


export interface CourseModel {
  id: number
  organization: OrganizationModel
  category: number
  lectors: LectorModel[]
  inprogress: boolean
  closed_lessons: number
  created_at: string
  updated_at: string
  name_kk: string
  name_ru: string
  description_kk: string
  description_ru: string
  duriation: number
  views: number
  image: string
  rating: number
  lesson_count: number
  teaser: string
}

export interface CourseDetailModel extends CourseModel {
  ratings_count: number
}