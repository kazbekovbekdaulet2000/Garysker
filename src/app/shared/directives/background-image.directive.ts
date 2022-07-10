import { AfterViewInit, Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';


@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[backgroundImage]'
})
export class BackgroundImageDirective implements AfterViewInit, OnChanges {

  private htmlElement: HTMLElement;

  @Input() backgroundImage: string = '';
  @Input() temp: 'cover' | 'avatar' = 'cover';

  tempImg = {
    cover: 'data:image/jpeg;base64,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',
    avatar: './assets/img/temp_avatar.svg'
  };


  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {
    this.htmlElement = this.elementRef.nativeElement;
  }

  ngAfterViewInit() {
    this.setBackgroundImage();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['backgroundImage']) {
      this.setBackgroundImage();
    }
  }

  setBackgroundImage() {
    this.renderer.setStyle(this.htmlElement, 'backgroundSize', 'cover');
    this.renderer.setStyle(this.htmlElement, 'backgroundPosition', 'center');
    this.renderer.setStyle(this.htmlElement, 'backgroundRepeat', 'no-repeat');

    if (this.backgroundImage) {
      this.renderer.setStyle(this.htmlElement, 'backgroundImage', `url(${this.backgroundImage})`);
    } else {
      this.renderer.setStyle(this.htmlElement, 'backgroundImage', `url(${this.tempImg[this.temp]})`);
    }
  }
}
