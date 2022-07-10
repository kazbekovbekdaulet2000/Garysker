import { DescriptionModel, NameModel } from "../name.model"

export interface LessonResourceModel extends NameModel, DescriptionModel {
  id: number
  file: string
  link: string
  course: number
  lesson: number
  lesson_module: number
  image: string
}