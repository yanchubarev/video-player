import { Store } from "vuex";
import { RootState } from "@/store";
import { UserService } from "@/services/UserService";
import { User } from "@/types/user";
import { VideoService } from "@/services/VideoService";
import { VideosHistory } from "@/types/video";
import router from "@/router";

const UPDATE_INTERVAL_TIME = 10000;

export const appStatePlugin = (): ((store: Store<RootState>) => void) => {
  const userService = new UserService();
  const videoService = new VideoService();
  return async (store: Store<RootState>) => {
    const setInitialUser = (): User => {
      return {
        id: "123",
        isLoggedIn: false,
      };
    };
    const setInitialVideoHistory = (): VideosHistory => {
      return {
        items: [],
        updateTime: 0,
      };
    };

    const loadUserInfo = async () => {
      try {
        let userInfo = await userService.getUserInfo();
        if (!userInfo) {
          userInfo = setInitialUser();
          await userService.setUserInfo(userInfo);
        }
        await store.dispatch("setUserInfo", userInfo);
        let videoHistory = videoService.getVideosHistory(userInfo.isLoggedIn);
        if (!videoHistory) {
          videoHistory = setInitialVideoHistory();
          await videoService.setVideosHistory(
            userInfo.isLoggedIn,
            videoHistory
          );
        }
        await store.dispatch("setVideoItems", videoHistory);
      } catch (error) {
        console.log(error);
      }
    };

    await loadUserInfo();

    const saveInterval = setInterval(async () => {
      const userInfo = userService.getUserInfo();
      await store.dispatch("saveVideoItems", userInfo.isLoggedIn);
    }, UPDATE_INTERVAL_TIME);

    store.subscribe(async (payload: any, store: any) => {
      const { type } = payload;
      if (type === "USER_LOG_IN") {
        await loadUserInfo();
      }

      if (type === "USER_LOG_OUT") {
        await loadUserInfo();
      }
    });
  };
};
