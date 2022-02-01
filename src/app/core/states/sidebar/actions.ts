export class ListCategories {
  static readonly type = '[Sidebar] ListCategories';
}

export class FilterByCategory{
  static readonly type = '[Sidebar] FilterByCategory';
  constructor(public id: number | null){}
}

export class FilterByDobro{
  static readonly type = '[Sidebar] FilterByDobro';
  constructor(public id: number | null){}
}