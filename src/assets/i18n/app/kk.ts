import { LocaleDataModel } from "@core/models/local/locale.model";

const app: LocaleDataModel = {
  change_lang: 'Тілді таңдаңыз',
  lang: {
    kk: 'Қазақша',
    ru: 'Русский'
  },
  comment: {
    reply: 'жауап беру',
    delete_comment: 'жою',
    change: 'өзгерту',
    hint: 'Пікіріңізді жазыңыз',
    show: '{{count}} жауап көрсету',
    hide: '{{count}} жауап көрсету',
    delete: {
      title: 'Комментарииді шынымен жойғыңыз келе ме?',
      false: 'Жоқ',
      true: 'Иә, жою'
    }
  },
  link: {
    redirect: {
      title: 'Сілтемені орындағыңыз келетініне сенімдісіз бе?',
      false: 'Жоқ',
      true: 'Иә'
    }
  },
  err: {
    login: {
      header: 'Сіз өзіңіздің есептік жазбаңызға кірген жоқсыз ба?',
      register: 'Тіркелу',
      login: 'Кіру'
    },
    no_res: 'Нәтиже жоқ',
    empty: 'Деректер толық емес'
  },
  about: {
    success_save_message: 'Деректер сәтті жазылды',
    fail_save_message: 'Деректер толық емес',
  },
  change_language: 'Тілді өзгерту',
  registration: 'Регистрация',
  login: 'Кіру',
  profile_name: 'Профиль',
  profile_menu: 'Профиль мәзірі',
  profile: {
    name: 'Жеке кабинет',
    bookmarks: 'Бетбелгілер',
    settings: 'Баптаулар',
    logout: 'Шығу',
    reading: 'Оқып жатырмын',
    watching: 'Көріп жатырмын'
  },
};

export default app;
