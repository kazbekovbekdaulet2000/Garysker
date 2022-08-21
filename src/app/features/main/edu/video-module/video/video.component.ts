import { Component, OnDestroy } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { VideoDetailModel } from '@core/models/api/video.model';
import { VideosService } from '@core/services/videos.service';
import { AppState } from '@core/states/app/app.state';
import { AuthState } from '@core/states/auth/auth.state';
import { LangType } from '@core/types/lang.type';
import { Select } from '@ngxs/store';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { LoginErrModalComponent } from 'src/app/shared/modals/noLogin-modal /login-modal.component';

@Component({
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnDestroy {

  video: VideoDetailModel;
  @Select(AppState.lang) lang$: Observable<LangType>
  @Select(AuthState.authorized) authorized$: Observable<boolean>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private meta: Meta,
    private title: Title,
    private videosService: VideosService,
    private bsService: BsModalService,
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.ngOnDestroy()
    })

    this.activatedRoute.params.subscribe(({ id }) => {
      this.videosService.get(id).subscribe(
        video => {
          this.video = video
          this.lang$.subscribe(lang => {
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
        },
        () => { },
        () => {
          window.scrollTo(0, 0)
        })
    })
  }

  ngOnDestroy(): void {
    this.video = null
  }

  onLike() {
    this.authorized$.pipe(take(1)).subscribe(authorized => {
      if (authorized) {
        this.videosService.like(this.video.id).toPromise().then(ans => {
          this.video.liked = ans.liked
          if (this.video.liked) {
            this.video.likes_count += 1
          } else {
            this.video.likes_count -= 1
          }
        })
      } else {
        this.bsService.show(LoginErrModalComponent, { class: 'modal-dialog-centered' })
      }
    })
  }

  onSave() {
    this.authorized$.pipe(take(1)).subscribe(authorized => {
      if (authorized) {
        this.videosService.save(this.video.id).toPromise().then(ans => {
          this.video.bookmarked = ans.bookmarked
          if (this.video.bookmarked) {
            this.video.bookmarks_count += 1
          } else {
            this.video.bookmarks_count -= 1
          }
        })
      } else {
        this.bsService.show(LoginErrModalComponent, { class: 'modal-dialog-centered' })
      }
    })
  }
}
