<template>
  <div>
    <M_hooks />
    <div style="width: 100%; overflow: auto">
      <div
        class="article_html"
        style="word-break: break-all"
        v-highlight
        v-html="article_content.article_content"
      ></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import M_hooks from "@/views/Mobile/m_hooks.vue";
import router from "@/router";
import { ref } from "vue";
import server from "@/api/api";

const article_id = router.currentRoute.value.query.id;
  //查询文章的UserID获取文章
  const article_content: any = ref([]);
  let Select_article = await server.Select_article(String(article_id));
  article_content.value = Select_article.data.data[0];
  console.log(article_content.value);
</script>
<style lang="css" scoped>
  >>> .article_html {
    padding: 30px;
  }
  >>> .article_html > p {
    margin-top: 30px;
    font-size: 14px;
    text-indent: 2em;
    line-height: 35px;
  }
  >>> .article_html > pre {
    padding: 10px;
    line-height: 20px;
  }
  >>> .article_html > pre {
    word-wrap: break-word;
    word-break: normal;
    overflow: hidden;
    overflow-x: scroll;
    overflow-y: hidden;
  }

  >>> .article_html > h1 {
    font-size: 25px;
    color: #fe9501;
  }
  >>> .article_html > h2 {
    font-size: 17px;
    margin-top: 20px;
  }
  >>> .article_html > h3,
  >>> .article_html > h4,
  >>> .article_html > h5,
  >>> .article_html > h6 {
    margin-top: 10px;
  }
</style>
