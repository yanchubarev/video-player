import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap/dist/css/bootstrap.css";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import Vue3Lottie from "vue3-lottie";
import "vue3-lottie/dist/style.css";

const app = createApp(App);

app.use(store);
app.use(router);
app.use(ElementPlus);
app.use(Vue3Lottie, { name: "Vue3Lottie" });

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.mount("#app");
