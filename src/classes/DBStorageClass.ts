import Data from "@/assets/localDB/db.json";
import { VideosHistory } from "@/types/video";

export default class DBStorage {
  static setVideosInfo(videosHistory: VideosHistory): void {
    //Fetch to api
  }

  static getVideosInfo(): VideosHistory {
    //Fetch to api
    return Data;
  }
}
