import { DescriptionModel } from "../name.model"

export interface LectorModel {
  id: number
  fullname: string
  icon: string
  role_kk: string
  role_ru: string
}

export interface LectorDetailModel extends DescriptionModel {
  id: number
  fullname: string
  icon: string
  role_kk: string
  role_ru: string
}