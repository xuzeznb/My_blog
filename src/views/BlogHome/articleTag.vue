<template>
  <div
    v-lazy:backhround-image="home_info.home_background"
    :style="{
      background: 'no-repeat',
      'background-size': 'cover',
      '-moz-background-size': ' cover',
      '-webkit-background-size': 'cover',
      height: '100vh',
    }"
    class="tags"
  >
    <!-- 标签分类   -->
    <div
      class="active_top"
      style="position: relative; top: 5px; height: 420px; overflow: auto"
      v-show="route_content"
    >
      <div>
        <h3>
          <a href="javascript:;" style="text-decoration: none; padding: 0 15px;color: #fe9501;font-size: 17px"
             @click="router.push({path:'/'})"
            ><el-icon style="padding: 0 5px" size="15"><Back /></el-icon>
            返回</a
          >当前<strong style="padding: 0 10px">{{ route_content }}</strong
          >标签下的文章
        </h3>
      </div>
      <el-divider></el-divider>
      <div style="display: flex; justify-content: left">
        <div
          v-for="item in article_id"
          style="padding: 10px"
          @click="router_path(item.article_id)"
        >
          <div
            class="tag_content"
            style="
              width: 260px;
              background: #f7f4f4;
              border-radius: 10px;
              height: auto;
            "
          >
            <a
              href="javascript:;"
              style="display: flex; padding: 10px 5px 10px 20px"
              v-html="item.article_title"
            ></a>
            <div style="margin-top: 11px" class="box_article_text">
              <p
                class="black"
                style="font-size: 10px"
                v-html="item.article_content"
              ></p>
            </div>
            <p
              style="padding: 10px 20px; font-size: 10px"
              v-html="utils.formatDate(item.creat_time)"
            ></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {ref} from "vue";
import server from "@/api/api";
import router from "@/router";
import utils from "@/utils";
import {Back} from "@element-plus/icons-vue";

// 获取主题信息
  const home_info: any = ref();
  let myinfo = await server.home_info().then();
  home_info.value = myinfo.data.data[0];

  // 获取router传值
  let route_content = router.currentRoute.value.query.c;
  const router_path = (id: any) => {
    router.push({ path: "/article", query: { id: id } });
  };

  let { data } = await server.Tags(String(route_content));
  const res_Data = [];
  const res = [];
  for (let i = 0; i < data.data.length; i++) {
    res_Data.push(...data.data[i].article_content);
  }
  const article_id: any = ref([]);
  const run = async (id: any) => {
    let { data } = await server.Select_article(id);
    article_id.value.push(...data.data);
  };

  for (let i = 0; res_Data.length > i; i++) {
    run(res_Data[i].article_id);
  }
</script>

<style lang="css" scoped>
  .black {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    -webkit-box-orient: vertical;
    padding: 0 25px;
  }
  >>> .black > h1 {
    display: none;
  }
  .tags {
    display: flex;
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
  >>> .tag_content > a > h1 {
    font-size: 16px;
    color: #42b983;
  }
  .tag_content > a {
    text-decoration: none;
  }
</style>
