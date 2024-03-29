import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { heightAnimation } from '@core/animations/height-animation';
import { UpdateTop } from '@core/states/scroll/scroll';
import { SwiperComponent } from 'swiper/angular';
import { Store } from '@ngxs/store';
import { SwiperOptions } from 'swiper';
import { CategoriesService } from '@core/services/categories.service';


@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss'],
  animations: [opacityAnimation, heightAnimation],
})
export class EduPopularComponent {
  @Input() popular: any[]
  @ViewChild(SwiperComponent, { static: false }) swiper: SwiperComponent | undefined;

  breakpoints: {
    [size: number]: SwiperOptions;
    [ratio: string]: SwiperOptions;
  } = {
      320: {
        slidesPerView: 1.075,
        spaceBetween: 16
      },
      640: {
        slidesPerView: 1.5,
        spaceBetween: 16
      },
      1000: {
        slidesPerView: 2,
        spaceBetween: 24
      },
      '': {}
    }

  constructor(
    private store: Store,
    private router: Router,
    public categoriesService: CategoriesService
  ) { }

  onNavigate(item: any) {
    this.store.dispatch(new UpdateTop(document.documentElement.scrollTop))
    if (item.read_time) {
      this.router.navigate(['edu/reports', item?.id])
    } else {
      this.router.navigate(['edu/videos', item?.id])
    }
  }

  get height(): number {
    return window.innerWidth >= 640 ? 300 : 200
  }
}
