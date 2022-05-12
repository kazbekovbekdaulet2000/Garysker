import { LocaleDataModel } from "@core/models/local/locale.model";

const registration: LocaleDataModel = {
  header: 'Регистрация',
  info_1: 'Создайте аккаунт для получения полного доступа к функциям платформы.',
  info_2: 'При заполнение информации просьба внимательно ознакомиться с ценностями Garyshker.',
  step_text: "Шаг {{step}}/{{step_count}}", 
  next: 'Далее',
  prev: 'Вернутся назад',
  apply: 'Принять',
  policy: 'Согласен с политикой обработки персональных данных',
  user_type: {
    school: 'Школьник',
    student: 'Студент',
    working: 'Работаю',
    other: 'Другое'
  },
  steps: {
    one: {
      name: 'О вас',
      small_text: 'пройти и зарегистрироваться',
      title: 'Давайте начнем со знакомства',
      label: 'Заполните форму ниже',
      config: {
        name_p: 'Введите имя',
        name_p_err: 'имя не заполнена',
        surname_p: 'Введите фамилию',
        surname_p_err: 'фамилия не заполнена',
        birth_date_p: 'дд/мм/гггг',
        birth_date_p_err: 'неправильный формат',
        birth_date_p_helper: 'Дата рождения'
      }
    },
    two: {
      name: 'Деятельность',
      small_text: 'пройти и зарегистрироваться',
      title: 'Расскажите откуда вы и чем занимаетесь?',
      label: 'Заполните форму ниже',
      config: {
        country_p: 'Введите страну',
        country_p_err: 'Введите страну',
        city_p: 'Введите город',
        city_p_err: 'Введите город',
        user_type_p: 'Чем вы занимаетесь?',
        user_type_p_err: 'выберите чем вы занимаетесь',
        edu_p: 'Учебное заведение',
        edu_p_err: 'Учебное заведение',
      }
    },
    three: {
      name: 'Ценности проекта',
      small_text: 'пройти и зарегистрироваться',
      title: 'Наши ценности',
      label: 'Нажимая кнопку “принять”, вы соглашаетесь и разделяете наши ценности',
      config: {
        name_1: 'Люди',
        desc_1: 'для нас важны люди, а не продукт',
        name_2: 'Саморазвитие',
        desc_2: 'хочу предложить полезный продукт/компанию',
        name_3: 'Честность',
        desc_3: 'хочу общаться с близкими по духу людьми',
      }
    },
    four: {
      name: 'Данные для входа',
      small_text: 'пройти и зарегистрироваться',
      title: "Данные для входа",
      label: "внимательно заполните формы ниже для завершения регистрации",
      config: {
        email_p: 'Введите электронную почту',
        email_p_err: 'напишите в правильном формате',
        password_p: 'Придумайте пароль',
        password_p_err: 'надо ввести больше 8 знаков для пароля',
        re_password_p: 'Повторно введите пароль',
        re_password_p_err: 'пароли не совпадают',
      }
    }
  }
};

export default registration;
