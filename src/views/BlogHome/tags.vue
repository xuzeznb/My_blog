<template>
  <div  v-lazy:backhround-image="home_info.home_background"
      :style="{
    'background': 'no-repeat',
      'background-size': 'cover',
      '-moz-background-size': ' cover',
      '-webkit-background-size': 'cover',
      'height':'100vh'
    }" class="tags">
    <!-- 标签分类   -->
    <div class="active_top" style="position: relative; top: 5px; height: 420px; overflow: auto">
      <h2 style="text-align: center">标签分类</h2>
      <div style="justify-content: center;display: flex">
        <el-row style="display: flex;justify-content: space-around; margin-top:30px;width: 500px">
          <div v-for="tag in tags_content"  style="width: 70px;border-radius: 5px;height: 30px;line-height: 28px; color: white;text-align: center"
               :style="{'background':color}">{{ tag.tags_content }} <a style="font-size: 10px">{{ tag.article_total }}</a>
          </div>
      </el-row>
      </div>
      <el-divider></el-divider>
    </div>
  </div>
</template>
<script lang="ts" setup>
//获取主页背景
import {ref} from "vue";
import server from "@/api/api";

const home_info: any = ref();
let myinfo = await server.home_info().then();
home_info.value = myinfo.data.data[0];

let color = '#' + Math.random().toString(16).substr(-6)

let {data} =  await server.article_Num()
 const tags_content =  data.data
</script>

<style lang="css" scoped>
.tags{
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
</style>