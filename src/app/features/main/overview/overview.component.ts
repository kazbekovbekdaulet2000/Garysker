import { Component, ViewEncapsulation } from '@angular/core';
import { opacityAnimation } from '@core/animations/opacity-animation';

@Component({
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  animations: [opacityAnimation],
  encapsulation: ViewEncapsulation.None
})
export class ProjectOverviewComponent {

  headerText = `Здесь мы <span style="color: var(--color-orange);">развиваемся</span> <br>и делимся пользой`

  projects: any[] = [
    {
      title: 'Образование',
      desc: 'Бесплатные видео-материалы и статьи на современные темы.'
    },
    {
      title: 'Магазин',
      desc: 'Маркетплейс с нашим мерчем и товарами партнеров.'
    },
    {
      title: 'Проекты',
      desc: 'Воплощаем идеи в реальность, делаем добро и дарим улыбки.'
    },
    {
      title: 'Ивенты',
      desc: 'Знания, знакомства и опыт — все на наших офлайн и онлайн ивентах.'
    }
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
    },
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
    },
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
    },
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
    },
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
    },
  ]
}