import { LangType } from "@core/types/lang.type";

export class Init {
  static readonly type = '[App] Init';
}

export class UpdateLang{
  static readonly type = '[App] UpdateLang';
  constructor(public lang: LangType){}
}

export class ListCategories {
  static readonly type = '[App] ListCategories';
}