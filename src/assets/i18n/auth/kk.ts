import { LocaleDataModel } from "@core/models/local/locale.model";
import registration from "./registation/kk";

const auth: LocaleDataModel = {
  required: '*міндетті түрде толтыру кажет',
  pass_non_equal: '*құпиясөздер сәйкес келмейді',
  login: {
    header: 'Кіру',
    email: 'Пошта',
    password: 'Құпиясөз',
    err_400: '*қате логин немесе құпиясөз',
    submit: 'Кіру',
    reset_pass: 'Құпиясөзді ұмыттыңыз ба?'
  },
  reset: {
    step_1: {
      header: 'Құпиясөзді қалпына келтіру',
      hint: 'Сайтқа кіру үшін пайдаланған email-ді теріңіз',
      email: 'Пошта',
      next: 'Алға',
      err_message: '',
    },
    step_2: {
      header: 'Құпиясөзді өзгерту',
      hint: 'Біз сізге бірегей коды бар электрондық хат жібердік. Төменірек кодты енгізіңіз',
      code: 'Код',
      pass: 'Жаңа құпиясөз',
      pass_rep: 'Жаңа құпиясөз (қайта)',
      new_code: 'отправить новый код',
      time: 'Уақыт: {{time}}c',
      next: 'Алға'
    },
    errors: {
      not_found: {
        title: '',
        message: ''
      },
      expired: {
        title: 'УПССС!!',
        message: 'Ескі кодтың мерзімі аяқталды, біз сізге электрондық пошта арқылы жаңа код жібердік'
      },
      empty: {
        title: 'УПССС!!',
        message: 'Код жазыңыз'
      },
      bad_req: {
        title: 'УПССС!!',
        message: 'Қате код'
      }
    },
    success: {
      title: 'УРА!!',
      message: 'Құпия сөзіңіз сәтті өзгертілді'
    }
  },
  logout_modal: {
    title: 'Шығыңыз келетініне сенімдісіз бе?',
    false: 'Жоқ',
    true: 'Иә, шығу'
  },
  message: {
    success: { 
      login: 'Сіз сәтті тіркелдіңіз', 
      reset_pass: 'Құпия сөзіңіз сәтті өзгертілді'
    },
    err: {
      email: 'Электрондық пошта мекенжайы бос емес',
      birth_date: 'Сіз дұрыс емес туған күнді енгіздіңіз. Оны қайтадан енгізіп, қайталап көріңіз',
      policy: 'Сіз сайттың пайдалану шарттарын қабылдауыңыз керек',
      empty_email: 'Электрондық пошта бос',
      not_found: 'табылмады',
      code: 'Код жазыңыз',
      code_expire_force: 'Ескі кодтың мерзімі аяқталды, біз сізге электрондық пошта арқылы жаңа код жібердік',
      bad_code: 'Қате код'
    }
  },
  registration
};

export default auth;
