import { OrderProductSizeModel } from "@core/models/local/order_product.model"
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

export interface ProductOrderModel extends ProductModel {
  size: OrderProductSizeModel;
  count: number
}