import { LocaleModel } from "@core/models/local/locale.model";
import main_screen from "./main_screen/ru";
import sections from "./sections/ru";
import events from "./events/ru";
import video from "./video/ru";
import header from "./header/ru";
import report from "./report/ru";
import footer from "./footer/ru";
import course from "./courses/ru";
import support from "./support/ru";
import about from "./about/ru";
import projects from "./projects/ru";
import auth from "./auth/ru";
import app from "./app/ru";
import nko from "./nko/ru";
import shop from "./shop/ru";

const localeRu: LocaleModel = {
  lang: 'ru',
  data: {
    header,
    sections,
    main_screen,
    events,
    video,
    report,
    course,
    footer,
    support,
    about,
    projects,
    auth,
    app,
    nko,
    shop
  }
};

export default localeRu;
