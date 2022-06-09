import { ProductModel } from "./product.model"

export interface NameModel {
  name_ru: string
  name_kk: string
}

export interface ProductDetailModel extends ProductModel {
  description_ru: string
  description_kk: string
  care_ru: string
  care_kk: string
  compound: NameModel[]
}