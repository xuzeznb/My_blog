<!--主页-->
<template>
  <div style="background: rgb(26, 28, 32);">
    <div class="header">
      <p>阿泽的学习日记</p>
      <div class="header_icon">
        <subscript @click="clickslide"/>
      </div>
    </div>
    <div class="box">
      <div class="box_center">
        <div v-for="item in nav" :key="item.id" :style="{background:item.nav_background}" class="box_introduction"
             style="float: left;margin-left:30px">
          <div class="box_text">
            <p><a :style="{color:item.nav_textColor }" @click="openUrl(item.nav_url)">{{ item.nav_name }}<a
                style="margin-left: 10px;margin-top: 5px">
              <Link/>
            </a>
            </a><br/><a :style="{color:item.nav_textColor}" style="margin-top: 5px;font-size: 12px">{{
                item.nav_remarks
              }}</a></p>
          </div>
        </div>
      </div>
    </div>
    <div style="display:flex;justify-content: center">
      <div id="box_article"  class="box_article">
        <div v-for="item in article"  :id="`article_id_${item.article_id}`" :key="item.article_id" class="box_article_style">
          <a>{{ item.article_title || "标题" }}</a>
          <p :class="state.textOver && !state.foldBtn ? ' showEllipsis' : ''"  style="height: 60px;" >{{ item.article_content || "正文" }}</p>
          <div style="color:white;font-size: 10px">
            <a>{{ "时间：" + formatDate(item.creat_time) || "时间：" + formatDate(new Date().getDate()) }}</a>
            <a style="margin-left: 10px">标签：{{ item.nav_collect }}</a>
            <a v-if="item.article_content" v-show="!state.textOver" style="float: right;color: lightblue"   @click="expansion(item.article_id)">
              <el-icon>
                <ArrowDownBold/>
              </el-icon>
              点击展开
            </a>
            <a  v-show="state.textOver" style="float: right;color: lightblue" @click="state.foldBtn = !state.foldBtn">
              <el-icon>
                <ArrowDownBold/>
              </el-icon>
              点击收起
            </a>

          </div>
        </div>
      </div>
      <div class="box_blogger_introduction">
        <div class="box_blogger_style" style="margin-top: 20px;display: flex;justify-content: center; ">
          <img :src="homeinfo.home_avanturl" style=" border-radius: 50%" width="90">
        </div>
        <div class="blogger_introduction">
          <p style="display:flex; justify-content:center;color: white;margin-top: 10px; ">
            {{ homeinfo.home_name || 'Mr_ze' }}</p>
          <br/>
          <p class="blogger_introduction_statistics">
            <a>文章：{{ homeinfo.home_articleNub || '0' }}</a>
            <a>标签：{{ homeinfo.home_labelsNub || '0' }}</a>
            <a>收藏：{{ homeinfo.home_collect || '0' }}</a>
          </p>
        </div>
        <div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Subscript from "@/assets/icon/subscript.vue";
import {reactive, Ref, ref} from "vue";
import axios from "axios";
import Link from "@/assets/icon/link.vue";
import {ArrowDownBold} from "@element-plus/icons-vue";

const state = reactive({
  textOver: false, // 超过2行
  foldBtn: false // 按钮默认显示缩起
})

const expansion = (id:any) => {
  const domRef =  document.getElementById(`article_id_${id}`)
  console.log(domRef)
  if (domRef) {
    const height = window.getComputedStyle(domRef).height.replace("px", "")
    console.log(height)
    if (+height > 100) { // 40 -- 2行的高度
      state.textOver= true;
    } else {
      state.textOver= false;
    }
  }
}


interface article {
  code: string,
  msg: string
  data: [{
    id: string,
    Last_revision_time: string,
    article_content: string,
    article_id: string,
    article_label: string,
    article_title: string,
    creat_time: string,
  }]
}
interface nav {
  code: string,
  msg: string,
  data: [{
    id: number,
    nav_background: string,
    nav_name: string,
    nav_remarks: string,
    nav_textColor: string,
    nav_url: string
  }]
}

//  遍历数组取article里面的  article_content
const article: any = ref([])
const nav: Ref<nav[]> = ref([])
const homeinfo: Ref<{}> = ref({})
const openUrl = (url: string) => {
  window.open(url)
}


const clickslide = () => {
  // @ts-ignore: Object is possibly 'null'.
  document.getElementById("box_article").scrollIntoView({behavior: 'smooth'});
}

function formatDate(datetime) {
  let date = new Date(datetime); //datetime时间戳为13位毫秒级别,如为10位需乘1000
  let month = ("0" + (date.getMonth() + 1)).slice(-2)
  let sdate = ("0" + date.getDate()).slice(-2)
  let hour = ("0" + date.getHours()).slice(-2)
  let minute = ("0" + date.getMinutes()).slice(-2)
  let second = ("0" + date.getSeconds()).slice(-2)
  let thatDate = date.getFullYear() + "-" + month + "-" + sdate + " " + hour + ":" + minute + ":" + second;
  // 返回
  return thatDate;
}

// 文章展示
axios.get('http://101.42.34.131:3000/api/home/article').then(res => {
  if (res.data.code == 200) {
    for (let i = 0; res.data.data[i]; i++) {
      article.value.push(res.data.data[i])
    }
  }
})
// 导航栏信息
axios.get('http://101.42.34.131:3000/api/home/nav').then(res => {
  if (res.data.code == 200) {
    for (let i = 0; res.data.data[i]; i++) {
      nav.value.push(res.data.data[i])
    }
  }
})
axios.get('http://101.42.34.131:3000/api/home/info').then((res => {
  if (res.data.code == 200) {
    for (let i = 0; res.data.data[i]; i++) {
      homeinfo.value = (res.data.data[i])
    }
  }
}))
</script>

<style lang="css" scoped>
* {
  color: white;
}

.header {
  background: url('https://photo.qiuchao.net:10011/images/2020/06/21/---4k_c6652e7c9b7904d0.jpg') no-repeat;
  background-size: cover;
  -moz-background-size: cover;
  -webkit-background-size: cover;
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
  background-color: rgba(255, 255, 255, .2);
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
    transform: translate(0px)
  }
  25% {
    transform: translate(0px, 10px)
  }
  50% {
    transform: translate(0px, 0px)
  }
  75% {
    transform: translate(0px, 10px)
  }
  100% {
    transform: translate(0px, 0px)
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
  cursor: pointer
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
  overflow: hidden;
}


.box_article_style {
  border-radius: 20px;
  width: 450px;
  padding: 15px;
  height: 100px;
  background: black;
  color: white;
  margin:30px 0;
}

.box_blogger_introduction {
  margin-top: 30px;
  margin-left: 40px;
  width: 250px;
  border-radius: 20px;
  height: 280px;
  background: black;
}

.box_blogger_style {

}

.blogger_introduction_statistics {
  display: flex;
  justify-content: space-around;
}

.showEllipsis{
  text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;line-clamp: 2;-webkit-box-orient: vertical;
}
</style>
