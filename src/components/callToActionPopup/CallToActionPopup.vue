<template>
  <div>
    <el-dialog :model-value="visible" class="call-to-action-popup">
      <div class="call-to-action-popup__header">
        <Vue3Lottie
          :animationData="registerPopupAnimation"
          :height="200"
          :width="200"
        />
      </div>
      <div clas="call-to-action-popup__body">
        <div class="call-to-action-popup__body--heading">
          Register to enjoy the full set of features
        </div>
        <div class="call-to-action-popup__body__adv-list">
          <ul>
            <li>
              <el-icon :size="20" color="#db7528">
                <Mouse />
              </el-icon>
              Learn new words with fun games
            </li>
            <li>
              <el-icon :size="20" color="#db7528">
                <Platform />
              </el-icon>
              Access to 1000+ songs, TV shows, and movies in Spanish
            </li>
            <li>
              <el-icon :size="20" color="#db7528">
                <Opportunity />
              </el-icon>
              Try an Innovative language learning method
            </li>
          </ul>
        </div>
      </div>
      <button class="call-to-action-popup--button">Start your free week</button>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import registerPopupAnimation from "@/assets/animations/register-popup-lottie.json";

export default defineComponent({
  name: "CallToActionPopup",
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    return {
      registerPopupAnimation,
    };
  },
});
</script>

<style lang="scss">
#app .call-to-action-popup {
  border-radius: 20px;
  max-width: 360px;
  text-align: left;
  width: 100%;
  &__body {
    &--heading {
      font-weight: bold;
      font-size: 20px;
    }
    &__adv-list {
      margin: 20px 0px 20px 0px;
      ul {
        list-style: none;
        padding: 0px;
        margin: 0px;
        li {
          display: flex;
          align-items: flex-start;
          padding-bottom: 15px;
          i {
            margin-right: 10px;
          }
        }
      }
    }
  }
  &--button {
    background: #db7528;
    width: 100%;
    border: none;
    border-radius: 15px;
    height: 40px;
    color: #fff;
    font-weight: bold;
  }
}
</style>
