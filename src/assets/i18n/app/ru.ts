import { LocaleDataModel } from "@core/models/local/locale.model";

const app: LocaleDataModel = {
  change_lang: 'Выберите язык',
  lang: {
    kk: 'Қазақша',
    ru: 'Русский'
  },
  comment: {
    delete: {
      titla: 'Вы уверены, что хотите удалить комментарии?',
      false: 'Нет, оставить',
      true: 'Да, удалить'
    }
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
    empty: 'Данные не заполнены до конца'
  },
  about: {
    success_save_message: 'Данные успешно записаны',
    fail_save_message: 'Данные не заполнены до конца',
  }
};

export default app;