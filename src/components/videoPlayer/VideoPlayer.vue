<template>
  <div>
    <div class="video-wrapper">
      <video
        ref="videoPlayer"
        :src="src"
        @play="onPlay"
        @pause="onPause"
        @timeupdate="onTimeUpdate"
      ></video>
      <div class="video-wrapper__controls">
        <div class="video-wrapper__controls__wrapper">
          <button :disabled="isVideoDisabled" @click="togglePlay">
            <el-icon :size="60" color="#fff" v-if="isPlaying">
              <VideoPause />
            </el-icon>
            <el-icon :size="60" color="#fff" v-else>
              <VideoPlay />
            </el-icon>
          </button>
        </div>
        <div
          class="video-wrapper__controls__progress-bar-wrap"
          @mousedown="onProgressBarClick($event)"
        >
          <div
            class="video-wrapper__controls__progress-bar-wrap--element"
            :style="{ width: progress + '%' }"
          ></div>
          <div
            class="video-wrapper__controls__progress-bar-wrap--handle"
            :style="{ left: progress + '%' }"
            v-if="isDragging"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { VideoInfo } from "@/types/video";

export default defineComponent({
  name: "VideoPlayer",
  props: {
    src: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    pauseOn: {
      type: Number,
    },
    startTime: {
      type: Number,
    },
  },
  setup(props, { emit }) {
    const videoPlayer = ref<HTMLVideoElement | null>(null);
    const isPlaying = ref<boolean>(false);
    const progress = ref<number>(0);
    const isDragging = ref<boolean>(false);
    const currentVideoPlayTime = ref<number>(0);
    const isVideoDisabled = ref<boolean>(false);
    const store = useStore();

    const togglePlay = () => {
      if (!videoPlayer.value) {
        return;
      }
      if (isPlaying.value) {
        videoPlayer.value.pause();
      } else {
        videoPlayer.value.play();
      }
      isPlaying.value = !isPlaying.value;
    };

    const triggerSaveProgress = () => {
      emit("triggerSaveProgress");
    };

    const onPlay = () => {
      isPlaying.value = true;
    };

    const onPause = () => {
      isPlaying.value = false;
      triggerSaveProgress();
    };

    const updateVideoInfo = () => {
      const currentVideo: VideoInfo = {
        id: props.id,
        src: props.src,
        currentWatchTime: currentVideoPlayTime.value,
      };
      store.dispatch("storeVideoInfo", currentVideo);
    };

    const disableVideoControls = () => {
      isVideoDisabled.value = true;
    };

    const handleEndingOfTrialVideo = () => {
      if (!videoPlayer.value) {
        return;
      }
      videoPlayer.value.pause();
      disableVideoControls();
      emit("trialVideoEnded");
    };

    const onTimeUpdate = () => {
      if (videoPlayer.value) {
        currentVideoPlayTime.value = videoPlayer.value.currentTime;
        const duration = videoPlayer.value.duration;
        updateVideoInfo();
        if (!isNaN(currentVideoPlayTime.value) && !isNaN(duration)) {
          progress.value = (currentVideoPlayTime.value / duration) * 100;
        }
      }
      if (isPlaying.value) {
        if (props.pauseOn && props.pauseOn <= currentVideoPlayTime.value) {
          handleEndingOfTrialVideo();
        }
      }
    };

    const onProgressBarClick = (event: MouseEvent) => {
      if (videoPlayer.value && !isVideoDisabled.value) {
        const progressBar = event.currentTarget as HTMLElement;
        const progressPercent =
          (event.clientX - progressBar.getBoundingClientRect().left) /
          progressBar.offsetWidth;
        let calculatedCurrentTime =
          videoPlayer.value.duration * progressPercent;
        if (props.pauseOn && calculatedCurrentTime > props.pauseOn) {
          calculatedCurrentTime = props.pauseOn;
        }
        videoPlayer.value.currentTime = calculatedCurrentTime;
        progress.value = progressPercent * 100;
        triggerSaveProgress();
      }
    };

    const setCurrentTime = (currentTime: number) => {
      if (!videoPlayer.value) {
        return;
      }
      videoPlayer.value.currentTime = currentTime;
    };

    onMounted(() => {
      if (props.startTime) {
        setCurrentTime(props.startTime);
      }
    });

    onBeforeUnmount(() => {
      triggerSaveProgress();
    });

    return {
      videoPlayer,
      isPlaying,
      progress,
      isDragging,
      togglePlay,
      onPlay,
      onPause,
      onTimeUpdate,
      onProgressBarClick,
      isVideoDisabled,
    };
  },
});
</script>

<style lang="scss" scoped>
.video-wrapper {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;

  &__controls {
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    width: 100%;

    button {
      border: none;
      background: none;
    }

    &__wrapper {
      width: 10%;
      text-align: left;
    }

    &__progress-bar-wrap {
      width: 90%;
      background: #343434;
      margin-left: auto;
      &--element {
        height: 100%;
        background-color: #db7528;
        transition: width 0.2s ease-in-out;
      }
    }
  }
  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
}
</style>
