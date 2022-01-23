import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category'
})
export class CategoryNamePipe implements PipeTransform {

  constructor(
  ) {
  }

  transform(date: string): string {
    return date;
  }
}
