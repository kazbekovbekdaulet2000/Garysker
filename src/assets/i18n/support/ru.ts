import { LocaleDataModel } from "@core/models/local/locale.model";

const support: LocaleDataModel = {
  type_hint: 'Выберите вид поддержки',
  amount_hint: 'Выберите сумму (в тенге)',
  rules: 'Да, я готов щедро добавлять {{amount}} тенге каждый месяц, на транзакционные сборы, чтобы Garyshker мог сохранить 100% моего пожертвования.',
  type:{
    every_month: 'Ежемесячно',
    one_time: 'Единоразово'
  },
  another_amount: 'другое',
  main_text: {
    header: "Помогите нам делать больше",
    about: "We'll get right to the point: we're asking you to help support Khan Academy. We're a nonprofit that relies on support from people like you. If everyone reading this gives $12 monthly, Khan Academy can continue to thrive for years. Please help keep Khan Academy free, for anyone, anywhere forever."
  },
  input: {
    name: "Введите имя (обязательно)",
    name_placeholder: "Ваше имя...",
    email: "Введите email (обязательно)",
    email_placeholder: "Ваш email..."
  },
  enter: 'Поддержать',
  policy: 'Делая пожертвование, вы соглашаетесь с нашей <a href="">политикой конфиденциальности.</a>'
};

export default support;
