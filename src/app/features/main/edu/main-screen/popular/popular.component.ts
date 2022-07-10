import { Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { Select, Store } from '@ngxs/store'
import { opacityAnimation } from '@core/animations/opacity-animation';
import { heightAnimation } from '@core/animations/height-animation';
import 'swiper/swiper.scss'
import SwiperCore, { Autoplay, Navigation, Scrollbar, Mousewheel, SwiperOptions } from "swiper";
import { MainState } from '../../../main.state';
import { UpdateTop } from '@core/states/scroll/scroll';
import FreeMode from 'swiper'
import { SwiperComponent } from 'swiper/angular';

SwiperCore.use([FreeMode, Autoplay, Navigation, Scrollbar, Mousewheel]);

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss'],
  animations: [opacityAnimation, heightAnimation],
  encapsulation: ViewEncapsulation.None,
})
export class EduPopularComponent {
  @Input() popular: any
  @ViewChild(SwiperComponent, { static: false }) swiper: SwiperComponent | undefined;

  @Select(MainState.selectedCategory) selectedCategory$!: Observable<boolean>

  resizeObservable$!: Observable<Event>
  resizeSubscription$!: Subscription
  cellCount: number = window.innerWidth > 1000 ? 2 : (window.innerWidth > 640 ? 1.5 : 1.075);
  spaceBetween: number = window.innerWidth > 1000 ? 24 : (window.innerWidth > 640 ? 16 : 12);
  height: number = window.innerWidth > 640 ? 300 : 200;

  constructor(
    private router: Router,
    private store: Store
  ) {
    this.resizeObservable$ = fromEvent(window, 'resize')

    this.resizeSubscription$ = this.resizeObservable$.subscribe((evt: any) => {
      if (Number(evt.target?.innerWidth) < 1000 && Number(evt.target?.innerWidth) >= 640) {
        this.cellCount = 1.5
        this.spaceBetween = 16
        this.height = 300
        return
      }
      if (Number(evt.target?.innerWidth) < 640) {
        this.cellCount = 1.075
        this.spaceBetween = 12
        this.height = 200
        return
      }
      this.cellCount = 2
      this.height = 300
      this.spaceBetween = 24
    })
  }

  slideNext() {
    this.swiper?.swiperRef.slideNext();
    this.swiper?.swiperRef.autoplay.start()
  }

  slidePrev() {
    this.swiper?.swiperRef.slidePrev();
    this.swiper?.swiperRef.autoplay.start()
  }

  onNavigate(item: any) {
    this.store.dispatch(new UpdateTop(document.documentElement.scrollTop))
    if (item.read_time) {
      this.router.navigate(['edu/reports', item?.id])
    } else {
      this.router.navigate(['edu/videos', item?.id])
    }
  }
}
