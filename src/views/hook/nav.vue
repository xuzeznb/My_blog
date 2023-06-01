<template>
  <el-menu
    :default-active="activeIndex"
    :ellipsis="false"
    class="el-menu-demo"
    mode="horizontal"
    router
  >
    <el-menu-item>LOGO</el-menu-item>
    <el-menu-item index="/">首页</el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="">ChatGPT</el-menu-item>
    <el-menu-item index="/">分类</el-menu-item>
    <!--<el-menu-item index="2"></el-menu-item>-->
    <p
      style="
        height: 60px;
        line-height: 60px;
        width: 80px;
        text-align: center;
        cursor: pointer;
      "
    >
      <el-icon><Search /></el-icon>
    </p>
  </el-menu>
</template>

<script setup>
import { ref } from "vue";
import { Search } from "@element-plus/icons-vue";

const activeIndex = ref("1");
</script>
<style scoped>
  .flex-grow {
    flex-grow: 1;
  }
</style>
