import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { EventModel } from '@core/models/api/event.model';
import { ListResponseModel } from '@core/models/api/list.model';
import { ProductModel } from '@core/models/api/shop/product.model';
import { ProductDetailModel } from '@core/models/api/shop/product-detail.model';

@Injectable({
  providedIn: 'root'
})

export class ShopProductsService extends ApiService {

  constructor(
    protected http: HttpClient
  ) {
    super('shop/products');
  }

  list(params?: any): Observable<ListResponseModel<ProductModel>> {
    return this.http.get<ListResponseModel<ProductModel>>(this.getUrl(), { params })
  }

  get(eventId: number): Observable<ProductDetailModel> {
    return this.http.get<ProductDetailModel>(this.getUrl(eventId))
  }

}
