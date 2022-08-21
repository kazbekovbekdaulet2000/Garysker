import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'courseTime'
})
export class CourseTimePipe implements PipeTransform {

  constructor(
    private translate: TranslateService
  ) {
  }

  transform(val: any): Observable<string | undefined> {
    const prefix = val >= 4 ? '1' : val >= 2 ? "2_4" : "1"
    return this.translate.stream(`course.lesson.cnt_${prefix}`, { count: val }).pipe(
      map(data => {
        return <string>data
    }))
  }
}
