<!--suppress ALL -->
<template>
  <div style="">
    <Nav style="position: fixed; top: 0; width: 100%; z-index: 100000000000" />
    <div style="background-color: #f2f3f5; min-height: 100vh">
      <div
        class="catalogue"
        style="position: fixed; top: 100px; width: 250px; left: 20px"
      >
        <div style="font-size: 14px; background-color: white; padding: 20px">
          <h3
            style="
              min-height: 30px;
              line-height: 20px;
              border-bottom: 1px solid rgb(95, 95, 95);
              text-align: center;
            "
          >
            目录
          </h3>
          <div
            style="
              overflow: auto;
              margin-top: 10px;
              max-height: 400px;
              min-height: 200px;
              height: auto;
            "
          >
            <div
              v-for="(anchor,index) in titles "
              :key="index"
              :style="{ padding: `5px 0 5px ${anchor.indent * 10}px` }"
              @click="handleAnchorClick(anchor)"
            >
              <p style="cursor: pointer">{{anchor.title }}</p>
            </div>
          </div>
        </div>
      </div>
      <div style="display: flex; justify-content: center">
        <div
          style="
            width: 60%;
            min-height: 300px;
            position: relative;
            margin-bottom: 30px;
            margin-top: 20px;
            background-color: white;
            box-shadow: rgb(136 136 136 / 48%) 0px 0px 10px;
            margin-top: 80px;
          "
        >
          <v-md-editor
            ref="preview"
            v-model="article_content.article_content"
            :language="language"
            mode="preview"
            style="padding: 30px; padding: 20px"
          >
          </v-md-editor>
          <div
            style="
              position: absolute;
              padding: 0 30px;
              bottom: 0px;
              width: 90%;
            "
          >
            <div style="font-size: 14px; float: left">
              <!--时间-->
              <el-icon><Timer /></el-icon>
              <a style="margin-left: 5px">
                {{ utils.formatDate(article_content.creat_time) }}
              </a>
              <!--作者名称-->
              <el-icon style="margin-left: 20px"><User /></el-icon>
              <a style="margin-left: 5px">
                {{ article_content.article_author || "匿名用户" }}
              </a>
              <!--标签-->
              <el-icon style="margin-left: 20px"><CollectionTag /></el-icon>
              <a style="margin-left: 5px">
                {{ article_content.article_label || "无" }}
              </a>
            </div>
            <div style="font-size: 14px; float: right">
              <el-icon
                size="20"
                style="cursor: pointer; padding: 0px 20px"
                @click="copyUrl"
                ><Share
              /></el-icon>
              <el-icon size="20" style="cursor: pointer"><Star /></el-icon>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-backtop :bottom="100" :right="100" />
  </div>
</template>
<script lang="ts" setup>
// @ts-ignore
import { ArrowLeft, CollectionTag, Search, Share, Star, Timer, User } from "@element-plus/icons-vue";
import router from "@/router";
import { onMounted, ref } from "vue";
import utils from "../../utils";
import server from "../../api/api";
import "md-editor-v3/lib/style.css";
import "@kangc/v-md-editor/lib/theme/style/github.css";
import "@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css";
// @ts-ignore
import VueMarkdownEditor, { xss } from "@kangc/v-md-editor";
// @ts-ignore
import vuepressTheme from "@kangc/v-md-editor/lib/theme/vuepress.js";
import "@kangc/v-md-editor/lib/theme/style/vuepress.css";
// @ts-ignore
import Prism from "prismjs";
import Nav from "@/views/hook/nav.vue";
import { ElMessage } from "element-plus";

// 复制功能
  const copyUrl = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      ElMessage.success({
        showClose: true,
        message: "复制成功",
        center: true,
      });
    });
  };

  // 配置富文本框
  VueMarkdownEditor.use(vuepressTheme);

  // 暗黑色和白色的主题
  const theme = "dark";
  const formatCopiedText = [];

  // 目录跳转
  const anchors = ref();
  let preview: any = ref(null);
  const titles = ref();
  onMounted(() => {
    anchors.value = preview.value.$el.querySelectorAll("h1,h2,h3,h4,h5,h6");
    titles.value = Array.from(anchors.value).filter(
      (title: any) => !!title.innerText.trim()
    );
    if (!titles.value.length) {
      titles.value = [];
      return;
    }
    console.log(titles.value[0].innerHTML);
    const hTags = Array.from(
      new Set(titles.value.map((title: any) =>  title.tagName))
    ).sort();
    titles.value = titles.value.map((el: any,i:any) => (
      {
      title: el.innerText,
      lineIndex: el.getAttribute("data-v-md-line"),
      indent: hTags.indexOf(el.tagName),
    }));
    console.log(titles.value);
  });
  const handleAnchorClick = (anchor: any) => {
    console.log(anchor);
    const { lineIndex } = anchor;
    console.log(anchor);
    const heading = preview.value.$el.querySelector(
      `[data-v-md-line="${lineIndex}"]`
    );
    console.log(heading);
    if (heading) {
      console.log(preview.value);
      window.scrollTo(heading.offsetLeft, heading.offsetTop);
    }
  };

  let scroll = ref(
    document.documentElement.scrollTop || document.body.scrollTop
  );
  console.log(scroll);
  const language = ref("my-lang");

  onMounted(() => {
    // @ts-ignore
    window.removeEventListener("scroll", scroll);
  });
  const goBack = () => {
    router.push({ path: "/" });
  };
  //获取路由参数
  let article_id = router.currentRoute.value.query.id;
  //查询文章的UserID获取文章
  const article_content: any = ref([]);
  const article_h1: any = ref([]);
  let Select_article = await server.Select_article(Number(article_id));
  article_content.value = Select_article.data.data[0];

  //获取主页背景
  const home_info: any = ref();
  let myinfo = await server.home_info().then();
  home_info.value = myinfo.data.data[0];

  const articleLabel = (content: string) => {
    console.log(content);
    // router.push()
  };
</script>
<style scoped>
  .active {
    /*background-size: cover;*/
    /*-moz-background-size: cover;*/
    /*-webkit-background-size: cover;*/
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
  }
  >>> h1 {
    text-align: center;
  }
  .active_top {
    /*filter: alpha(Opacity=90);*/
    /*-moz-opacity: 0.8;*/
    /*opacity: 0.8;*/
    width: 900px;
    min-width: 800px;
    border-radius: 50px;
    padding: 30px;
  }

  .active_info {
    margin-top: 10px;
  }

  .active_info > span {
    font-size: 15px;
  }

  /*::-webkit-scrollbar {*/
  /*  width: 10px;*/
  /*}*/

  /* 这是针对缺省样式 (必须的) */
  ::-webkit-scrollbar-track {
    background-color: white;
    display: none;
  }

  /* 滚动条的滑轨背景颜色 */

  ::-webkit-scrollbar-thumb {
    background-color: rgba(12, 12, 12, 0.2);

    display: none;
  }

  /* 滑块颜色 */

  ::-webkit-scrollbar-button {
    background-color: white;
    display: none;
  }

  /* 滑轨两头的监听按钮颜色 */

  ::-webkit-scrollbar-corner {
    background-color: black;
    display: none;
  }

  ::-moz-selection {
    background: #ffffff;
    color: #ffffff;
    text-shadow: 0 0 0.2em #fecdc9, 0 0 0.2em #fecdc9;
  }

  ::selection {
    background: #ffffff;
    color: #ffffff;
    text-shadow: 0 0 0.2em #fecdc9, 0 0 0.2em #fecdc9;
  }

  /* 横向滚动条和纵向滚动条相交处尖角的颜色 */
</style>
