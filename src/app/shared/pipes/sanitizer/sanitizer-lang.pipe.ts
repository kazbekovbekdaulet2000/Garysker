import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AppState } from '@core/states/app/app.state';
import { LangType } from '@core/types/lang.type';
import { environment } from '@env';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'sanitizerLang'
})
export class SanitizerLangPipe implements PipeTransform {
  @Select(AppState.lang) lang$!: Observable<LangType>

  constructor(private sanitizer: DomSanitizer) { }

  transform(value: any, key: string): Observable<SafeHtml> {
    return this.lang$.pipe(
      map(lang => {
        var re = /\/media\/uploads\//gi;
        let html = value[`${key}_${lang}`]
        if (value.hasOwnProperty('languages')) {
          if (value.languages.includes(lang)) {
            html = value[`${key}_${lang}`]
          } else {
            html = value[`${key}_${value.languages[0]}`]
          }
        }
        var newHtml = html.replace(re, `${environment.API}/media/uploads/`);
        return this.sanitizer.bypassSecurityTrustHtml(newHtml);
      })
    )
  }

}
