import { NameModel } from "../name.model";

export interface OrganizationModel extends NameModel {
  id: number
  icon: string
}