import { LocaleDataModel } from "@core/models/local/locale.model";
import teaser from './teaser/ru'
import lesson from './lesson/ru'


const course: LocaleDataModel = {
  progress: {
    lesson_ended: '{{number}}/{{count}} Завершено',
    rating_header: 'Отзывы',
    rating_show: 'смотреть все'
  },
  lesson_num: 'Урок {{number}}/{{count}}',
  description_tab: 'Описание',
  resources_tab: 'Материалы',
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
    to_profile: 'Пройденный курс уже ждет тебя в <a href="/profile">личном кабинете</a>, а пока можешь поделится своими впечетлениями ниже.',
    rating_text: 'На сколько баллов ты оцениваешь пройденный курс?',
    cancel: 'Пропустить',
    send: 'Завершить'
  },
  course_access_message: 'Поздравляю! Вы теперь можете смотреть курс',
  course_access: {
    back: 'Окей, хочу назад',
    forward: `LET'S GOOO`
  },
  teaser,
  lesson
};

export default course;
