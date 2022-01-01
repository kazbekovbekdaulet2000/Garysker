import { LangType } from "../../types/lang.type";

export interface LocaleDataModel {
  [key: string]: string | LocaleDataModel;
}

export interface LocaleModel {
  lang: LangType;
  data: LocaleDataModel;
}
