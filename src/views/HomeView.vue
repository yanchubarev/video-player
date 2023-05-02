<template>
  <div class="mt-5">
    <el-container>
      <el-header>
        <el-button type="primary" @click="handleLogIn">Log in </el-button>
      </el-header>
      <el-main>
        <div class="container">
          <h1>Landing page for anon users</h1>
          <VideoPlayer
            :src="videoSrc"
            :pause-on="maxVideoDuration"
            :id="videoId"
            :start-time="currentWatchTime"
            @triggerSaveProgress="handleSaveProgress"
            @trialVideoEnded="handleTrialVideoEnded"
          />
          <CallToActionPopup :visible="isCallToActionPopupVisible" />
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import VideoPlayer from "@/components/videoPlayer/VideoPlayer.vue";
import CallToActionPopup from "@/components/callToActionPopup/CallToActionPopup.vue";
import timerVideo from "@/assets/video/timer.mp4";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const MAX_TRIAL_VIDEO_DURATION = 10;

export default defineComponent({
  components: {
    VideoPlayer,
    CallToActionPopup,
  },
  setup() {
    const videoSrc: string = timerVideo;
    const store = useStore();
    const isUserLoggedIn = computed(() => store.getters.user.isLoggedIn);
    const isCallToActionPopupVisible = ref<boolean>(false);
    const videoId = "qwerty";
    const router = useRouter();

    const handleSaveProgress = () => {
      store.dispatch("saveVideoItems", isUserLoggedIn.value);
    };

    const maxVideoDuration = computed(() => {
      return store.getters.isLoggedIn ? undefined : MAX_TRIAL_VIDEO_DURATION;
    });

    const currentVideoInfo = computed(() =>
      store.getters.getVideoInfoById(videoId)
    );

    const currentWatchTime = computed(() => {
      return currentVideoInfo.value
        ? currentVideoInfo.value.currentWatchTime
        : 0;
    });

    const handleTrialVideoEnded = () => {
      if (isUserLoggedIn.value) {
        return;
      }
      isCallToActionPopupVisible.value = true;
    };

    const handleLogIn = () => {
      store.dispatch("logInUser");
      router.push("/first-lesson");
    };

    return {
      videoSrc,
      videoId,
      handleSaveProgress,
      currentVideoInfo,
      maxVideoDuration,
      isCallToActionPopupVisible,
      currentWatchTime,
      handleTrialVideoEnded,
      handleLogIn,
    };
  },
});
</script>
