import { CategoryNameModel } from "./category.model";
import { SectionModel } from "./section.model";


export interface VideoModel {
  id: number,
  title: string,
  body: string,
  image: string,
  section: SectionModel,
  video: string,
  created_at: string,
  category: CategoryNameModel
}