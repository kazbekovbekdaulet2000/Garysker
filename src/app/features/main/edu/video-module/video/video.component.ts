import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ListResponseModel } from '@core/models/api/list.model';
import { VideoDetailModel, VideoModel } from '@core/models/api/video.model';
import { AppState } from '@core/states/app/app.state';
import { ClearComments, ListComments } from '@core/states/comments/comments.actions';
import { LangType } from '@core/types/lang.type';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ClearRelatedVideoList, ClearVideoDetail, GetVideo, ListRelatedVideos } from '../video.actions';
import { VideoState } from '../video.state';

@Component({
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnDestroy {

  @Select(VideoState.video) video$!: Observable<VideoDetailModel>
  @Select(VideoState.related_videos) videos$!: Observable<ListResponseModel<VideoModel>>
  @Select(AppState.lang) lang$!: Observable<LangType>

  @ViewChild('plyr') plyr!: ElementRef;
  videoId: number = NaN;
  showTitle: boolean = window.innerWidth > 1000 ? false : true;

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private meta: Meta,
    private title: Title,
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.ngOnDestroy()
    })
    this.video$.subscribe(data => {
      if (data) {
        window.scrollTo(0, 0)
      }
    })
    this.activatedRoute.params.subscribe(({ id }) => {
      this.videoId = id
      this.store.dispatch(new GetVideo(id))
      this.store.dispatch(new ListRelatedVideos(id, { page: 1 }))
      this.store.dispatch(new ListComments('videos', id))
    })

    this.lang$.subscribe(lang => {
      this.store.select(VideoState.video).pipe(filter(obj => !!obj)).subscribe(video => {
        this.title.setTitle(lang === 'ru' ? video!.title_ru : video!.title_kk)
        this.meta.updateTag({ name: 'keywords', content: video!.tags.join(", ") })
        this.meta.updateTag({ name: 'description', content: lang === 'ru' ? video!.body_ru : video!.body_kk })
        this.meta.updateTag({ property: 'og:description', content: lang === 'ru' ? video!.body_ru : video!.body_kk })
        this.meta.updateTag({ property: 'twitter:description', content: lang === 'ru' ? video!.body_ru : video!.body_kk })
        this.meta.updateTag({ name: 'robots', content: 'index, follow' })
        this.meta.updateTag({ name: 'author', content: video!.author.email })
        this.meta.updateTag({ name: 'brand', content: 'Garyshker' })
        this.meta.updateTag({ property: "og:url", content: location.href })
        this.meta.updateTag({ property: 'og:type', content: 'website' })
        this.meta.updateTag({ name: 'twitter:title', content: lang === 'ru' ? video!.title_ru : video!.title_kk })
        this.meta.updateTag({ property: 'og:title', content: lang === 'ru' ? video!.title_ru : video!.title_kk })
        this.meta.updateTag({ property: 'og:image', content: video!.image })
        this.meta.updateTag({ name: 'twitter:image', content: video!.image })
      })
    })
  }

  ngOnDestroy(): void {
    this.store.dispatch([ClearVideoDetail, ClearRelatedVideoList, ClearComments])
  }

  navigateVideo(id: number) {
    this.router.navigate(['/edu/videos', id])
    this.ngOnDestroy()
  }

  loadVideo(next: string) {
    if (next) {
      const pageNumber = Number(next.split('page=')[1])
      this.store.dispatch(new ListRelatedVideos(this.videoId, { page: pageNumber }))
    }
  }
}
