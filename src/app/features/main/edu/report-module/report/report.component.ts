import { Component, ElementRef, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { heightAnimation } from '@core/animations/height-animation';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { ReportDetailModel } from '@core/models/api/report.model';
import { ReportsService } from '@core/services/reports.service';
import { AppState } from '@core/states/app/app.state';
import { AuthState } from '@core/states/auth/auth.state';
import { LangType } from '@core/types/lang.type';
import { Select } from '@ngxs/store';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { CommentListComponent } from 'src/app/shared/components/comment/list/comment-list.component';
import { LoginErrModalComponent } from 'src/app/shared/modals/noLogin-modal /login-modal.component';
import { LinkShareModalComponent } from 'src/app/shared/modals/share-modal/share-modal.component';

@Component({
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  animations: [opacityAnimation, heightAnimation],
  encapsulation: ViewEncapsulation.None
})
export class ReportComponent implements OnDestroy {

  @Select(AuthState.authorized) authorized$: Observable<boolean>;
  @Select(AppState.lang) lang$: Observable<LangType>;

  @ViewChild('body') body: ElementRef<any>
  @ViewChild('commentsHolder') commentsHolder: ElementRef;

  @ViewChild(CommentListComponent) comments: CommentListComponent;

  commentsCount: number

  reportId: number;
  report: ReportDetailModel;

  constructor(
    private activatedRoute: ActivatedRoute,
    private bsService: BsModalService,
    private meta: Meta,
    private title: Title,
    private reportService: ReportsService,
    private router: Router
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.ngOnDestroy()
    })
    this.activatedRoute.params.subscribe(({ id }) => {
      this.reportId = +id
      this.reportService.get(id).subscribe(
        report => {
          this.report = report
          this.commentsCount = report.comments_count
          this.lang$.subscribe(lang => {
            this.title.setTitle(lang === 'ru' ? report.title_ru : report.title_kk)
            this.meta.updateTag({ name: 'keywords', content: report.tags.join(", ") })
            this.meta.updateTag({ name: 'description', content: lang === 'ru' ? report.preview_text_ru : report.preview_text_kk })
            this.meta.updateTag({ property: 'og:description', content: lang === 'ru' ? report.preview_text_ru : report.preview_text_kk })
            this.meta.updateTag({ property: 'twitter:description', content: lang === 'ru' ? report.preview_text_ru : report.preview_text_kk })
            this.meta.updateTag({ name: 'robots', content: 'index, follow' })
            this.meta.updateTag({ name: 'author', content: report.author.email })
            this.meta.updateTag({ name: 'brand', content: 'Garyshker' })
            this.meta.updateTag({ property: "og:url", content: location.href })
            this.meta.updateTag({ property: 'og:type', content: 'website' })
            this.meta.updateTag({ name: 'twitter:title', content: lang === 'ru' ? report.title_ru : report.title_kk })
            this.meta.updateTag({ property: 'og:title', content: lang === 'ru' ? report.title_ru : report.title_kk })
            this.meta.updateTag({ property: 'og:image', content: report.image })
            this.meta.updateTag({ name: 'twitter:image', content: report.image })
          })
        },
        () => { },
        () => {
          window.scrollTo(0, 0)
        }
      )
    })
  }

  ngOnDestroy(): void {
    this.report = null
  }

  likeReport(id: number) {
    this.authorized$.pipe(take(1)).subscribe(authorized => {
      if (authorized) {
        this.reportService.like(id).toPromise().then(ans => {
          this.report.liked = ans.liked
          if (this.report.liked) {
            this.report.likes_count += 1
          } else {
            this.report.likes_count -= 1
          }
        })
      } else {
        this.bsService.show(LoginErrModalComponent, { class: 'modal-dialog-centered' })
      }
    })
  }

  onSave(id: number) {
    this.authorized$.pipe(take(1)).subscribe(authorized => {
      if (authorized) {
        this.reportService.save(id).toPromise().then(ans => {
          this.report.bookmarked = ans.bookmarked
          if (this.report.bookmarked) {
            this.report.bookmarks_count += 1
          } else {
            this.report.bookmarks_count -= 1
          }
        })
      } else {
        this.bsService.show(LoginErrModalComponent, { class: 'modal-dialog-centered' })
      }
    })
  }

  scrollToComments() {
    window.scrollTo(0, this.commentsHolder.nativeElement.offsetTop - 120)
  }

  onNewComment(type: 'increase' | 'decrease') {
    if (type === 'increase') {
      this.commentsCount++;
    }
    if (type === 'decrease') {
      this.commentsCount--;
    }
  }

  onShare() {
    this.bsService.show(LinkShareModalComponent, { class: 'modal-dialog-centered' })
  }
}
