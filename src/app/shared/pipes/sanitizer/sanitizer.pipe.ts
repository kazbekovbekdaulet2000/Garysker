import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { environment } from '@env';
import * as DOMPurify from 'dompurify';

@Pipe({
  name: 'sanitizer'
})
export class SanitizerPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }

  transform(v: string): SafeHtml {
    var re = /\/media\/uploads\//gi;
    var newHtml = v.replace(re, `https://app.garyshker-app.kz/media/uploads/`);

    const sanitizedContent = DOMPurify.sanitize(newHtml);
    return this.sanitizer.bypassSecurityTrustHtml(sanitizedContent);
  }

}
