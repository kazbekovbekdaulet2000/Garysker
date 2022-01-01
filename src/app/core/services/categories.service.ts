import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { CategoryList } from '@core/models/api/category.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService extends ApiService {

  constructor(
    protected http: HttpClient
  ) {
    super('edu/categories');
  }

  list(params?: any): Observable<CategoryList> {
    return this.http.get<CategoryList>(this.noSlashUrl(), { params })
      .pipe(
        map(res=>{
          res.categories = res.categories.map(val=>{
            val.icon = val.name.substring(0, 2);
            val.name = val.name.substring(3)
            return val
          })
          return res
        })
      )
  }

}
