import { DescriptionModel, NameModel } from "@core/models/name.model"
import { ProductModel } from "./product.model"

export interface ProductDetailModel extends ProductModel, DescriptionModel {
  care_ru: string
  care_kk: string
  compound: NameModel[]
}