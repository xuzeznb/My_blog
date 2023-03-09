import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import ElementPlus from "element-plus";
import VueLazyloadNext from "vue3-lazyload";
import "highlight.js/styles/atom-one-dark.css";
import "highlight.js/lib/common";
import hljsVuePlugin from "@highlightjs/vue-plugin";

import "element-plus/dist/index.css";
// @ts-ignore
import errorImg from "./assets/45prvdakqe.svg";
// @ts-ignore
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

createApp(App)
  .use(store)
  .use(router)
  .use(hljsVuePlugin)
  .use(VueLazyloadNext, { error: errorImg })
  .use(ElementPlus, {
    size: "small",
    zIndex: 3000,
  })
  .mount("#app");
