import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import ElementPlus from "element-plus";
import VueLazyloadNext from "vue3-lazyload";
// @ts-ignore
import "@kangc/v-md-editor/lib/style/base-editor.css";
// @ts-ignore
import hljs from "highlight.js";
// @ts-ignore
import createLineNumbertPlugin from "@kangc/v-md-editor/lib/plugins/line-number/index";
// 选择使用主题
import "highlight.js/styles/github.css";
import "@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css";

// @ts-ignore
import markdown from "vue3-markdown-it";
import "element-plus/dist/index.css";
import "md-editor-v3/lib/style.css";
// @ts-ignore
import errorImg from "./assets/45prvdakqe.svg";
// @ts-ignore
import vuepressTheme from "@kangc/v-md-editor/lib/theme/vuepress.js";
import "@kangc/v-md-editor/lib/theme/style/vuepress.css";
// @ts-ignore
import createTipPlugin from "@kangc/v-md-editor/lib/plugins/tip/index";
import "@kangc/v-md-editor/lib/plugins/tip/tip.css";

// @ts-ignore
import VueMarkdownEditor from "@kangc/v-md-editor";
// @ts-ignore
import createKatexPlugin from "@kangc/v-md-editor/lib/plugins/katex/cdn";

// @ts-ignore
import createMermaidPlugin from "@kangc/v-md-editor/lib/plugins/mermaid/cdn";
import "@kangc/v-md-editor/lib/plugins/mermaid/mermaid.css";
// @ts-ignore
import createTodoListPlugin from "@kangc/v-md-editor/lib/plugins/todo-list/index";
import "@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css";

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

createApp(App)
  .use(store)
  .use(router)
  .use(markdown)
  .use(VueMarkdownEditor)
  .use(VueLazyloadNext, { error: errorImg })
  .use(ElementPlus, {
    size: "small",
    zIndex: 3000,
  })
  .mount("#app");
