<!--主页-->
<!--suppress ALL -->
<template>
  <div
    ref="bodyRef"
    id="img"
    v-lazy="homeinfo.home_background"
    style="
      background: no-repeat;
      height: 100vh;
      background-size: cover;
      -moz-background-size: cover;
      -webkit-background-size: cover;
    "
  >
    <div class="header" style="">
      <p>{{ homeinfo.home_title }}</p>
      <div class="header_icon">
        <subscript @click="clickslide" />
      </div>
    </div>
    <div style="position: relative; background: rgb(242, 243, 245)">
      <!-- 左边的推荐文章页  -->
      <div
        style="
          position: sticky;
          top: 90px;
          left: 200px;
          background-color: white;
        "
      >
        <div
          class="box_blogger_introduction"
          style="position: absolute; left: 100px"
        >
          <div
            style="
              z-index: 100000;
              padding: 10px;
              display: flex;
              justify-content: center;
            "
          >
            <img
              :src="homeinfo.home_avanturl"
              style="border-radius: 50%"
              width="90"
            />
          </div>
          <div class="blogger_introduction">
            <h2
              style="
                display: flex;
                justify-content: center;
                color: black;
                margin-top: 10px;
              "
            >
              {{ homeinfo.home_name || "Mr_ze" }}
            </h2>
            <br />
            <p class="blogger_introduction_statistics">
              <a>文章：{{ homeinfo.home_articleNub || "0" }}</a>
              <a
                >标签：<router-link
                  style="color: #fe9501; font-size: 17px; text-decoration: none"
                  to="/tag"
                  >{{ tagsnub.data.data.length || "0" }}</router-link
                ></a
              >
              <a>收藏：{{ homeinfo.home_collect || "0" }}</a>
              <br />
            </p>
            <a style="display: flex; justify-content: center; margin-top: 10px"
              >个性签名:一条闲鱼</a
            >
          </div>
        </div>
      </div>
      <div>
        <!--  导航栏 -->
        <div
          v-if="showNavbar"
          class="navbar"
          style="position: fixed; width: 100%; top: 0; z-index: 999999999999999"
        >
          <Nav />
        </div>
      </div>
      <!--  个人主页  -->
      <div style="position: absolute; right: 80px; top: 60px"></div>
      <!--   文章   -->
      <div style="display: flex; justify-content: center">
        <div id="box_article" class="box_article" style="position: relative">
          <div
            v-for="(item, index) in article"
            :id="`article_id_${item.article_id}`"
            :key="index"
            class="box_article_style"
          >
            <div>
              <h6
                style="cursor: pointer"
                @click="expansion(item.article_id)"
                v-html="item.article_title"
              ></h6>
            </div>
            <div style="margin-top: 11px" class="box_article_text">
              <p
                class="black"
                style="font-size: 10px; line-height: 18px"
                v-html="item.article_content"
              ></p>
            </div>
            <div style="color: white; font-size: 10px; margin-top: 8px">
              <a>{{
                "时间：" + utils.formatDate(item.creat_time) ||
                "时间：" + utils.formatDate(new Date().getDate())
              }}</a>
              <a style="margin-left: 10px" v-show="item.article_label"
                >标签：<a
                  href="javascript:;"
                  @click="clickTag(item.article_label)"
                  style="color: aqua; text-decoration: none"
                >
                  {{ item.article_label }}</a
                ></a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-backtop :bottom="100" :right="100" />
  </div>
</template>

<script lang="ts" setup>
import Subscript from "@/assets/icon/subscript.vue";
import { ElNotification } from "element-plus";
import { onMounted, reactive, Ref, ref, watch } from "vue";
import router from "@/router";
import utils from "../utils/index";
import serve from "../api/api";
import Nav from "@/views/hook/nav.vue";

let scrollPosition = ref();
  const showNavbar = ref(false);
  const bodyRef: any = ref(null);
  const width_position = ref();
  const activeName = ref("first");

  onMounted(() => {
    let browser_height = getComputedStyle(bodyRef.value).height.replace(
      /\D+/g,
      ""
    );
    let browser_width = getComputedStyle(bodyRef.value).height.replace(
      /\D+/g,
      ""
    );
    localStorage.setItem("browser_width", browser_width);
    localStorage.setItem("browser_height", browser_height);
    ElNotification({
      title: "注意",
      message:
        "本博客只适配了电脑端的 google 浏览器！其他的浏览器若出现页面混乱请更换浏览器！",
      type: "warning",
      position: "bottom-right",
    });
  });

  // 获取屏幕的高度
  window.addEventListener("scroll", function () {
    scrollPosition.value = window.scrollY; // 获取当前滚动到的距离
    width_position.value = window.screenX;
    console.log(window.screenX);
  });
  console.log(localStorage.browser_height);
  // 获取body高度
  watch(
    () => scrollPosition.value,
    (newval, oldval) => {
      if (Number(newval) > Number(localStorage.browser_height) - 25) {
        showNavbar.value = true;
      } else if (Number(newval) < 777) {
        showNavbar.value = false;
      }
    }
  );
  watch(
    () => width_position.value,
    (newval, oldval) => {
      console.log(newval, oldval);
    }
  );
  const state = reactive({
    textOver: ref(false), // 超过2行
    foldBtn: ref(false), // 按钮默认显示缩起
  });
  // 路由跳转
  const expansion = (full_text: number) => {
    router.push({ path: "/article", query: { id: full_text } });
  };

  //文章API
  const article: any = ref([]);
  const { data } = await serve.home_article();
  article.value = data.data;
  console.log(article.value);

  //主页信息API
  const homeinfo: any = ref([]);
  let home_info = await serve.home_info();
  homeinfo.value = home_info.data?.data[0];

  // 主页导航栏信息
  const homenav: any = ref([]);
  let home_nav = await serve.home_nav();
  homenav.value = home_nav.data.data;
  let tagsnub = await serve.article_Num();

  const clickslide = () => {
    // @ts-ignore: Object is possibly 'null'.
    documentsha
      .getElementById("box_article")
      .scrollIntoView({ behavior: "smooth" });
  };

  const clickTag = (content: string) => {
    router.push({ path: "/articleTag", query: { c: content } });
  };

  const nav: Ref<nav[]> = ref([]);
  const openUrl = (url: string) => {
    window.open(url);
  };

  interface article {
    code: string;
    msg: string;
    data: [
      {
        id: string;
        Last_revision_time: string;
        article_content: string;
        article_id: string;
        article_label: string;
        article_title: string;
        creat_time: string;
      }
    ];
  }

  interface nav {
    code: string;
    msg: string;
    data: [
      {
        id: number;
        nav_background: string;
        nav_name: string;
        nav_remarks: string;
        nav_textColor: string;
        nav_url: string;
      }
    ];
  }
</script>

<style lang="css" scoped>
  * {
    color: black;
  }
  .black {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    color: black;
  }

  >>> .black > h1 {
    display: none;
  }
  >>> .black > pre {
    display: none;
  }

  .header {
    /*background: url('../assets/---4k_c6652e7c9b7904d0.jpg') ;*/

    height: 100vh;
    align-items: center;
    display: flex;
    justify-content: center;
  }

  .header p {
    width: 300px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    background-color: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    box-shadow: 0 0 5px #333;
    font-size: 30px;
  }

  .header_icon {
    text-align: center;
    line-height: 47px;
    position: absolute;
    bottom: 0;
    animation: bounce-down 3s linear infinite;
  }

  @keyframes bounce-down {
    0% {
      transform: translate(0px);
    }
    25% {
      transform: translate(0px, 10px);
    }
    50% {
      transform: translate(0px, 0px);
    }
    75% {
      transform: translate(0px, 10px);
    }
    100% {
      transform: translate(0px, 0px);
    }
  }

  .header_icon:hover {
    cursor: pointer;
  }

  .box_article {
    text-indent: 15px;
  }

  .box_article_style {
    border-radius: 20px;
    width: 500px;
    max-height: 150px;
    overflow: hidden;
    padding: 25px;
    background: white;
    color: black;
    margin: 30px 0;
  }
  #vue {
    display: none;
  }
  .box_blogger_introduction {
    background-color: white;
    margin-top: 30px;
    margin-left: 40px;
    //box-shadow: rgb(136 136 136 / 48%) 0px 0px 10px;
    width: 250px;
    border-radius: 20px;
    height: 280px;
  }

  .blogger_introduction_statistics {
    display: flex;
    justify-content: space-around;
  }

  .box_article_height {
    height: auto;
  }

  >>> .el-tabs__nav-scroll {
    display: flex !important;
    justify-content: center !important;
  }
  .arcite_Recommend :hover {
    color: violet;
  }
</style>
