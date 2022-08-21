import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { fromEvent, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-overview-edu',
  templateUrl: './overview-edu.component.html',
  styleUrls: ['./overview-edu.component.scss'],
  animations: [opacityAnimation]
})
export class ProjectOverviewEduComponent {
  constructor(
    private router: Router
  ) { }

  courses: any[] = [
    {
      category: 1,
      title_ru: 'Arman Yussupov о ментальном здоровье',
      title_kk: 'Arman Yussupov психикалық денсаулық туралы',
      duriation: '9 мин.',
      color: '#EAFFBC',
      tag: '#Q&A',
      route: '/edu/videos/20',
      photo: 'assets/images/demo/course_1.png',
      background: 'linear-gradient(297.79deg, #9BCC33 -16.23%, rgba(155, 204, 51, 0) 100%);'
    },
    {
      category: 3,
      title_ru: 'Стартапы в Казахстане: как создать и развивать',
      title_kk: 'Қазақстандағы стартаптар: қалай құруға және дамытуға болады',
      duriation: '46 мин.',
      color: '#BFBEFF',
      tag: '#Подкаст',
      route: '/edu/videos/8',
      photo: 'assets/images/demo/course_2.png',
      background: 'linear-gradient(297.79deg, #1B17CE -13.37%, rgba(27, 23, 206, 0) 100%);'
    }
  ]

  navigate(route: string) {
    this.router.navigate([route])
  }

  get cellCount(): number {
    switch (true) {
      case window.innerWidth > 1440:
        return 3
      case window.innerWidth > 960:
        return 2
      default:
        return 1
    }
  }
}