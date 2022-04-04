import { LocaleDataModel } from "@core/models/local/locale.model";

const date: LocaleDataModel = {
  now: "только что",
  sec_1: 'секунду назад',
  sec_2_4: '{{time}} секунды назад',
  sec_5: '{{time}} секунд назад',
  min_1: 'минуту назад',
  min_2_4: '{{time}} минуты назад',
  min_5: '{{time}} минут назад',
  hour_1: 'час назад',
  hour_2_4: '{{time}} часа назад',
  hour_5: '{{time}} часов назад',
  day_1: 'день назад',
  day_2_4: '{{time}} дня назад',
  day_5: '{{time}} дней назад',
  week_1: 'неделю назад',
  week_2_4: '{{time}} недели назад',
  week_5: '{{time}} неделей назад',
  month_1: 'месяц назад',
  month_2_4: '{{time}} месяца назад',
  month_5: '{{time}} месяцев назад',
  year_1: 'год назад',
  year_2_4: '{{time}} года назад',
  year_5: '{{time}} лет назад',
  age: {
    year_1: "{{age}} год",
    year_2_4: "{{age}} года",
    year_5: "{{age}} года"
  },
  read: {
    min_1: 'минуту',
    min_2_4: '{{time}} минуты',
    min_5: '{{time}} минут',
  }
};

export default date;