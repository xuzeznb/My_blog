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
              v-show="!article_id"
            size="large"
            style="float: right"
            type="success"
            @click="saveData"
            >保存文章
          </el-button>
          <el-button
              v-show="article_id"
              size="large"
              style="float: right"
              type="success"
              @click="update_article()"
          >更新文章
          </el-button>
        </div>
      </div>
      <v-md-editor v-show="!article_id"  v-model="text" height="400px"  preview-class="vuepress-markdown-body"></v-md-editor>
      <v-md-editor v-show="article_id"  v-model="text" height="400px"  preview-class="vuepress-markdown-body"></v-md-editor>
    </div>
  </div>
</template>
<script lang="ts" setup>
// noinspection TypeScriptCheckImport
import showdown from "showdown";
import Hooks from "@/views/hook/hooks.vue";
import {nextTick, ref} from "vue";
import {ElInput, ElMessage} from "element-plus";
import server from "../../api/api";
import "md-editor-v3/lib/style.css";
import router from "@/router";

import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import VueMarkdownEditor, {xss} from '@kangc/v-md-editor';
import hljs from "highlight.js";
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';

VueMarkdownEditor.use(createLineNumbertPlugin());

VueMarkdownEditor.use(githubTheme, {
  Hljs:hljs,
  vue:'html'
});

  const label = ref("");
  const text = ref("");
  const username = ref("");
  const userid = ref("");

  const inputValue = ref("");
  const dynamicTags:any = ref([]);
  const inputVisible = ref(false);
  const InputRef = ref<InstanceType<typeof ElInput>>();

  const toolbar = {
    katex:{
      title: '公式',
      action(editor) {
        editor.insert(function(selected) {
          const content = '$$\\sum_{i=1}^n a_i=0$$'
          return {
            text: `${content}`,
            selected: content
          }
        })
      }
    },
    mermaid: {
      title: '流程图',
      icon: 'el-icon-data-analysis',
      action(editor) {
        editor.insert(function(selected) {
          const content = '```mermaid\n' +
              'graph LR\n' +
              'A --- B\n' +
              'B-->C[fa:fa-ban forbidden]\n' +
              'B-->D(fa:fa-spinner);\n' +
              '```'
          return {
            text: `${content}`,
            selected: content
          }
        })
      }
    },
    exportMd: {
      title: '导入',
      icon: 'el-icon-upload2',
      action(editor) {
        editor.insert(function(selected) {
          alert('该功能未实现')
          return {
            text: ''
          }
        })
      }
    },
    importMd: {
      title: '导出',
      icon: 'el-icon-download',
      action(editor) {
        editor.insert(function(selected) {
          alert('该功能未实现')
          return {
            text: ''
          }
        })
      }
    }
  }


  // 从子组件hooks里面传值到子组件
  const clickEven = (name: any, id: any) => {
    (username.value = name), (userid.value = id);
  };
  console.log()
  // 保存数据
  const saveData = async () => {
    const converter = new showdown.Converter();
    const res: any = await server
      .Save_Article({
        article_markdown:text.value,
        article_content:xss.process(VueMarkdownEditor.vMdParser.themeConfig.markdownParser.render(text.value)),
        article_label: dynamicTags.value,
        article_author: username.value,
        article_author_id: userid.value,
      })
      .catch((err) => {
        ElMessage.error("保存失败 ==>" + err);
      });
    if (res.data.code) {
      ElMessage.success(res?.message ?? "新增成功");
      location.reload();
    }
  };

  const update_article = async() => {
    let res = await server.update_article({
      article_author: label.value,
      article_markdown:text.value,
      article_content: xss.process(VueMarkdownEditor.vMdParser.themeConfig.markdownParser.render(text.value)),
      article_username: username.value,
      article_author_id: userid.value,
      article_id: article_id,
      article_label:dynamicTags.value
    })
    if (res.data.code){
      ElMessage.success(res.data.msg)
    }
  }
  //获取文章id
  const article_id = router.currentRoute.value.query.id;
  if (article_id) {
    //查询文章内容
    let article_data = await server.Select_article(article_id);
      text.value =  article_data.data.data[0].article_markdown
    // dynamicTags.value.push(data.data[0].article_label)
  }

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
