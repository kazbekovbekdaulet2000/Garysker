import { CategoryNameModel } from "./category.model";

export interface ReportModel {
  id: number,
  title: string,
  debt_report_image: ImageModel[],
  created_at: string,
  category: CategoryNameModel,
  author: string,
  count: number
}


export interface ImageModel {
  image: string
}