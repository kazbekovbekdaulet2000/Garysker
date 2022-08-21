import { DescriptionModel, NameModel } from "../name.model"
import { DonationModel } from "./donat.model";
import { VideoTranscodeModel } from "./video/video-transcode.model"

export interface ProjectModel extends NameModel, DescriptionModel {
  id: number
  status: 'in_process' | 'on_pause' | 'finished'
}

export interface FileModel extends NameModel {
  file: string;
}

export interface ProjectPeriodModel extends ProjectModel {
  year: number;
  video: VideoTranscodeModel;
  resources: FileModel[];
  donat: DonationModel;
}

export interface ProjectDetailModel extends ProjectModel, DescriptionModel {
  id: number
  fullname: string
  icon: string
  role_kk: string
  role_ru: string
  children: ProjectPeriodModel[]
}