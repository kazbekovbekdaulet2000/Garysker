export interface CategoryList {
  categories: Array<CategoryNameModel>
}

export interface CategoryNameModel {
  name: string,
  icon?: string
}