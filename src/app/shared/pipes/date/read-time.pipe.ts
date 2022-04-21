import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'ReadTime'
})
export class ReadTimePipe implements PipeTransform {

  constructor(
    private translate: TranslateService
  ) {
  }

  transform(date: string): Observable<string | undefined> {
    if(!date){
      return of('')
    }
    var a = date.split(':');
    var minutes = (+a[0]) * 60 + (+a[1]);
    let prefix = 'min_1'
    if (minutes === 0) {
      minutes++;
    }
    if (minutes >= 2) {
      prefix = 'min_2_4'
    }
    if (minutes >= 5) {
      prefix = 'min_5'
    }
    return this.translate.stream(`sections.date.read.${prefix}`, { time: minutes }).pipe(
      map(data => {
        return <string>data
      }))
  }
}
