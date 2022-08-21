import { Pipe, PipeTransform } from '@angular/core';
import { AppState } from '@core/states/app/app.state';
import { LangType } from '@core/types/lang.type';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'lang'
})
export class LangTextPipe implements PipeTransform {

  @Select(AppState.lang) lang$!: Observable<LangType>

  constructor() {}

  transform(value: any, key: string = 'name'): Observable<string> {
    return this.lang$.pipe(
      map(lang => {
        if(!!value.languages && value.languages.includes(lang)){
          return value[`${key}_${lang}`]
        }else if(!!value.languages){
          return value[`${key}_${value.languages[0]}`]
        }else{
          return value[`${key}_${lang}`]
        }
      })
    );
  }
}
