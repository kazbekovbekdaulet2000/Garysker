import { LocaleModel } from "@core/models/local/locale.model";
import main_screen from "./main_screen/kk";
import events from "./events/kk";
import sections from "./sections/kk";
import video from "./video/kk";
import header from "./header/kk";
import report from "./report/kk";
import footer from "./footer/kk";
import course from "./courses/kk";
import support from "./support/kk";
import about from "./about/kk";
import projects from "./projects/kk";
import auth from "./auth/kk";
import app from "./app/kk";
import nko from "./nko/kk";
import shop from "./shop/kk";
import overview from "./overview/kk";

const localeKk: LocaleModel = {
  lang: 'kk',
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
    shop,
    overview
  }
};

export default localeKk;
