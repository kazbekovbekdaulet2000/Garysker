import { LocaleDataModel } from "@core/models/local/locale.model";
import registration from "./registation/ru";

const auth: LocaleDataModel = {
  required: '*обязательно к заполнению',
  pass_non_equal: '*пароли не совпадают',
  login: {
    header: 'Авторизация',
    email: 'Почта',
    password: 'Пароль',
    err_400: '*Неправильный логин или пароль',
    submit: 'Войти',
    reset_pass: 'Забыли пароль?'
  },
  reset: {
    step_1: {
      header: 'Восстановление пароля',
      hint: 'Пожалуйста, укажите email, который вы использовали для входа на сайт',
      email: 'Почта',
      next: 'Далее',
      err_message: '',
    },
    step_2: {
      header: 'Изменение пароля',
      hint: 'Мы отправили вам электронное письмо с уникальным кодом. Пожалуйста введите код ниже',
      code: 'Введите код',
      pass: 'Новый пароль',
      pass_rep: 'Новый пароль (повторно)',
      new_code: 'отправить новый код',
      time: 'Время: {{time}}c',
      next: 'Далее'
    },
    errors: {
      not_found: {
        title: '',
        message: ''
      },
      expired: {
        title: 'УПССС!!',
        message: 'Прежнии код истек, мы отправили вам новый код на почту'
      },
      empty: {
        title: 'УПССС!!',
        message: 'Напишите код'
      },
      bad_req: {
        title: 'УПССС!!',
        message: 'Неправильный код'
      }
    },
    success: {
      title: 'УРА!!',
      message: 'Ваш пароль был успешно изменен'
    }
  },
  logout_modal: {
    title: 'Вы уверены, что хотите выйти?',
    false: 'Нет, остаться',
    true: 'Да, выйти'
  },
  message: {
    success: { 
      login: 'Вы успешно зарегистрировались', 
      reset_pass: 'Ваш пароль был успешно изменен'
    },
    err: {
      email: 'Email адрес уже существует',
      birth_date: 'Вы ввели некорректную дату рождения. Введите ее еще раз и попробуйте снова',
      policy: 'Надо принять условия использования сайта',
      empty_email: 'Email пустой',
      not_found: 'Не найдено',
      code: 'Напишите код',
      code_expire_force: 'Прежнии код истек, мы отправили вам новый код на почту',
      bad_code: 'Неправильный код'
    }
  },
  registration
};

export default auth;
