<!--主页-->
<template>
  <div
      id="img"
      v-loading.fullscreen.lock="fullscreenLoading"
    v-lazy:backhround-image="homeinfo.home_background"
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
    <div style="background: rgb(26, 28, 32)">
      <div class="box" style="">
        <div class="box_center">
          <div
            v-for="item in homenav"
            :key="item.id"
            :style="{ background: item.nav_background }"
            class="box_introduction"
            style="float: left; margin-left: 30px"
          >
            <div class="box_text">
              <p>
                <a
                  :style="{ color: item.nav_textColor }"
                  @click="openUrl(item.nav_url)"
                  >{{ item.nav_name
                  }}<a style="margin-left: 10px; margin-top: 5px">
                    <Link />
                  </a> </a
                ><br /><a
                  :style="{ color: item.nav_textColor }"
                  style="margin-top: 5px; font-size: 12px"
                  >{{ item.nav_remarks }}</a
                >
              </p>
            </div>
          </div>
        </div>
      </div>
      <!--   文章   -->
      <div style="display: flex; justify-content: center">
        <div id="box_article" class="box_article">
          <div
            v-for="(item, index) in article"
            :id="`article_id_${item.article_id}`"
            :key="index"
            class="box_article_style"
          >
            <div>
              <h6 style="cursor: pointer" @click="expansion(item.article_id)"
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
        <div class="box_blogger_introduction">
          <div
            class="box_blogger_style"
            style="margin-top: 20px; display: flex; justify-content: center"
          >
            <img
              :src="homeinfo.home_avanturl"
              style="border-radius: 50%"
              width="90"
            />
          </div>
          <div class="blogger_introduction">
            <p style="
                display: flex;
                justify-content: center;
                color: white;
                margin-top: 10px;
              ">
              {{ homeinfo.home_name || "Mr_ze" }}
            </p>
            <br />
            <p class="blogger_introduction_statistics">
              <a>文章：{{ homeinfo.home_articleNub || "0" }}</a>
              <a>标签：<router-link style="color: #fe9501;font-size: 17px;text-decoration: none" to="/tag">{{  tagsnub.data.data.length|| "0" }}</router-link></a>
              <a>收藏：{{ homeinfo.home_collect || "0" }}</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Subscript from "@/assets/icon/subscript.vue";
import {nextTick, reactive, Ref, ref} from "vue";
import Link from "@/assets/icon/link.vue";
import router from "@/router";
import utils from "../utils/index";
import serve from "../api/api";
import {ElLoading} from "element-plus";

const state = reactive({
    textOver: ref(false), // 超过2行
    foldBtn: ref(false), // 按钮默认显示缩起
  });

// 判断用户是否第一次打开网页，若第一次打开就增加遮罩层，防止用户体验不好
if(window.name == ""){
  window.name = "loaded";//首次进入时给window.name赋一个固定值
  nextTick(()=>{
    const loading = ElLoading.service({
      lock: true,
      text: '加载中....',
      background: 'rgb(255,255,255)',
    })
    setTimeout(() => {
      loading.close()
    }, 2000)
  })
}else{
  nextTick(()=>{
    const loading = ElLoading.service({
      lock: true,
      text: '加载中....',
      background: 'rgb(255,255,255)',
    })
    setTimeout(() => {
      loading.close()
    }, 500)
  })
}

  // 路由跳转
  const expansion = (full_text: number) => {
    router.push({ path: "/article", query: { id: full_text } });
  };

  //文章API
  const article: any = ref([]);
  const { data } = await serve.home_article();
  article.value = data.data;

  //主页信息API
  const homeinfo: any = ref([]);
  let home_info = await serve.home_info();
  homeinfo.value = home_info.data?.data[0];

  // 主页导航栏信息
  const homenav: any = ref([]);
  let home_nav = await serve.home_nav();
  homenav.value = home_nav.data.data;
  let  tagsnub = await serve.article_Num();

  const clickslide = () => {
    // @ts-ignore: Object is possibly 'null'.
    document
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
    color: white;
  }

  .black {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    color: white;
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

  .box_introduction {
    width: 150px;
    height: 100px;
    background: #42b983;
    margin-top: 15px;
    border-radius: 10%;
  }

  .box_introduction:hover {
    cursor: pointer;
  }

  .header_icon:hover {
    cursor: pointer;
  }

  .box_text {
    margin-top: 10px;
    height: 70px;
    align-items: center;
    padding: 0 15px;
    display: flex;
    justify-content: left;
  }

  .box_center {
    display: flex;
    justify-content: center;
  }

  .box_article {
    text-indent: 15px;
  }

  .box_article_style {
    border-radius: 20px;
    width: 450px;
    padding: 15px;
    background: black;
    color: white;
    margin: 30px 0;
  }
  #vue {
    display: none;
  }
  .box_blogger_introduction {
    margin-top: 30px;
    margin-left: 40px;
    width: 250px;
    border-radius: 20px;
    height: 280px;
    background: black;
  }

  .blogger_introduction_statistics {
    display: flex;
    justify-content: space-around;
  }

  .showEllipsis {
  }

  .box_article_height {
    height: auto;
  }
</style>
