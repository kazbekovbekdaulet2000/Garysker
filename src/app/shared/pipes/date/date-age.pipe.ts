import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'DateAge'
})
export class DateAgePipe implements PipeTransform {

  constructor(
  ) {
  }

  transform(birth_date: string): string {
    var today = new Date();
    var birthDate = new Date(birth_date);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    let prefix = "год"
    if (age % 10 > 1) {
      prefix = "годa"
    } else if (age % 10 >= 5) {
      prefix = "лет"
    }
    return `${age} ${prefix}`;
  }
}
