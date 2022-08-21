import { LocaleDataModel } from "@core/models/local/locale.model";

const app: LocaleDataModel = {
  change_lang: 'Выберите язык',
  lang: {
    kk: 'Қазақша',
    ru: 'Русский'
  },
  comment: {
    reply: 'ответить',
    delete_comment: 'удалить',
    change: 'редактировать',
    send_changed: "Изменить",
    send: "Отправить",
    hint: 'Напишите комментарии',
    show: 'Показать',
    hide: 'Скрыть',
    delete: {
      title: 'Вы уверены, что хотите удалить комментарии?',
      false: 'Нет, оставить',
      true: 'Да, удалить'
    },
    comment_req: "напишите первый комментарий",
    load_more: "загрузить больше",
  },
  link: {
    redirect: {
      title: 'Вы уверены, что хотите перейти по ссылке?',
      false: 'Нет',
      true: 'Да, перейти'
    }
  },
  err: {
    login: {
      header: 'Вы не зашли в свой аккаунт?',
      register: 'Регистрация',
      login: 'Войти'
    },
    no_res: 'Нету результата',
    empty: 'Данные не заполнены до конца'
  },
  about: {
    success_save_message: 'Данные успешно записаны',
    fail_save_message: 'Данные не заполнены до конца',
  },
  change_language: 'Изменить язык',
  registration: 'Регистрация',
  login: 'Войти',
  profile_name: 'Профиль',
  profile_menu: 'Меню профиля',
  profile: {
    name: 'Личный кабинет',
    bookmarks: 'Закладки',
    settings: 'Настройки',
    logout: 'Выйти',
    reading: 'Читаю',
    watching: 'Смотрю'
  },
};

export default app;