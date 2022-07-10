import { AfterViewInit, Component, ContentChild, EventEmitter, Input, Output, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import SwiperCore, { Navigation, Pagination } from "swiper";
import { SwiperComponent } from 'swiper/angular';

SwiperCore.use([Pagination, Navigation]);

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
  @Input() pagination: any = false
  @Input() slidesPerView: number | 'auto' = 'auto';
  @Input() spaceBetween: number = 8;
  @Input() centeredSlides: boolean = false;
  @Input() navigation: boolean = true;
  @Input() autoplay: any = { delay: 5000 }
  @Input() bottomMargin: number = 16;
  @Input() mousewheel: boolean = false

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
    this.isEnd.emit(event.activeIndex+6>event.slides.length)
  }
}
