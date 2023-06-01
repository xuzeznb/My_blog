<!--suppress ALL -->
<template>
  <div style="width: 1100px">
    <Hooks style="padding: 10px" @clickChild="clickEven" />
    <div style="padding: 0 15px">
      <div style="display: flex">
        <strong> 请选择您的标签：</strong>
        <div>
          <el-checkbox-group  v-model="checkedFruits">
            <el-checkbox v-for="item in all_label" :label="item.tag_name" style="justify-content: space-between">{{ item.tag_name }}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div
        style="margin-top: 30px;">
        <strong>用户名称 :</strong>
        <el-input
          v-model="username"
          disabled
          style="width: 200px; height: 35px; margin-left: 5px; font-size: 15px"
        >
        </el-input>
      </div>
      <div style="margin-top: 20px">
        <v-md-editor
        v-model="text"
        :toolbar="toolbar"
        :toolbarsExclude="toolbarsExclude"
        height="300px"
        left-toolbar="bold underline | emoji italic strikeThrough
  sub sup quote unorderedList orderedList codeRow
  code link image table revoke
  next save pageFullscreen fullscreen
  preview  "
      />
      </div>
      <div style="margin-top: 20px">
        <el-button
          v-show="!article_id"
          size="large"
          type="success"
          @click="saveData"
          >保存文章
        </el-button>
        <el-button
          v-show="article_id"
          :formatCopiedText="formatCopiedText"
          size="large"
          type="success"
          @click="update_article()"
          >更新文章
        </el-button>
      </div>
    </div>

  </div>
</template>
<script lang="ts" setup>
// noinspection TypeScriptCheckImport
import Hooks from "@/views/hook/hooks.vue";
import { ref } from "vue";
import { ElInput, ElMessage } from "element-plus";
import server from "../../api/api";
import http from "../../api/api";
import "md-editor-v3/lib/style.css";
import router from "@/router";
// @ts-ignore
import VueMarkdownEditor, { xss } from "@kangc/v-md-editor";
import hljs from "highlight.js";
// @ts-ignore
import createLineNumbertPlugin from "@kangc/v-md-editor/lib/plugins/line-number/index";
// @ts-ignore
import githubTheme from "@kangc/v-md-editor/lib/theme/github.js";
import "@kangc/v-md-editor/lib/theme/style/github.css";
// @ts-ignore
import createEmojiPlugin from "@kangc/v-md-editor/lib/plugins/emoji/index";
import "@kangc/v-md-editor/lib/plugins/emoji/emoji.css";
// @ts-ignore
import createTipPlugin from "@kangc/v-md-editor/lib/plugins/tip/index";
import "@kangc/v-md-editor/lib/plugins/tip/tip.css";

// 配置富文本框
  VueMarkdownEditor.use(githubTheme, {
    Hljs: hljs,
    vue: "html",
  });
  // 工具栏屏蔽选项
  const toolbarsExclude = ["github"];
  // 暗黑色和白色的主题
  const theme = "dark";
  let toobars = [];
  const formatCopiedText = [];
  VueMarkdownEditor.use(createLineNumbertPlugin());
  VueMarkdownEditor.use(createEmojiPlugin());
  VueMarkdownEditor.use(createTipPlugin());

  const label = ref("");
  const text = ref("");
  const username = ref("");
  const userid = ref("");
  const checkedFruits = ref([]);
  const inputValue = ref("");
  const dynamicTags: any = ref([]);
  const inputVisible = ref(false);
  const clickTag = ref();

  const InputRef = ref<InstanceType<typeof ElInput>>();

  const checked = ref(false);

  const onChange = (status: boolean) => {
    console.log(status);
  };

  const toolbar = {
    katex: {
      title: "公式",
      action(editor: any) {
        editor.insert(function (selected: any) {
          const content = "$$\\sum_{i=1}^n a_i=0$$";
          return {
            text: `${content}`,
            selected: content,
          };
        });
      },
    },
    add_color: {
      title: "添加颜色",
      action(editor: any) {
        editor.insert(function (selected: any) {
          const content = '<span style="color: ${e}/>';
          return {
            text: `${content}`,
            selected: content,
          };
        });
      },
    },
    mermaid: {
      title: "流程图",
      icon: "el-icon-data-analysis",
      action(editor: any) {
        editor.insert(function (selected: any) {
          const content =
            "```mermaid\n" +
            "graph LR\n" +
            "A --- B\n" +
            "B-->C[fa:fa-ban forbidden]\n" +
            "B-->D(fa:fa-spinner);\n" +
            "```";
          return {
            text: `${content}`,
            selected: content,
          };
        });
      },
    },
    exportMd: {
      title: "导入",
      icon: "el-icon-upload2",
      action(editor: any) {
        editor.insert(function (selected: any) {
          alert("该功能未实现");
          return {
            text: "",
          };
        });
      },
    },
    importMd: {
      title: "导出",
      icon: "el-icon-download",
      action(editor: any) {
        editor.insert(function (selected: any) {
          alert("该功能未实现");
          return {
            text: "",
          };
        });
      },
    },
  };

  // 从子组件hooks里面传值到子组件
  const clickEven = (val: any) => {
    // console.log(val)
    (username.value = val?.username || "未获取到！"), (userid.value = val?.id);
  };

  // 获取文章标签
  const all_label = ref();
  let { data } = await http.all_label().then();
  all_label.value = data.data;

  // 保存数据
  const saveData = async (id:number) => {
    const res: any = await server
      .Save_Article({
        article_markdown: text.value,
        article_content: xss.process(
          VueMarkdownEditor.vMdParser.themeConfig.markdownParser.render(
            text.value
          )
        ),
        article_label: checkedFruits.value,
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
  // 更新文章信息
  const update_article = async () => {
    let res = await server.update_article({
      article_author: label.value,
      article_markdown: text.value,
      article_content: xss.process(
        VueMarkdownEditor.vMdParser.themeConfig.markdownParser.render(
          text.value
        )
      ),
      article_username: username.value,
      article_author_id: userid.value,
      article_id: article_id,
      article_label: dynamicTags.value,
    });
    if (res.data.code) {
      ElMessage.success(res.data.msg);
    }
  };

  //获取文章id
  const article_id: number = Number(router.currentRoute.value.query.id);
  if (article_id) {
    //查询文章内容
    let article_data = await server.Select_article(article_id);
    text.value = article_data.data.data[0].article_markdown;
    if (!text.value) {
      ElMessage.error("错误！当前文章不存在！");
    }
    dynamicTags.value.push(article_data.data.data[0].article_label);
  }
</script>
<style scoped>
  .mx-1 {
    margin-top: 5px;
  }

  @font-face {
    font-family: "iconfont";
    src: url("data:font/truetype;charset=utf-8;base64,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AAsAJgFuAAoAQwByAGUAYQB0AGUAZAAgAGIAeQAgAGkAYwBvAG4AZgBvAG4AdAAKAAAKQ3JlYXRlZCBieSBpY29uZm9udAoAAGkAYwBvAG4AZgBvAG4AdAAAaWNvbmZvbnQAAFIAZQBnAHUAbABhAHIAAFJlZ3VsYXIAAGkAYwBvAG4AZgBvAG4AdAAAaWNvbmZvbnQAAGkAYwBvAG4AZgBvAG4AdAAAaWNvbmZvbnQAAFYAZQByAHMAaQBvAG4AIAAxAC4AMAAAVmVyc2lvbiAxLjAAAGkAYwBvAG4AZgBvAG4AdAAAaWNvbmZvbnQAAEcAZQBuAGUAcgBhAHQAZQBkACAAYgB5ACAAcwB2AGcAMgB0AHQAZgAgAGYAcgBvAG0AIABGAG8AbgB0AGUAbABsAG8AIABwAHIAbwBqAGUAYwB0AC4AAEdlbmVyYXRlZCBieSBzdmcydHRmIGZyb20gRm9udGVsbG8gcHJvamVjdC4AAGgAdAB0AHAAOgAvAC8AZgBvAG4AdABlAGwAbABvAC4AYwBvAG0AAGh0dHA6Ly9mb250ZWxsby5jb20AAAIAAAAAAAAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOwAAAAEAAgECAQMBBAEFAQYBBwEIAQkBCgELAQwBDQEOAQ8BEAERARIBEwEUARUBFgEXARgBGQEaARsBHAEdAR4BHwEgASEBIgEjASQBJQEmAScBKAEpASoBKwEsAS0BLgEvATABMQEyATMBNAE1ATYBNwE4ATkEcmVkbwlzZWxlY3RhbGwHcHJldmlldwR1bmRvBGRhdGUHY2xlYXJ1cBU3MjNiaWFuamlxaV9kdWFuaG91anUWNzIyYmlhbmppcWlfZHVhbnFpYW5qdQotY2hlY2tsaXN0DWRpcmVjdGlvbi1sdHINZGlyZWN0aW9uLXJ0bAtmb250Ymdjb2xvcg1jbGVhcmVkZm9ybWF0BGZvbnQHb3V0ZGVudAhmb250c2l6ZQp0ZXh0X2NvbG9yD2Zvcm1hdC1oZWFkZXItMg9mb3JtYXQtaGVhZGVyLTMLbGluZS1oZWlnaHQPZm9ybWF0LWhlYWRlci0xD2Zvcm1hdC1oZWFkZXItNA9mb3JtYXQtaGVhZGVyLTUPZm9ybWF0LWhlYWRlci02EUNoYXJhY3Rlci1TcGFjaW5nBmluZGVudAZiYW9jdW4IcXVhbnBpbmcFZnV6aGkHc2hhbmNodQxiaWFuamlzZWt1YWkJZmVuZ2V4aWFuB2RpYW56YW4MY2hhcnVsaWFuamllC2NoYXJ1dHVwaWFuCnd1eHVwYWlsaWUManV6aG9uZ2R1aXFpB3lpbnlvbmcLeW91eHVwYWlsaWUIeW91ZHVpcWkJeml0aWRhaW1hCHhpYW9saWFuCXppdGlqaWFjdQ96aXRpc2hhbmNodXhpYW4Neml0aXNoYW5nYmlhbwp6aXRpYmlhb3RpDnppdGl4aWFodWF4aWFuCXppdGl4aWV0aQl6aXRpeWFuc2UIenVvZHVpcWkJeml0aXl1bGFuC3ppdGl4aWFiaWFvC3p1b3lvdWR1aXFpB2R1aWdvdXgGZ3VhbmJpDnNoZW5neWluX3NoaXRpAAAAAAAB//8AAgABAAAADAAAABYAAAACAAEAAwA6AAEABAAAAAIAAAAAAAAAAQAAAADVpCcIAAAAANhk6GIAAAAA2GToYg==")
      format("truetype");
  }
  >>> .el-checkbox__input {
    display: none;
  }
  >>> .el-checkbox__label {
    border: 1px solid rgba(51, 51, 51, 0.33);
    width: 60px;
    height: 25px;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
  }
  >>> .el-checkbox__label:hover {
    border: 1px solid rgba(21, 74, 210, 0.8);
    color: rgba(21, 74, 210, 0.8);
  }
  >>> .el-checkbox__input.is-checked + .el-checkbox__label {
    border: 1px solid rgba(21, 74, 210, 0.8);
  }
</style>
