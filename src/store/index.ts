import { createStore } from "vuex";
import { videoModule } from "@/store/modules/video";
import { VideoStoreState } from "@/store/modules/video/types";
import { UserStoreState } from "@/store/modules/user/types";
import { userModule } from "@/store/modules/user";
import { appStatePlugin } from "@/store/modules/plugins/appState";

export interface RootState {
  video: VideoStoreState;
  user: UserStoreState;
}

function getPlugins() {
  return [appStatePlugin()];
}

const store = createStore<RootState>({
  modules: {
    video: videoModule,
    user: userModule,
  },
  plugins: getPlugins(),
});

export default store;
