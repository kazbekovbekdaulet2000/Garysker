export class ListCategories {
  static readonly type = '[Sidebar] ListCategories';
}

export class FilterByCategory{
  static readonly type = '[Sidebar] FilterByCategory';
  constructor(public id: number | null){}
}