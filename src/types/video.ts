export interface Video {
  id: string;
  src: string | undefined;
}

export interface VideoInfo extends Video {
  currentWatchTime: number;
}

export interface VideosHistory {
  items: VideoInfo[];
  updateTime: number;
}
