export interface OrderProductSizeModel {
  name: string;
  id: number;
}

export interface OrderProductModel {
  product: number;
  size: OrderProductSizeModel;
  count: number;
}
