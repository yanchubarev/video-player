import { Commit, Dispatch } from "vuex";
import { VideoStoreState } from "@/store/modules/video/types";
import { VideoInfo, VideosHistory } from "@/types/video";
import { VideoService } from "@/services/VideoService";

export const videoModule = {
  state: (): VideoStoreState => ({
    videoHistory: {
      items: [],
      updateTime: 0,
    },
    previousUpdateTime: 0,
  }),
  mutations: {
    ADD_VIDEO_ITEM(state: VideoStoreState, videoItem: VideoInfo) {
      state.videoHistory.items.push(videoItem);
    },
    UPDATE_VIDEO_ITEM(
      state: VideoStoreState,
      payload: { index: number; videoItem: VideoInfo }
    ) {
      const { index, videoItem } = payload;
      state.videoHistory.items.splice(index, 1, {
        ...state.videoHistory.items[index],
        ...videoItem,
      });
    },
    SET_VIDEO_ITEMS(state: VideoStoreState, videoHistory: VideosHistory) {
      state.videoHistory = videoHistory;
    },
    SET_VIDEO_UPDATE_TIME(state: VideoStoreState, updateTime: number) {
      state.videoHistory.updateTime = updateTime;
    },
    SET_PREVIOUS_UPDATE_TIME(state: VideoStoreState, updateTime: number) {
      state.previousUpdateTime = updateTime;
    },
  },
  actions: {
    storeVideoInfo(
      { commit, state }: { commit: Commit; state: VideoStoreState },
      videoItem: VideoInfo
    ) {
      const existingVideoIndex = state.videoHistory.items.findIndex(
        (video) => video.id === videoItem.id
      );
      if (existingVideoIndex !== -1) {
        commit("UPDATE_VIDEO_ITEM", { index: existingVideoIndex, videoItem });
      } else {
        commit("ADD_VIDEO_ITEM", videoItem);
      }
      commit("SET_VIDEO_UPDATE_TIME", Date.now());
    },
    setVideoItems(
      { commit, state }: { commit: Commit; state: VideoStoreState },
      videoHistory: VideosHistory
    ) {
      commit("SET_VIDEO_ITEMS", videoHistory);
    },
    async saveVideoItems(
      {
        commit,
        dispatch,
        state,
      }: { commit: Commit; dispatch: Dispatch; state: VideoStoreState },
      isLoggedIn: boolean
    ) {
      if (state.previousUpdateTime >= state.videoHistory.updateTime) {
        return;
      }
      const videoService = new VideoService();
      videoService.setVideosHistory(isLoggedIn, state.videoHistory);
      commit("SET_PREVIOUS_UPDATE_TIME", Date.now());
    },
  },
  getters: {
    videos: (state: VideoStoreState) => state.videoHistory.items,
    getVideoInfoById: (state: VideoStoreState) => (id: string) => {
      if (state.videoHistory?.items?.length === 0) {
        return null;
      }
      return state.videoHistory.items.find((item: VideoInfo) => item.id === id);
    },
  },
};
