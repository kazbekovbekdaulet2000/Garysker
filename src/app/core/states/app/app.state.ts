import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import * as moment from 'moment';
import { Init, ListCategories, UpdateLang } from './app.actions';
import { TranslateService } from '@ngx-translate/core';
import localeKk from '@assets/i18n/kk';
import localeRu from '@assets/i18n/ru';
import { LangType } from '@core/types/lang.type';
import { CategoryModel } from '@core/models/api/category.model';
import { CategoriesService } from '@core/services/categories.service';

interface AppStateModel {
  lang: LangType;
  categories: CategoryModel[] | [];
}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    lang: 'ru',
    categories: []
  }
})
@Injectable()
export class AppState {

  @Selector()
  static lang({ lang }: AppStateModel): LangType {
    return lang;
  }

  @Selector()
  static categories({ categories }: AppStateModel): CategoryModel[] | [] {
    return categories;
  }

  constructor(
    private translateService: TranslateService,
    private categoryService: CategoriesService
  ) { }

  @Action(Init)
  Init({ patchState, getState }: StateContext<AppStateModel>) {
    let lang = getState().lang;
    if (!lang) {
      lang = 'ru';
    }

    patchState({ lang });
    moment.locale(lang);

    this.translateService.addLangs(['kk', 'ru']);
    this.translateService.setDefaultLang(lang);
    this.translateService.use(lang);

    [localeKk, localeRu].forEach(({ lang, data }) => {
      this.translateService.setTranslation(lang, data, true);
    });
  }

  @Action(UpdateLang)
  UpdateLang({ patchState, getState }: StateContext<AppStateModel>, { lang }: UpdateLang) {
    if (lang !== getState().lang) {
      moment.locale(lang);
      patchState({ lang });
      this.translateService.use(lang);
    }
  }

  @Action(ListCategories)
  ListCategories({ getState, patchState }: StateContext<AppStateModel>) {
    this.categoryService.list()
      .toPromise()
      .then(categories => {
        patchState({ categories });
      })
  }
}
