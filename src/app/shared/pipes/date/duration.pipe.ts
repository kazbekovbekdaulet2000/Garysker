import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'DurationPipe'
})
export class DurationPipe implements PipeTransform {

  constructor(
    private translate: TranslateService
  ) { }

  transform(date: string): Observable<string> {
    return this.translate.stream('_').pipe(map(() => {
      return moment.duration(date).humanize()
    }))
  }
}
