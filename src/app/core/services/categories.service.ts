import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { CategoryModel } from '@core/models/api/category.model';
import { map } from 'rxjs/operators';
import getCategoryIcon from '@core/utils/category-icons';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService extends ApiService {
  
  constructor(
    protected http: HttpClient
  ) {
    super('edu/categories');
  }

  list(params?: any): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(this.getUrl(), { params })
      .pipe(
        map(res => {
          res = res.map(val => {
            val.icon = getCategoryIcon(val.name_ru.substring(0, 2));
            val.name_ru = val.name_ru.substring(3)
            return val
          })
          return res
        })
      )
  }
}
