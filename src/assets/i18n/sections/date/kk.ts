import { LocaleDataModel } from "@core/models/local/locale.model";

const date: LocaleDataModel = {
  now: "қазір ғана",
  sec_1: 'секунд бұрын',
  sec_2_4: '{{time}} секунд бұрын',
  sec_5: '{{time}} секунд бұрын',
  min_1: 'бір минут бұрын',
  min_2_4: '{{time}} минут бұрын',
  min_5: '{{time}} минут бұрын',
  hour_1: 'бір сағат бұрын',
  hour_2_4: '{{time}} сағат бұрын',
  hour_5: '{{time}} сағат бұрын',
  day_1: 'бір күн бұрын',
  day_2_4: '{{time}} күн бұрын',
  day_5: '{{time}} күн бұрын',
  week_1: 'бір апта бұрын',
  week_2_4: '{{time}} апта бұрын',
  week_5: '{{time}} апта бұрын',
  month_1: 'бір ай бұрын',
  month_2_4: '{{time}} ай бұрын',
  month_5: '{{time}} ай бұрын',
  year_1: 'бір жыл бұрын',
  year_2_4: '{{time}} жыл бұрын',
  year_5: '{{time}} жыл бұрын',
  age: {
    year_1: "{{age}} жас",
    year_2_4: "{{age}} жас",
    year_5: "{{age}} жас"
  },
  read: {
    min_1: 'бір минут',
    min_2_4: '{{time}} минут',
    min_5: '{{time}} минут',
  }
};

export default date;