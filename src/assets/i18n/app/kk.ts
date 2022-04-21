import { LocaleDataModel } from "@core/models/local/locale.model";

const app: LocaleDataModel = {
  change_lang: 'Тілді таңдаңыз',
  lang: {
    kk: 'Қазақша',
    ru: 'Русский'
  },
  comment: {
    delete: {
      titla: 'Комментарииді шынымен жойғыңыз келе ме?',
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
    empty: 'Деректер толық емес'
  },
  about: {
    success_save_message: 'Деректер сәтті жазылды',
    fail_save_message: 'Деректер толық емес',
  }
};

export default app;
