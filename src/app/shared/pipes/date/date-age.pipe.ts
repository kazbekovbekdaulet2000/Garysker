import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'DateAge'
})
export class DateAgePipe implements PipeTransform {

  constructor(
    private translate: TranslateService
  ) {
  }

  transform(birth_date: string): Observable<string | undefined> {
    var today = new Date();
    var birthDate = new Date(birth_date);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    let prefix = "year_1"
    if (age % 10 > 1) {
      prefix = "year_2_4"
    } else if (age % 10 >= 5) {
      prefix = "year_5"
    }

    return this.translate.get(`sections.date.age.${prefix}`, { age }).pipe(
      map(data => {
        return <string>data
      }))
  }
}
