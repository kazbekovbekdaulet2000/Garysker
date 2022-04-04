import { LocaleModel } from "@core/models/local/locale.model";
import main_screen from "./main_screen/ru";
import sections from "./sections/ru";
import events from "./events/ru";
import video from "./video/ru";
import header from "./header/ru";
import report from "./report/ru";
import footer from "./footer/ru";

const localeRu: LocaleModel = {
  lang: 'ru',
  data: {
    header,
    sections,
    main_screen,
    events,
    video,
    report,
    footer
  }
};

export default localeRu;
