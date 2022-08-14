import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { EventModel } from '@core/models/api/event.model';
import { emptyListResponse, ListResponseModel } from '@core/models/api/list.model';
import { QuestionModel } from '@core/models/api/question.model';
import { EventService } from '@core/services/event.service';
import { ProjectsService } from '@core/services/projects.service';
import { SupportService } from '@core/services/support.service';
import { AuthState } from '@core/states/auth/auth.state';
import { Select } from '@ngxs/store';
import { BsModalService } from 'ngx-bootstrap/modal';
import { combineLatest, Observable } from 'rxjs';
import { OverviewAboutVideoModalComponent } from './about-video/about-video.component';

@Component({
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  animations: [opacityAnimation]
})
export class ProjectOverviewComponent implements AfterViewInit {

  @Select(AuthState.authorized) authorized$: Observable<boolean>
  @ViewChild('pages') pagesRef: ElementRef;
  @ViewChild('faqElement') faqElement: ElementRef
  @ViewChild('teamElement') teamElement: ElementRef

  questions: QuestionModel[] = [];
  events: ListResponseModel<EventModel> = emptyListResponse;
  project: any = null

  constructor(
    private bsModalService: BsModalService,
    private activatedRoute: ActivatedRoute,
    private supportService: SupportService,
    private eventService: EventService,
    private projectsService: ProjectsService
  ) { }

  ngAfterViewInit(): void {
    combineLatest([
      this.eventService.list(),
      this.supportService.listQuestions(),
      this.projectsService.get(1),
      this.activatedRoute.fragment
    ]).subscribe(([events, questions, project, fragment]) => {
      this.events = events
      this.questions = questions
      const donat = project.children.find(obj => obj.year === 2022).donat
      this.project = {
        name_ru: 'Сбор на РюкзакKIT',
        name_kk: 'Сбор на РюкзакKIT',
        desc_ru: 'Ежегодный благотворительный проект',
        desc_kk: 'Ежегодный благотворительный проект',
        purpose_ru: 'Сбор средств',
        purpose_kk: 'Сбор средств',
        amount: `${Math.round(donat.required)} ₸`,
        collected: `${Math.round(donat.collected)} ₸`,
        date_ru: 'до 1 августа',
        date_kk: 'до 1 августа',
        location_ru: 'Алматинская область',
        location_kk: 'Алматинская область',
      }

      switch (fragment) {
        case 'partners':
          this.scroll(this.teamElement.nativeElement.offsetTop)
          break;
        case 'questions':
          this.scroll(this.faqElement.nativeElement)
          break;
        default:
          break;
      }
    })
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  projects: any[] = [
    {
      title: 'overview.edu.title',
      desc: 'overview.edu.desc',
      route: 'edu'
    },
    {
      title: 'overview.shop.title',
      desc: 'overview.shop.desc',
      route: 'shop'
    },
    {
      title: 'overview.project.title',
      desc: 'overview.project.desc',
      route: 'projects'
    },
    {
      title: 'overview.event.title',
      desc: 'overview.event.desc',
      route: 'events'
    },
  ]

  courses: any[] = [
    {
      category: 'Ментальное здоровье',
      title: 'Арман Юсупов о ментальном здоровье',
      duriation: '9 мин.',
      color: '#EAFFBC',
      tag: '#Q&A',
      photo: 'assets/images/demo/course_1.png',
      background: 'linear-gradient(297.79deg, #9BCC33 -16.23%, rgba(155, 204, 51, 0) 100%);'
    },
    {
      category: 'Фин.грамотность',
      title: 'Стартапы в Казахстане: как создать и развивать',
      duriation: '46 мин.',
      color: '#BFBEFF',
      tag: '#Подкаст',
      photo: 'assets/images/demo/course_2.png',
      background: 'linear-gradient(297.79deg, #1B17CE -13.37%, rgba(27, 23, 206, 0) 100%);'
    }
  ]

  onAboutVideo() {
    this.bsModalService.show(OverviewAboutVideoModalComponent, { class: 'modal-dialog-centered modal-xl', ignoreBackdropClick: true })
  }
}