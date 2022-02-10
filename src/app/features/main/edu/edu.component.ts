import { AfterContentChecked, AfterContentInit, AfterViewInit, Component, ElementRef, OnChanges, OnDestroy, OnInit, QueryList, Renderer2, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store'
import { VideoModel } from '@core/models/api/video.model';
import { ReportModel } from '@core/models/api/report.model';
import { ListResponseModel } from '@core/models/api/list.model';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { heightAnimation } from '@core/animations/height-animation';
import { ReportState } from './report-module/report.state';
import { VideoState } from './video-module/video.state';
import { ListReports } from './report-module/report.actions';
import { ListVideos } from './video-module/video.actions';
import { MainState } from '../main.state';
import { ClearPopular } from '../main.actions';
import getImageDimenstion from '@core/utils/image-size';

@Component({
  templateUrl: './edu.component.html',
  styleUrls: ['./edu.component.scss'],
  animations: [opacityAnimation, heightAnimation]
})
export class EduComponent implements OnInit, OnDestroy, AfterContentChecked{

  @Select(ReportState.reports) reports$!: Observable<ListResponseModel<ReportModel>>;
  @Select(VideoState.videos) videos$!: Observable<ListResponseModel<VideoModel>>;
  @Select(MainState.popular) popular$!: Observable<any>;

  @ViewChildren('image') images!: QueryList<ElementRef>;
  @ViewChildren('imageHolder') imageHolder!: QueryList<ElementRef>;

  constructor(
    private store: Store,
    private router: Router,
    private renderer: Renderer2
  ) {
    this.store.dispatch([ListReports, ListVideos])
  }
  
  ngOnInit(): void {
    this.changeWidth()
  }
  
  ngAfterContentChecked(): void {
    this.changeWidth()
  }

  ngOnDestroy(): void {
    this.store.dispatch(ClearPopular)
  }

  changeWidth() {
    // if (this.imageHolder) {
    //   this.imageHolder.forEach((item, indx) => {
    //     const ratio = this.images.get(indx)?.nativeElement?.naturalWidth / this.images.get(indx)?.nativeElement?.naturalHeight

    //     let width = 240
    //     width = ratio * 230
    //     if (ratio * 230 > 420) {
    //       width = 365
    //     } else if (ratio * 230 < 240) {
    //       width = 240
    //     }

    //     if (this.imageHolder.get(indx)?.nativeElement !== undefined) {
    //       this.renderer.setStyle(
    //         this.imageHolder.get(indx)?.nativeElement,
    //         'min-width',
    //         `${width}px`
    //       )
    //     }
    //   })
    // }
  }

  onNavigate(item: any) {
    if (item?.read_time) {
      this.router.navigate(['edu/reports', item?.id])
    } else {
      this.router.navigate(['edu/videos', item?.id])
    }
  }
}
