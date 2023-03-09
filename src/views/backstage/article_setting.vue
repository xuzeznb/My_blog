<template>
  <div class="article_setting">
    <Hooks :value="dele" />
    <div class="article_setting_label">
      <el-table :data="my_article" style="width: 1100px">
        <el-table-column :label="article_info.id" width="180">
          <template #default="scope">
            {{ scope.row.article_id || "无" }}
          </template>
        </el-table-column>
        <el-table-column :label="article_info.title" width="180">
          <template #default="scope">
            {{ scope.row.article_title || "无" }}
          </template>
        </el-table-column>
        <el-table-column :label="article_info.creat_time" width="180">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-icon>
                <timer />
              </el-icon>
              <span style="margin-left: 10px">{{
                utils.formatDate(scope.row.creat_time) || "无"
              }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="article_info.content" width="180">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span
                style="
                  margin-left: 10px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: 1;
                  line-clamp: 1;
                  -webkit-box-orient: vertical;
                "
                >{{ scope.row.article_content || "无" }}</span
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="article_info.name" width="180">
          <template #default="scope">
            <el-popover
              effect="light"
              placement="top"
              trigger="hover"
              width="auto"
            >
              <template #default>
                <div>name: {{ scope.row.article_author || "Mr_Ze" }}</div>
                <div>address: {{ scope.row.address }}</div>
              </template>
              <template #reference>
                <el-tag>{{ scope.row.article_author || "Mr_Ze" }}</el-tag>
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column :label="article_info.operation">
          <template #default="scope">
            <el-button size="default" @click="handleEdit(scope.row.article_id)"
              >修改
            </el-button>
            <el-button
              size="default"
              type="danger"
              @click="handleDelete(scope.row.article_id)"
              >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script lang="ts" setup>
import router from "@/router";
import server from "@/api/api";
import {Timer} from "@element-plus/icons-vue";
import Hooks from "@/views/hook/hooks.vue";
import utils from "@/utils/index";
import {ElMessage} from "element-plus";

let myinfo = await server.My_Info().then();
  if (myinfo.status != 200) {
    alert("您的登录信息已过期！请重新登录!即将跳转！");
    localStorage.clear();
    router.push({ path: "/backstage/login" });
  }

  const myArticle = await server.home_article();
  const my_article = myArticle.data.data;
  const username = myinfo.data.username;

  interface User {
    date: string;
    name: string;
    address: string;
  }

  const handleEdit = (row: any) => {
    console.log(row);
    router.push({
      path: "/backstage/Publish_article",
      query: {
        id: row,
      },
    });
  };
  const handleDelete = async (row: any) => {
    let Dele_article = await server.Delet_article(Number(row));
    if (Dele_article.data.code == 200) {
      ElMessage({
        message: Dele_article.data.msg,
        type: "success",
      });
      location.reload();
    }
  };
  const article_info = {
    id: "id",
    title: "文章标题",
    content: "文章内容",
    creat_time: "发布时间",
    name: "名字",
    operation: "操作",
  };
</script>
<style scoped>
  .article_setting {
    margin: 10px;
  }

  .article_Info {
    margin-top: 10px;
  }

  .article_Info a {
    font-size: 14px;
  }

  .article_setting_label {
    width: 100%;
    margin: 15px;
  }
</style>
