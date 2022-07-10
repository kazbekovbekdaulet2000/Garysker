export interface VideoTranscodeQualityModel {
  quality: number;
  url: string;
}

export interface VideoTranscodeModel {
  original_quality: number;
  qualities: VideoTranscodeQualityModel[];
  video: string
}
