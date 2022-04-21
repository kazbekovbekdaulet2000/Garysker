import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { intervals } from './intervals';

@Pipe({
  name: 'courseTime'
})
export class CourseTimePipe implements PipeTransform {

  constructor(
    private translate: TranslateService
  ) {
  }

  transform(val: any, type: 'time' | 'lesson_cnt'): Observable<string | undefined> {
    switch (type) {
      case 'time':
        const split = val.split(' ');
        let t = ''
        let d = ''
        let days = 0
        if (split.length > 1) {
          d = split[0]
          days = Number(d) * 86400
          t = split[1]
        } else {
          t = split[0]
        }
        let a = t.split(":")
        let seconds = (+a[0]) * 3600 + (+a[1]) * 60 + (+a[0]) + days;
        const timeObj = intervals.find(val => {
          let time = Math.floor(seconds / val.value);
          if (time !== 0) {
            return val
          }
          return false
        })
        const duriation = Math.floor(seconds / timeObj!.value)
        const prefix_time = duriation === 1 ? timeObj!.name_single : timeObj!.value >= 5 ? timeObj!.name_plural_5 : timeObj!.name_plural
        return this.translate.stream(`course.time.${prefix_time}`, { time: duriation }).pipe(
          map(data => {
            return <string>data
          }))
      default:
        const prefix = val >= 4 ? '1' : val >= 2 ? "2_4" : "1"
        return this.translate.stream(`course.lesson.cnt_${prefix}`, { count: val }).pipe(
          map(data => {
            return <string>data
          }))
    }
  }
}
