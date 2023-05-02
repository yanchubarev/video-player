import { VideosHistory } from "@/types/video";

export interface VideoStoreState {
  videoHistory: VideosHistory;
  previousUpdateTime: number;
}
