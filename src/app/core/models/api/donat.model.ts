export interface DonationModel {
  id: number;
  collected: number;
  default_options: number[];
  description_kk: string;
  description_ru: string;
  required: number;
  title_kk: string;
  title_ru: string;
  on_process: boolean;
}