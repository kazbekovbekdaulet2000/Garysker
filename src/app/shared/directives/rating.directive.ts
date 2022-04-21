import { Directive, ElementRef, Input, OnInit } from '@angular/core';

const getFireSVGIconHTML = (color: string): string => {
  return `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" style="margin-left: 4px;" xmlns="http://www.w3.org/2000/svg"><path d="M5.45149 12.1441C5.17847 13.1839 5.64083 14.1862 6.01933 14.6667C1.66625 12.5045 1.91543 8.66364 4.69422 6.01801C6.20825 4.57654 6.20837 3.85585 6.01924 1.33333C8.13881 1.90991 9.93036 4.45645 10.5612 5.65765C11.1668 5.08108 11.3182 3.97597 11.3182 3.49549C12.2013 4.21621 13.7781 6.73874 13.7781 9.62162C13.7781 12.5045 11.1286 14.0661 9.61467 14.6667C9.99316 14.4264 10.5967 12.9857 10.5612 11.7838C10.4966 9.59541 8.49925 7.98999 7.11144 7.62963C7.36377 7.86987 7.58006 8.85168 7.48181 9.48148C7.28024 10.7735 5.82999 10.7027 5.45149 12.1441Z" fill="${color}" stroke="${color}" stroke-linejoin="round"/></svg>`
}

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ratingImage]'
})
export class CustomTestComplexityDirective implements OnInit {

  @Input() rating: number = 0.0;

  constructor(
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    let html = '';
    let color = '';

    switch (true) {
      case this.rating > 0 && this.rating <= 1:
        html = getFireSVGIconHTML(color);
        break;
      case this.rating > 1 && this.rating <= 2:
        html = '';
        break;
      case this.rating > 2 && this.rating <= 3:
        html = ''
        break;
      case this.rating > 3 && this.rating <= 4:
        html = '';
        break;
      case this.rating > 4 && this.rating <= 5:
        html = '';
        break;
    }

    this.elementRef.nativeElement.innerHTML = html;
    this.elementRef.nativeElement.style.setProperty(`display`, `inline-flex`);
  }
}