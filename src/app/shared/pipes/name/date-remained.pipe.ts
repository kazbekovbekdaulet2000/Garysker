import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';

@Pipe({
  name: 'DateRemained'
})
export class DateRemainedPipe implements PipeTransform {

  constructor(
  ) {
  }

  transform(date: string): string {
    if (date) {
      const seconds = Math.floor((+new Date() - +new Date(date)) / 1000);

      if (seconds < 29)
        return 'только что';

      const intervals = [
        { name_single: 'год', name_plural: "года", value: 31536000 },
        { name_single: 'месяц', name_plural: "месяца", value: 2592000 },
        { name_single: 'неделя', name_plural: "недель", value: 604800 },
        { name_single: 'день', name_plural: "дней", value: 86400 },
        { name_single: 'час', name_plural: "часов", value: 3600 },
        { name_single: 'минут', name_plural: "минут", value: 60 },
        { name_single: 'секунд', name_plural: "секунд", value: 1 }
      ];

      const counter = intervals.map(val => {
        let sec = Math.floor(seconds / val.value);
        if (sec <= 1) {
          return { indx: sec, value: `${val.name_single} назад` }
        }else{
          return { indx: sec, value: `${sec} ${val.name_plural} назад` }
        }
      })
      
      const new_date = counter.find((val) => {
        if (val.indx != 0) {
          return val
        } else {
          return false
        }
      })

      return new_date!.value
    }
    return date;
  }
}