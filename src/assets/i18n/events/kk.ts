import { LocaleDataModel } from "@core/models/local/locale.model";

const events: LocaleDataModel = {
  main_header: 'Іс шаралар',
  main_description: 'Бірегей өзара байланыстарды, тәжірибе мен білім алу мүмкіндіктері офлайн және онлайн іс-шараларда жинақталған. Әр адам іс-шараға ыңғайлы форматта жазылып, келе алады. Сонымен қатар іс шарадан кейін жазбаны қарап, ақпараттты есіне жиып ала алады.',
  types: {
    future: 'Алдағы',
    past: 'Өткен',
    all: 'Бәрі',
    my: 'Мои'
  },
  register: {
    count: 'Тіркелді: {{count}}',
    count_limit: 'Тіркелді: {{count}}/{{max_users}}',
    completed: 'Аяқталды',
    more: 'Толығырақ',
    canceled: 'Болмайды',
    submit: 'Тіркелу',
    cancel: 'Бас тарту',
    apply: {
      success: "Сіз іс шараға тіркелдеңіз",
      error: "Қате",
      email: "Email",
      email_placeholder: "Email",
      name: "Аты жөніңіз",
      name_placeholder: "Аты жөніңіз",
      phone: "Телефон номеріңіз",
      phone_placeholder: "телефон",
      post: 'Тіркелу'
    }
  },
  months: {
    _1: 'Қаңтар',
    _2: 'Ақпан',
    _3: 'Наурыз',
    _4: 'Сәуір',
    _5: 'Мамыр',
    _6: 'Маусым',
    _7: 'Шілде',
    _8: 'Тамыз',
    _9: 'Қыркүйек',
    _10: 'Қазан',
    _11: 'Қараша',
    _12: 'Желтоқсан',
  },
  empty_list: 'Тізім бос',
  user_bookmarked: 'Сіз іс шараға тіркелдеңіз',
  user_removed: 'Сіз іс шарадан бас тарттыңыз',
};

export default events;
