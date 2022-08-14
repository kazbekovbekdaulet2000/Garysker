import { AfterViewInit, Component, ContentChild, EventEmitter, Input, Output, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import SwiperCore, { Navigation, Pagination, Autoplay, SwiperOptions } from "swiper";
import { SwiperComponent } from 'swiper/angular';
import { AutoplayOptions } from 'swiper/types';

SwiperCore.use([Pagination, Navigation, Autoplay]);

export interface SwiperBreakpoint {
  [size: number]: SwiperOptions;
  [ratio: string]: SwiperOptions;
}

@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CarouselComponent implements AfterViewInit {

  @Input() slides: any[] = [];
  @Input() activeIndex: number = 0;
  @Input() horizontalPadding: number = 0;
  @Input() loop: boolean = false;
  @Input() class: 'swiper-carousel' | 'swiper-carousel-inner' = 'swiper-carousel-inner';
  @Input() pagination: any = false
  @Input() slidesPerView: number | 'auto' = 'auto';
  @Input() spaceBetween: number = 8;
  @Input() centeredSlides: boolean = false;
  @Input() navigation: boolean = true;
  @Input() autoplay: AutoplayOptions | boolean = {
    delay: 5000,
    stopOnLastSlide: false,
    disableOnInteraction: false,
    pauseOnMouseEnter: false
  }
  @Input() bottomMargin: number = 16;
  @Input() mousewheel: boolean = false
  @Input() breakpoints: SwiperBreakpoint;

  @Output() isEnd = new EventEmitter<any>();

  @ContentChild(TemplateRef) templateRef!: TemplateRef<any>;

  @ViewChild(SwiperComponent, { static: false }) swiper?: SwiperComponent;

  constructor() { }

  ngAfterViewInit(): void {
    this.swiper?.swiperRef.slideTo(this.activeIndex, 500)
  }

  get width(): string {
    return `calc(100% + ${this.horizontalPadding * 2}px)`
  }

  get marginLeft(): string {
    return `-${this.horizontalPadding}px`
  }

  onSwiper(event: any) {
    this.isEnd.emit(event.activeIndex + 6 > event.slides.length)
  }
  onSlideChange() {
    // if (this.swiper.swiperRef.activeIndex === this.slides.length && this.loop) {
    //   this.swiper.swiperRef.slideTo(0, 500, false)
    // }
  }
}
