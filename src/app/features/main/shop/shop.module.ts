import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'src/app/shared/components/card/card.module';
import { NgxsModule } from '@ngxs/store';
import { DatePipeModule } from 'src/app/shared/pipes/date/date-pipe.module';
import { SanitizerPipeModule } from 'src/app/shared/pipes/sanitizer/sanitizer-pipe.module';
import { CommentModule } from 'src/app/shared/components/comment/comment.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SwiperModule } from "swiper/angular";
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TranslateModule } from '@ngx-translate/core';
import { LangPipeModule } from 'src/app/shared/pipes/lang/lang-pipe.module';
import { RatingsService } from '@core/services/rating.service';
import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './list/shop-list.component';
import { ComponentHeaderModule } from 'src/app/shared/components/component-header/component-header.module';
import { ShopProductComponent } from './list/own-product-list/product-list.component';
import { ShopOrganizationRequestComponent } from './list/organization-request/organization-request.component';
import { InputModule } from 'src/app/shared/components/input/input.module';
import { ProductDetailModalComponent } from './detail/product-detail-modal.component';
import { ProductDetailImagesComponent } from './detail/images/product-detail-images.component';
import { CardModalComponent } from './card/card-modal.component';
import { ShopState } from './shop.state';
import { LoaderModule } from 'src/app/shared/components/loader/loader.module';
import { CarouselModule } from 'src/app/shared/components/swiper/swiper.module';

@NgModule({
  declarations: [
    ShopComponent,
    ShopProductComponent,
    ProductDetailModalComponent,
    ProductDetailImagesComponent,
    ShopOrganizationRequestComponent,
    CardModalComponent
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    CardModule,
    CommentModule,
    FormsModule,
    SwiperModule,
    InfiniteScrollModule,
    LangPipeModule,
    ReactiveFormsModule,
    TranslateModule,
    CarouselModule,
    ComponentHeaderModule,
    LoaderModule,
    DatePipeModule,
    InputModule,
    SanitizerPipeModule
  ],
  providers: [
    RatingsService.getProvider('courses')
  ]
})
export class ShopModule {
}
