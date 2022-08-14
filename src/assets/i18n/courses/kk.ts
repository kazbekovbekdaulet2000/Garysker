import { LocaleDataModel } from "@core/models/local/locale.model";
import teaser from './teaser/kk'
import lesson from './lesson/kk'

const course: LocaleDataModel = {
  teaser,
  lesson,
  time: {
    min_1: 'бір минут',
    min_2_4: '{{time}} минут',
    min_5: '{{time}} минут',
    hour_1: 'бір сағат',
    hour_2_4: '{{time}} сағат',
    hour_5: '{{time}} сағат',
    day_1: 'бір күн',
    day_2_4: '{{time}} күн',
    day_5: '{{time}} күн',
    week_1: 'бір апта',
    week_2_4: '{{time}} апта',
    week_5: '{{time}} апта',
    month_1: 'бір ай',
    month_2_4: '{{time}} ай',
    month_5: '{{time}} ай',
    year_1: 'бір жыл',
    year_2_4: '{{time}} жыл',
    year_5: '{{time}} жыл',
  },
  progress: {
    lesson_ended: '{{number}}/{{count}} аяқталды',
    rating_header: 'Пікірлер',
    rating_show: 'барлығын көру'
  },
  lesson_num: 'Сабақ {{number}}/{{count}}',
  description_tab: 'Сипаттама',
  resources_tab: 'Материалдар',
  lectors: 'Лекторлар:',
  lector_header: 'Лектор туралы',
  pass_test: 'Сынақтан өтіп, әрі қарай өту',
  pass: 'Келесі сабақ',
  finish_course: 'Закончить курс',
  open_resourse: 'Парақшаға ауысу',
  rating_header: 'Курс рейтингі',
  rating: {
    good: 'жақсы',
    excellent: 'тамаша',
    bad: 'онша емес',
    no_rating: 'рейтингтер жоқ'
  },
  test: {
    user_res: 'Сіздің нәтижеңіз - {{percentage}}',
    title: 'Өтілген материалды игеруді бағалау',
    warning: 'өту үшін сұрақтардың кем дегенде 70% дұрыс жауап беру керек.',
    reset: 'Қайталау',
    next: 'Келесі',
    finish: 'Аяқтау'
  },
  finish: {
    finished: 'Сіз бұл курсты аяқтадыңыз',
    congrats: 'Курсты сәтті аяқтауыңызбен құттықтаймыз!',
    rating_text: 'Сіз курсты қанша ұпаймен бағалайсыз?',
    cancel: 'Өткізу',
    send: 'Жіберу'
  },
  course_access_message: 'Құттықтаймыз! Енді сіз курсты көре аласыз',
  course_access: {
    back: 'Негізгі экранға',
    forward: `LET'S GOOO`
  }
};

export default course;
