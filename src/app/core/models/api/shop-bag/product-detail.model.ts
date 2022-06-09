import { ProductModel } from "../shop/product.model"

export interface ProductSizeDetailModel {
  id: number;
  size: number;
  size_global: string;
}

export interface UserBagProductsModel {
  id: number;
  product: ProductModel;
  count: number;
  size: ProductSizeDetailModel;
}

export interface UserBagProductsIdModel {
  id: number;
  product: number;
  count: number;
  size: number;
}

export interface UserBagModel {
  id: string;
  products: UserBagProductsModel[]
}