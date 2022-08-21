import { Component, Input } from '@angular/core';
import { heightAnimation } from '@core/animations/height-animation';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { ProductImageModel } from '@core/models/api/shop/product-image.model';
import  SwiperCore, { Zoom, Navigation, Pagination } from "swiper";

SwiperCore.use([Zoom, Navigation, Pagination]);

@Component({
  selector: "app-product-images",  
  templateUrl: './product-detail-images.component.html',
  styleUrls: ['./product-detail-images.component.scss'],
  animations: [opacityAnimation, heightAnimation],
})
export class ProductDetailImagesComponent {
  
  @Input() images: ProductImageModel[] = [];
  thumbsSwiper: any;

  constructor() {}
}
