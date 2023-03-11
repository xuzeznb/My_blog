import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import ElementPlus from "element-plus";
import VueLazyloadNext from "vue3-lazyload";
// @ts-ignore
import '@kangc/v-md-editor/lib/style/base-editor.css';
// @ts-ignore
import hljs from 'highlight.js';
// @ts-ignore
import VueMarkdownEditor from '@kangc/v-md-editor';
// @ts-ignore
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';
// 选择使用主题
import 'highlight.js/styles/github.css';
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';


import "element-plus/dist/index.css";
// @ts-ignore
import errorImg from "./assets/45prvdakqe.svg";

VueMarkdownEditor.use(createLineNumbertPlugin());
// @ts-ignore

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

createApp(App)
  .use(store)
  .use(router)
  .use(VueMarkdownEditor)
  .use(VueLazyloadNext, { error: errorImg })
  .use(ElementPlus, {
    size: "small",
    zIndex: 3000,
  })
  .mount("#app");
