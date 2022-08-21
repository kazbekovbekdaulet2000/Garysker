import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './swiper.component';
import { SwiperModule } from 'swiper/angular';


@NgModule({
  declarations: [
    CarouselComponent
  ],
  exports: [
    CarouselComponent
  ],
  imports: [
    CommonModule,
    SwiperModule,
  ]
})
export class CarouselModule { }
