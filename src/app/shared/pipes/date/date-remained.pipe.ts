import { Pipe, PipeTransform } from '@angular/core';
import { AppState } from '@core/states/app/app.state';
import { LangType } from '@core/types/lang.type';
import { TranslateService } from '@ngx-translate/core';
import { Select } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Interval, intervals } from './intervals';

@Pipe({
  name: 'DateRemained'
})
export class DateRemainedPipe implements PipeTransform {

  constructor(
    private translate: TranslateService
  ) {
  }

  transform(date: string): Observable<string> {
    const seconds = Math.floor((+new Date() - +new Date(date)) / 1000);

    if (seconds < 29)
      return this.translate.get('sections.date.now')

    const timeObj = intervals.find(val => {
      let time = Math.floor(seconds / val.value);
      if (time !== 0) {
        return val
      }
      return false
    })
    const time = Math.floor(seconds / timeObj!.value)
    const prefix = time === 1 ? timeObj!.name_single : timeObj!.value >= 5 ? timeObj!.name_plural : timeObj!.name_plural_5
    this.translate.onTranslationChange.subscribe(data => {
      console.log(data)
    })
    return this.translate.get(`sections.date.${prefix}`, { time: time }).pipe(
      map(data => {
        return <string>data
      }))
  }
}
