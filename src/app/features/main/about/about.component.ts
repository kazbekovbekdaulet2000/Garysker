import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { PlyrComponent } from 'ngx-plyr';
import { videoI18n } from 'src/app/shared/components/videoplayer/videoplayer.i18n';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [opacityAnimation]
})
export class AboutComponent {

  selectedSection: "us" | "partners" | "contacts" = "us"

  sections: any = [
    { fragment: 'us', name: 'О проекте' },
    { fragment: 'partners', name: 'Партнеры' },
    { fragment: 'contacts', name: 'Контакты' }
  ];

  routers: any = [
    { name: 'Образование', body: 'Направление, открывающее возможность бесплатно изучать, смотреть и читать материалы в свежем формате.', route: '/edu' },
    { name: 'Проекты', body: 'Направление, позволяющее воплощать идеи в реальность в виде цельных проектов. В коробке проектов уже есть ежегодный "Рюкзак Kit" в рамках благотворительного фонда. Платформа может быть полезна и для ваших проектов, которым необходимо увидеть свет и получить аудиторию. ', route: '/products' },
    { name: 'Магазин', body: 'Наш маркетплейс с официальным мерчем и товарами наших партнеров. Он построен на фундаменте геймификации. Это значит, за взаимодействие с платформой вы будете награждаться баллами. Просмотр и изучение материала в разделах "Изучать", "Смотреть" и "Читать" поможет копить баллы и приобретать вкусности в Магазине.', route: '/shop' },
    { name: 'Ивенты', body: 'Возможности по получению уникальных взаимосвязей, опыта и знаний собраны в офлайн и онлайн мероприятиях. Каждый желающий может записаться и прийти на мероприятие в удобном формате, а также по окончанию просмотреть запись и освежить воспоминания.', route: '/events' },
  ]

  people: any = [
    { img: 'assets/images/birzhan.png', name: 'Birzhan Shakarim', prop: 'Основатель проекта' },
    { img: 'assets/images/abdi.png', name: 'Abdi Rinat', prop: 'Технологии' },
    { img: 'assets/images/beks.png', name: 'Бекдаулет Казбеков', prop: 'Разработчик' },
    { img: 'assets/images/lui.png', name: 'Луи (кот)', prop: 'Наш талисман' },
  ]

  contacts: any = [
    { text: 'Если вы хотите позвонить', hint: 'tel:8-702-000-6369', prop: '8 702 000 6369' },
    { text: 'Если вы хотите написать', hint: 'mailto:info@garyshker.com', prop: 'info@garyshker.com' },
    { text: 'Если вы хотите принести пользу', hint: 'mailto:volunteer@garyshker.com', prop: 'volunteer@garyshker.com' },
    { text: 'Если вы хотите прийти и повеселиться', hint: 'https://go.2gis.com/gygevb', prop: 'г. Алматы пр. Достык 162к4'},
  ]

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activatedRoute.fragment.subscribe((fragment: any) => {
      if (fragment) {
        this.selectedSection = fragment
      }
    })
  }

  changeFragment(fragment: string) {
    this.router.navigate(['/about'], { fragment })
  }
}
