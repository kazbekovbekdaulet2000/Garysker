import { Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { Select } from '@ngxs/store'
import { opacityAnimation } from '@core/animations/opacity-animation';
import { heightAnimation } from '@core/animations/height-animation';
import 'swiper/swiper.scss'
import SwiperCore, { Autoplay, Navigation, Scrollbar, Mousewheel, SwiperOptions } from "swiper";
import { MainState } from '../../main.state';

SwiperCore.use([Autoplay, Navigation, Scrollbar, Mousewheel]);

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss'],
  animations: [opacityAnimation, heightAnimation],
  encapsulation: ViewEncapsulation.None,
})
export class EduPopularComponent {
  @Input() popular: any
  @ViewChild('swiper', { static: false }) swiper: any;
  config!: SwiperOptions;

  resizeObservable$!: Observable<Event>
  resizeSubscription$!: Subscription
  cellCount: number = window.innerWidth > 640 ? 2 : 1;

  constructor(
    private router: Router
  ) {
    this.resizeObservable$ = fromEvent(window, 'resize')

    this.resizeSubscription$ = this.resizeObservable$.subscribe((evt: any) => {
      if (Number(evt.target?.innerWidth) < 640) {
        this.cellCount = 1
        return
      }
      this.cellCount = 2
    })

    this.config = {
      spaceBetween: 24,
      loop: true,
      loopedSlides: 10,
      initialSlide: 1,
      observer: true,
      autoplay: {
        delay: 5000
      },
      centeredSlides: true,
      navigation: false,
      direction: 'horizontal'
    };
  }

  slideNext() {
    this.swiper.swiperRef.slideNext();
  }

  slidePrev() {
    this.swiper.swiperRef.slidePrev();
  }

  onNavigate(item: any) {
    if (item?.read_time) {
      this.router.navigate(['edu/reports', item?.id])
    } else {
      this.router.navigate(['edu/videos', item?.id])
    }
  }
}
