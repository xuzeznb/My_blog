<template>
  <div style="width: 1100px">
    <Hooks @clickChild="clickEven" />
    <div style="padding: 0 15px">
      <div style="display: flex; margin: 20px 0">
        <div
          style="
            display: flex;
            line-height: 35px;
            font-size: 15px;
            margin-left: 10px;
            width: 400px;
          "
        >
          <span style="width: 45px">标签:</span>
          <el-tag
            v-for="tag in dynamicTags"
            :key="tag"
            :disable-transitions="false"
            class="mx-1"
            closable
            @close="handleClose(tag)"
          >
            {{ tag }}
          </el-tag>
          <el-input
            v-if="inputVisible"
            ref="InputRef"
            v-model="inputValue"
            class="ml-1 w-20"
            size="small"
            @blur="handleInputConfirm"
            @keyup.enter="handleInputConfirm"
          />
          <el-button
            v-else
            class="button-new-tag ml-1"
            size="small"
            style="margin-top: 5px"
            @click="showInput"
          >
            + New Tag
          </el-button>
        </div>
        <div
          style="
            display: flex;
            height: 35px;
            line-height: 35px;
            margin-left: 30px;
            font-size: 15px;
          "
        >
          用户名称:
          <el-input
            v-model="username"
            disabled
            style="
              width: 200px;
              height: 35px;
              margin-left: 5px;
              font-size: 15px;
            "
          >
          </el-input>
        </div>
        <div
          style="
            display: flex;
            height: 35px;
            line-height: 35px;
            width: 100px;
            margin-left: 260px;
          "
        >
          <el-button
            size="large"
            style="float: right"
            type="success"
            @click="saveData"
            >保存文章
          </el-button>
        </div>
      </div>
      <editor v-model="text" pageFullScreen></editor>
    </div>
  </div>
</template>
<script lang="ts" setup>
import showdown from "showdown";
import Hooks from "@/views/hook/hooks.vue";
import {nextTick, ref} from "vue";
import {ElInput, ElMessage} from "element-plus";
import Editor from "md-editor-v3";
import server from "../../api/api";
import "md-editor-v3/lib/style.css";
import router from "@/router";

const name = ref("");
  const label = ref("");
  const text = ref("");
  const username = ref("");
  const userid = ref("");
  // 从子组件hooks里面传值到子组件
  const clickEven = (name: any, id: any) => {
    (username.value = name), (userid.value = id);
  };
  // 保存数据
  const saveData = async () => {
    const converter = new showdown.Converter();
    const res: any = await server
      .Save_Article({
        article_content: converter.makeHtml(text.value),
        article_label: "1245",
        article_author: username.value,
        article_author_id: userid.value,
      })
      .catch((err) => {
        ElMessage.error("保存失败");
      });
    if (res.data.code) {
      ElMessage.success(res?.message ?? "新增成功");
      location.reload();
    }
  };

  /**
   * 获取路由传的ID
   */

  const article_id = router.currentRoute.value.query.id;
  if (article_id) {
    let { data } = await server.Select_article(article_id);
    text.value = data.data[0].article_content;
  }

  const inputValue = ref("");
  const dynamicTags = ref(["Tag 1", "Tag 2", "Tag 3"]);
  const inputVisible = ref(false);
  const InputRef = ref<InstanceType<typeof ElInput>>();

  const handleClose = (tag: string) => {
    dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1);
  };

  const showInput = () => {
    inputVisible.value = true;
    nextTick(() => {
      InputRef.value!.input!.focus();
    });
  };

  const handleInputConfirm = () => {
    if (inputValue.value) {
      dynamicTags.value.push(inputValue.value);
    }
    inputVisible.value = false;
    inputValue.value = "";
  };
</script>
<style scoped>
  .mx-1 {
    margin-top: 5px;
  }
</style>
