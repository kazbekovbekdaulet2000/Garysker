import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ReadTime'
})
export class ReadTimePipe implements PipeTransform {

  constructor(
  ) {
  }

  transform(date: string): string {
    var myDate = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
    var a = date.split(':');
    var minutes = (+a[0]) * 60 + (+a[1]);
    return `время чтения: ${minutes} минуты`;
  }
}
