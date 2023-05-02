import LocalStorage from "@/classes/LocalStorageClass";
import { VideosHistory } from "@/types/video";
import DBStorage from "@/classes/DBStorageClass";

export class VideoService {
  getVideosHistory(isLoggedUser: boolean): VideosHistory {
    try {
      if (!isLoggedUser) {
        return LocalStorage.getItem("videosHistory");
      }
      return DBStorage.getVideosInfo();
    } catch (error) {
      throw new Error();
    }
  }
  setVideosHistory(isLoggedUser: boolean, videosHistory: VideosHistory): void {
    try {
      if (!isLoggedUser) {
        return LocalStorage.setItem("videosHistory", videosHistory);
      }
      return DBStorage.setVideosInfo(videosHistory);
    } catch (error) {
      throw new Error();
    }
  }
}
