<template>
  <div
    v-lazy:backhround-image="home_info.home_background"
    :style="{
      background: 'no-repeat',
      'background-size': 'cover',
      '-moz-background-size': ' cover',
      '-webkit-background-size': 'cover',
    }"
    class="active"
  >
    <div
      class="active_top"
      style="position: relative; top: 15px; height:70%; overflow: auto"
    >
      <div class="nav_header">
        <el-page-header @back="goBack">
          <template #content>
            <span class="text-large font-600 mr-3"> 文章详细 </span>
          </template>
        </el-page-header>
      </div>
      <v-md-editor v-model="article_content.article_content" mode="preview" @copy-code-success="handleCopyCodeSuccess" />
      <div>
        <p></p>
      </div>
      <div class="active_info">
        <span
          ><el-icon size="15"><Timer /></el-icon
          ><a style="margin-left: 5px">{{
            utils.formatDate(article_content.creat_time)
          }}</a></span
        >
        <span style="margin-left: 20px"
          ><el-icon size="15"><User /></el-icon
          ><a style="margin-left: 5px">{{
            article_content.article_author || "无法提供信息"
          }}</a></span
        >
        <span style="margin-left: 20px"
          ><el-icon size="15"><CollectionTag /></el-icon
          ><a
            href="javascript:;"
            style="margin-left: 5px; color: orange; text-decoration: none"
            @click="articleLabel(article_content.article_label)"
            >{{ article_content.article_label }}</a
          ></span
        >
        <el-backtop :bottom="100" :right="100" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import VueMarkdownEditor from '@kangc/v-md-editor';
// @ts-ignore
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
import {CollectionTag, Timer, User} from "@element-plus/icons-vue";
import router from "@/router";
import {ref} from "vue";
import utils from "../../utils";
import server from "../../api/api";
import "md-editor-v3/lib/style.css";
import '@kangc/v-md-editor/lib/theme/style/github.css';
// import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
// import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import hljs from "highlight.js";

VueMarkdownEditor.use(createCopyCodePlugin());

VueMarkdownEditor.use(githubTheme, {
  Hljs:hljs,
});



 const goBack = () => {
    router.push({ path: "/" });
  };
  //获取路由参数
  let article_id = router.currentRoute.value.query.id;
  //查询文章的UserID获取文章
const article_content: any = ref([]);
const article_h1: any = ref([]);
  let Select_article = await server.Select_article(String(article_id));
  article_content.value = Select_article.data.data[0];

  //获取主页背景
  const home_info: any = ref();
  let myinfo = await server.home_info().then();
  home_info.value = myinfo.data.data[0];

  const articleLabel = (content) => {
    console.log(content);
    // router.push()
  };
</script>
<style scoped>
  .active {
    background-size: cover;
    -moz-background-size: cover;
    -webkit-background-size: cover;
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
  }

  .active_top {
    background: white;
    filter: alpha(Opacity=90);
    -moz-opacity: 0.8;
    opacity: 0.8;
    width: 900px;
    min-width: 800px;
    border-radius: 50px;
    padding: 30px;
  }

  .header_article_content {
    line-height: 28px;
  }


  .active_info {
    margin-top: 10px;
  }

  .active_info > span {
    font-size: 15px;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

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

  /* 横向滚动条和纵向滚动条相交处尖角的颜色 */
</style>
