<template>
  <div class="mt-5">
    <el-container>
      <el-header>
        <el-button type="primary" @click="handleLogOut">Log out </el-button>
      </el-header>
      <el-main>
        <div class="container">
          <h1>Page for logged in users</h1>
          <VideoPlayer
            :src="videoSrc"
            :id="videoId"
            :start-time="currentWatchTime"
            @triggerSaveProgress="handleSaveProgress"
          />
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import VideoPlayer from "@/components/videoPlayer/VideoPlayer.vue";
import timerVideo from "@/assets/video/timer.mp4";
import { useStore } from "vuex";
import router from "@/router";

export default defineComponent({
  components: {
    VideoPlayer,
  },
  setup() {
    const videoSrc: string = timerVideo;
    const store = useStore();
    const isUserLoggedIn = computed(() => store.getters.user.isLoggedIn);
    const videoId = "qwerty";

    const handleSaveProgress = async () => {
      await store.dispatch("saveVideoItems", isUserLoggedIn.value);
    };

    const handleLogOut = () => {
      store.dispatch("logOutUser");
      router.push("/");
    };

    const currentVideoInfo = computed(() =>
      store.getters.getVideoInfoById(videoId)
    );

    const currentWatchTime = computed(() => {
      return currentVideoInfo.value
        ? currentVideoInfo.value.currentWatchTime
        : 0;
    });
    return {
      videoSrc,
      videoId,
      handleSaveProgress,
      currentVideoInfo,
      handleLogOut,
      currentWatchTime,
    };
  },
});
</script>
