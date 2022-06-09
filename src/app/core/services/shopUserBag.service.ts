import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserBagModel, UserBagProductsIdModel, UserBagProductsModel } from '@core/models/api/shop-bag/product-detail.model';
import { environment } from '@env';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ShopUserBagService extends ApiService {

  constructor(
    protected http: HttpClient,
  ) {
    super('shop/bag');
  }

  createUUID(): Observable<UserBagModel> {
    return this.http.post<UserBagModel>(this.getUrl(), {})
  }

  listProducts(uuid: string): Observable<UserBagProductsModel[]> {
    return this.http.get<UserBagProductsModel[]>(this.getUrl(`${uuid}/products`), {})
  }

  addProduct(uuid: string, body: any): Observable<UserBagProductsModel> {
    return this.http.post<UserBagProductsModel>(this.getUrl(`${uuid}/products`), body)
  }

  getProduct(uuid: string, id: number): Observable<UserBagProductsModel> {
    return this.http.get<UserBagProductsModel>(this.getUrl(`${uuid}/products/${id}`), {})
  }

  patchProduct(uuid: string, id: number, body: any): Observable<UserBagProductsIdModel> {
    return this.http.patch<any>(this.getUrl(`${uuid}/products/${id}`), body)
  }

  createOrder(body: any): Observable<any> {
    const url = `${environment.API}/shop/products/order/`;
    return this.http.post<any>(url, body)
  }

  deleteProduct(uuid: string, id: number): Observable<any> {
    return this.http.delete<any>(this.getUrl(`${uuid}/products/${id}`))
  }
}