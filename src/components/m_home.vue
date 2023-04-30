<template>
  <div class="home">
    <M_hooks />
    <div class="home_content">
      <div class="home_content_man">
        <div
          class="home_content_style"
          @click="expansion(item.article_id)"
          v-for="item in article"
        >
          <h6 v-html="item.article_title"></h6>
          <p class="home_content_text" v-html="item.article_content"></p>
          <p class="home_content_tool">
            <el-icon><Timer /></el-icon> {{ utils.formatDate(item.creat_time) }}
            <a style="margin-left: 15px"
              ><el-icon><CollectionTag /></el-icon>{{ item.article_label }}
            </a>
            <a style="margin-left: 15px">{{
              "大概" + item.article_content.length + "字符"
            }}</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { CollectionTag, Timer } from "@element-plus/icons-vue";
import { ref } from "vue";
import http from "@/api/api";
import utils from "../utils/index";
import router from "@/router";
import M_hooks from "@/views/Mobile/m_hooks.vue";

//文章API
  const article: any = ref([]);
  const article_data = await http.home_article();
  article.value = article_data.data.data;

  const expansion = (id: string) => {
    router.push({
      path: "/m_article",
      query: {
        id: id,
      },
    });
  };
</script>
<style scoped>
  .home {
    height: 100vh;
    background: rgb(237, 239, 245);
  }

  .home_content_style {
    overflow: auto;
    height: 110px;
    width: 330px;
    background: white;
    border-radius: 22px;
    padding: 10px;
    margin-top: 15px;
  }
  .home_content_text {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .home_content_tool {
    font-size: 10px;
    margin-top: 7px;
  }

  .home_content {
    display: flex;
    justify-content: center;
  }

  >>> .home_content_text > h1 {
    display: none;
  }

  >>> .home_content_text strong {
    color: black;
    margin-top: 9px;
    font-size: 10px;
  }

  >>> .home_content_style > h6 > h1 {
    font-size: 17px;
    color: #fe9501;
  }

  >>> .home_content_text > h2,
  >>> .home_content_text > h4,
  >>> .home_content_text > h3,
  >>> .home_content_text > p {
    margin-top: 5px;
    font-size: 13px;
  }
  >>> .home_content_text > pre {
  }
</style>
