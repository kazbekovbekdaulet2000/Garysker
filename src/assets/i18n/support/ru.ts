import { LocaleDataModel } from "@core/models/local/locale.model";

const support: LocaleDataModel = {
  type_hint: 'Выберите вид поддержки',
  amount_hint: 'Выберите сумму (в тенге)',
  rules: 'Да, я готов щедро добавлять {{amount}} тенге, на транзакционные сборы, чтобы Garyshker мог сохранить 100% моего пожертвования.',
  type:{
    every_month: 'Ежемесячно',
    one_time: 'Единоразово'
  },
  another_amount: 'другое',
  main_text: {
    header: "Помогите нам делать больше",
    about: "Мы некоммерческий образовательный фонд, который надеется на поддержку таких людей как вы. Помогая проекту вы, даете возможность нам создавать больше и качественнее."
  },
  input: {
    summ: 'Введите сумму',
    summ_placeholder:'сумма...',
    name: "Введите имя (обязательно)",
    name_placeholder: "Ваше имя...",
    email: "Введите email (обязательно)",
    email_placeholder: "Ваш email..."
  },
  enter: 'Поддержать',
  policy: 'Делая пожертвование, вы соглашаетесь с нашей <a href="https://storage.yandexcloud.net/garysh-app/%D0%9F%D0%BE%D0%BB%D0%B8%D1%82%D0%B8%D0%BA%D0%B0%20%D0%BA%D0%BE%D0%BD%D1%84%D0%B8%D0%B4%D0%B5%D0%BD%D1%86%D0%B8%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D1%81%D1%82%D0%B8.docx">политикой конфиденциальности.</a>'
};

export default support;
