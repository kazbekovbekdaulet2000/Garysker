import { LocaleDataModel } from "@core/models/local/locale.model";

const course: LocaleDataModel = {
  time: {
    min_1: 'минуту',
    min_2_4: '{{time}} минуты',
    min_5: '{{time}} минут',
    hour_1: 'час',
    hour_2_4: '{{time}} часа',
    hour_5: '{{time}} часов',
    day_1: 'день',
    day_2_4: '{{time}} дня',
    day_5: '{{time}} дней',
    week_1: 'неделю',
    week_2_4: '{{time}} недели',
    week_5: '{{time}} неделей',
    month_1: 'месяц',
    month_2_4: '{{time}} месяца',
    month_5: '{{time}} месяцев',
    year_1: 'год',
    year_2_4: '{{time}} года',
    year_5: '{{time}} лет',
  },
  lesson: {
    cnt_1: "{{count}} урок",
    cnt_2_4: "{{count}} урока",
    cnt_5: "{{count}} уроков",
    access_message: 'След урок теперь доступен',
    access_ans:'хорошо'
  },
  progress: {
    lesson_ended: '{{number}}/{{count}} Завершено',
    rating_header: 'Отзывы',
    rating_show: 'смотреть все'
  },
  lesson_num: 'Урок {{number}}/{{count}}',
  description_header: 'Описание',
  resources_header: 'Материалы',
  lectors: 'Лекторы:',
  lector_header: 'О лекторе',
  pass_test: 'Сдать тест и перейти далее',
  pass: 'Перейти далее',
  finish_course: 'Закончить курс',
  open_resourse: 'Перейти',
  rating_header: 'Оценка курса',
  rating: {
    good: 'хорошо',
    excellent: 'отлично',
    bad: 'не очень',
    no_rating: 'нету оценок'
  },
  test: {
    unavailable: 'Тест пока не доступен',
    user_point_message: 'Ваш балл',
    user_point_fail_message: 'Вы не набрали больше 70 процентов',
    no_question_answers: 'Надо ответить на все вопросы',
    results_destroyed: 'Результаты были онулированы',
    user_res: 'Ваш результат - {{percentage}}',
    title: 'Оценка усвоения пройденного материала',
    warning: 'для успешной сдачи нужно ответить минимум на 70% вопросов правильно',
    reset: 'Повторить попытку',
    next: 'Далее',
    finish: 'Завершить'
  },
  finish: {
    finished: 'Вы закончили этот курс',
    congrats: 'Поздравляем с успешным окончанием курса!',
    rating_text: 'На сколько баллов ты оцениваешь пройденный курс?',
  },
  course_access_message: 'Поздравляю! Вы теперь можете смотреть курс',
  course_access: {
    back: 'Окей, хочу назад',
    forward: `LET'S GOOO`
  },
};

export default course;
