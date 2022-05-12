import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { intervals } from './intervals';

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
      return this.translate.stream('sections.date.now').pipe(
        map(data => {
          return String(data)
        })
      )

    const timeObj = intervals.find(val => {
      let time = Math.floor(seconds / val.value);
      if (time !== 0) {
        return val
      }
      return false
    })
    const time = Math.floor(seconds / timeObj!.value)
    const prefix = time === 1 ? timeObj!.name_single : timeObj!.value >= 5 ? timeObj!.name_plural_5 : timeObj!.name_plural
    return this.translate.stream(`sections.date.${prefix}`, { time: time }).pipe(
      map(data => {
        return String(data)
      })
    )
  }
}
