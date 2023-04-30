<!--suppress ALL -->
<template>
  <div >
    <div style="background-color: #f2f3f5; ">
      <div class="catalogue" style="position: fixed; top: 100px; width: 250px; left: 20px">
        <div style="font-size: 14px; background-color: white">
          <h3 style="height: 40px;line-height: 40px; margin-top: 10px; text-align: center">
            目录
          </h3>
          <div style="overflow: auto; height: 400px">
            <div
              v-for="anchor in titles"
              :style="{ padding: `5px 0 5px ${anchor.indent * 10}px` }"
              @click="handleAnchorClick(anchor)"
            >
              <a style="cursor: pointer">{{ anchor.title }}</a>
            </div>
          </div>
        </div>
      </div>
      <div style="display: flex; justify-content: center">
        <div style="width: 60% ;margin-top: 60px;">
          <MdEditor
            ref="preview"
            v-model="article_content.article_markdown"
            :include-level="[3, 4]"
            :language="language"
            :noPrettier="true"
            :previewOnly="true"
            :showCodeRowNumber="true"
            class="c-markdown"
            mode="preview"
            style="padding: 30px"
            theme="light"
          >
          </MdEditor>
          <div class="active_info">
            <span>
              <el-icon size="15"><Timer /></el-icon>
              <a style="margin-left: 5px">
                {{ utils.formatDate(article_content.creat_time) }}</a
              ></span
            >
            <span style="margin-left: 20px">
              <el-icon size="15"><User /></el-icon>
              <a style="margin-left: 5px">
                {{ article_content.article_author || "无法提供信息" }}</a
              >
            </span>
            <span style="margin-left: 20px">
              <el-icon size="15">
                <CollectionTag />
              </el-icon>
              <a
                href="javascript:;"
                style="margin-left: 5px; color: orange; text-decoration: none"
                @click="articleLabel(article_content.article_label)"
              >
                {{ article_content.article_label }}
              </a>
            </span>
            <el-backtop :bottom="100" :right="100" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
// @ts-ignore
import { ArrowLeft, CollectionTag, Timer, User } from "@element-plus/icons-vue";
import router from "@/router";
import { onMounted, ref } from "vue";
import utils from "../../utils";
import server from "../../api/api";
import "md-editor-v3/lib/style.css";
import "@kangc/v-md-editor/lib/theme/style/github.css";
import "@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css";
import MdEditor from "md-editor-v3";

const anchors = ref();
  const preview: any = ref(null);
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
    const hTags = Array.from(
      new Set(titles.value.map((title: any) => title.tagName))
    ).sort();
    titles.value = titles.value.map((el: any) => ({
      title: el.innerText,
      lineIndex: el.offsetTop,
      indent: parseInt(el.tagName.slice(1)) - 1,
    }));
  });
  const handleAnchorClick = (anchor: any) => {
    const { lineIndex } = anchor;
    window.scrollTo(0, lineIndex);
  };
  //
  const language = ref("my-lang");
  // let scroll = ref(
  //   document.documentElement.scrollTop || document.body.scrollTop
  // );
  // onMounted(() => {
  //
  //   window.removeEventListener("scroll", scroll.value);
  // });
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
>>> h1{
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

  /* 横向滚动条和纵向滚动条相交处尖角的颜色 */
</style>
