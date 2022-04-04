import { Pipe, PipeTransform } from '@angular/core';
import { CategoryModel } from '@core/models/api/category.model';
import { AppState } from '@core/states/app/app.state';
import { LangType } from '@core/types/lang.type';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Pipe({
  name: 'categoryImage'
})

export class LangCategoryImagePipe implements PipeTransform {

  @Select(AppState.lang) lang$!: Observable<LangType>
  @Select(AppState.categories) categories$!: Observable<CategoryModel[]>

  constructor() { }

  transform(id: number | undefined): Observable<string | undefined> {
    return this.lang$.pipe(
      switchMap(lang => {
        return this.categories$.pipe(
          map(categories => {
            return categories.find(category => category.id === id)?.icon
          })
        )
      })
    );
  }
}
