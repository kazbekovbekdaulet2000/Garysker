import { ProductImageModel } from "./product-image.model"

export interface ProductModel {
  id: number
  name_ru: string
  name_kk: string
  price: number
  g_token_price: number
  discount: number
  images: ProductImageModel[]
  likes_count: number
  reviews_count: number
  bookmarks_count: number
}