import { LocaleDataModel } from "@core/models/local/locale.model";

const events: LocaleDataModel = {
  main_header: 'Ивенты',
  main_description: 'Возможности по получению уникальных взаимосвязей, опыта и знаний собраны в офлайн и онлайн мероприятиях. Каждый желающий может записаться и прийти на мероприятие в удобном формате, а также по окончанию просмотреть запись и освежить воспоминания.',
  types: {
    future: 'Предстоящие',
    past: 'Прошедшие',
    all: 'Все',
    my: 'Мои'
  },
  register: {
    count: 'Зарезервировано: {{count}}',
    count_limit: 'Зарезервировано: {{count}}/{{max_users}}',
    completed: 'Завершено',
    more: 'Посмотреть',
    canceled: 'Отменен',
    submit: 'Участвую',
    cancel: 'Отменить участие',
    apply: {
      success: "Вы зареганы на участие",
      error: "Ошибка",
      email: "Email",
      email_placeholder: "Email",
      name: "Ваше имя",
      name_placeholder: "имя",
      phone: "Телефон номера",
      phone_placeholder: "телефон номера",
      post: 'отправить'
    }
  },
  months: {
    _1: 'Январь',
    _2: 'Февраль',
    _3: 'Март',
    _4: 'Апрель',
    _5: 'Май',
    _6: 'Июнь',
    _7: 'Июль',
    _8: 'Август',
    _9: 'Сентябрь',
    _10: 'Октябрь',
    _11: 'Ноябрь',
    _12: 'Декабрь',
  },
  user_bookmarked: 'Вы зареганы на участие',
  user_removed: 'Вы отписались от участия'
};

export default events;
