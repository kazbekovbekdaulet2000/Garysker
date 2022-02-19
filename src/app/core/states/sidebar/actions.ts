export class ListCategories {
  static readonly type = '[Sidebar] ListCategories';
}

export class FilterByDobro{
  static readonly type = '[Sidebar] FilterByDobro';
  constructor(public id: number | null){}
}