<template>
  <div class="home">
    <div class="nav">
      <el-menu
        :collapse="isCollapse"
        class="el-menu-vertical-demo"
        default-active="2"
        router
        @close="handleClose"
        @mouseenter="onEnterTd"
        @mouseleave="onLeaveTd"
        @open="handleOpen"
      >
        <el-sub-menu index="0">
          <template #title>
            <el-icon>
              <User />
            </el-icon>
            <span>账号设置</span>
          </template>
          <el-menu-item-group>
            <template #title><span>账号主页设置</span></template>
            <el-menu-item index="User_setting">个人信息</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title><span>item four</span></template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="article_setting">
          <el-icon>
            <icon-menu />
          </el-icon>
          <template #title>文章管理</template>
        </el-menu-item>
        <el-menu-item disabled index="3">
          <el-icon>
            <document />
          </el-icon>
          <template #title>用户管理</template>
        </el-menu-item>
        <el-menu-item index="Publish_article">
          <el-icon>
            <CollectionTag />
          </el-icon>
          <template #title>文章发布</template>
        </el-menu-item>
        <el-menu-item index="tag_setting">
          <el-icon>
            <CollectionTag />
          </el-icon>
          <template #title>标签管理</template>
        </el-menu-item>
        <el-menu-item index="file_setting">
          <el-icon>
            <Document />
          </el-icon>
          <template #title>文件管理</template>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="info_main">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {CollectionTag, Document, Menu as IconMenu, User,} from "@element-plus/icons-vue";

const isCollapse = ref(true);
  const onEnterTd = () => {
    isCollapse.value = true;
  };
  const onLeaveTd = () => {
    isCollapse.value = true;
  };
  const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
  };
  const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
  };
</script>

<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  .nav {
  }

  .home {
    height: 100%;
    width: 100%;
    display: flex;
  }

  .info_main {
  }
</style>
