import { NameModel } from "../name.model"

export interface CategoryModel extends NameModel {
  id: number,
  created_at: string,
  updated_at: string
  icon?: string
}