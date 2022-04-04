import { LocaleModel } from "@core/models/local/locale.model";
import main_screen from "./main_screen/kk";
import events from "./events/kk";
import sections from "./sections/kk";
import video from "./video/kk";
import header from "./header/kk";
import report from "./report/kk";
import footer from "./footer/kk";

const localeKk: LocaleModel = {
  lang: 'kk',
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

export default localeKk;
