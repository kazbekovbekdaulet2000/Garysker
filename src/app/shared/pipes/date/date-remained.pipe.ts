import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'DateRemained'
})
export class DateRemainedPipe implements PipeTransform {

  constructor(
    private translate: TranslateService
  ) { }

  transform(date: string, suffix: boolean = false): Observable<string> {
    return this.translate.stream('_').pipe(map(() => {
      return moment(date).fromNow(suffix)
    }))
  }
}
