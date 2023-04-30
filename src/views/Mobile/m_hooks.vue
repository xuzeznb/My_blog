<template>
  <div class="home_nav">
    <ul>
      <router-link to="/m_home">首页</router-link>
      <router-link to="/m_tags">分类</router-link>
      <li>日常</li>
      <li>关于我</li>
      <li>
        <el-icon><Search /></el-icon>
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { Search } from "@element-plus/icons-vue";
</script>
<style>
  .home_nav {
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: rgb(252, 255, 255);
  }
  .home_nav > ul {
    list-style: none;
    display: flex;
    justify-content: space-around;
    font-size: 12px;
  }
</style>
