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
      <div id="box_article" class="box_article">
        <div v-for="item in article" ref="content" class="box_article_style">
          <a>{{ item.article_title || "标题" }}</a>
          <p style="height: 60px;">{{ item.article_content || "正文" }}</p>
          <!--                <p style="height: 60px;">{{  introduce || "正文" }}</p>-->
          <div style="color:white;font-size: 10px">
            <a>{{ "时间：" + item.creat_time || "时间：" + new Date().getDate() }}</a>
            <a style="margin-left: 10px">标签：{{ item.nav_collect }}</a>
            <a v-if="item.article_content" style="float: right;color: lightblue" @click="isexpansion">
              <el-icon>
                <ArrowDownBold/>
              </el-icon>
              点击展开
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
import {nextTick, reactive, Ref, ref} from "vue";
import axios from "axios";
import Link from "@/assets/icon/link.vue";
import {ArrowDownBold} from "@element-plus/icons-vue";

const isexpansion = ref(true)

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
const state = reactive({
  showTotal: false, // 是否展示所有文本内容
  showExchangeButton: false, // 是否显示展开收起按钮
  showLine: 3 // 显示的文本行数
})
const introduce = ref(' ') // 初始化文本
const desc = ref(null) // 文本组件


/** 文本的操作方法 */
const txtMethods = {
  /** 将HTML文本转化为文字文本 */
  toText: (HTML) => {
    var input = HTML
    return input.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi, '').replace(/<[^>]+?>/g, '').replace(/\s+/g, ' ').replace(/ /g, ' ').replace(/>/g, ' ')
  },

  /** 截取三行文本 */
  txtDec: () => {
    if (!desc.value) {
      return
    }
    if (introduce.value) { // 对页面中的元素重新赋值，否则会采用之前裁剪过的文本
      desc.value.innerHTML = introduce.value
    } else {
      return
    }

    nextTick(() => {
      let rows = desc.value.getClientRects().length // 文本行数
      let txt = introduce.value // 文本
      // 文本为3行时的字数长度
      let tl = 0 // eslint-disable-line no-unused-vars
      if (rows < state.showLine) { // 未超出行数，返回
        desc.value.innerHTML = introduce.value
        state.seriesInfo.introduction.length - introduce.value.length > 10 ? state.showExchangeButton = true : state.showExchangeButton = false // html元素大于30个字符，显示展开按钮
        return
      }

      // 数据量大时速度太慢，需优化(二分法？)
      while (rows > state.showLine) { // 超出，遍历文字并进行截取，直到文本小于三行
        let step = 1 // 末尾扣除的字数
        if (/<br\/>$/.test(txt)) { // 回退的时候，如果碰到换行要整体替换
          step = 5
        }
        txt = txt.slice(0, -step) // 截取
        desc.value.innerHTML = txt
        rows = desc.value.getClientRects().length
        tl += step
      }
      if (txt.charCodeAt(txt.length - 1) < 255) { // 文字末尾留三个字符的空并加省略号(中文字符和英文字符留空大小不同，中文-3，英文-8)
        desc.value.innerHTML = txt.slice(0, -8) + '...'
      } else {
        desc.value.innerHTML = txt.slice(0, -3) + '...'
      }
      state.showExchangeButton = true // 显示展开收起按钮
      state.exchangeButton = true
    })
  }
}

const debounce = (fn, wait) => {
  let timer2 = null
  return function () {
    if (timer2 !== null) {
      clearTimeout(timer2)
    }
    timer2 = setTimeout(fn, wait)
  }
}

/** 点击展开/收起按钮 */
const clickTotal = () => {
  state.showTotal = !state.showTotal
  // 页面数据过多时txtDec的循环块会运行一段时间，造成点击“收起”按钮时卡顿
  // 解决方法：在收起时为父元素增加max-height样式，达到隐藏效果
  // 解决失败：初步判断是vue的虚拟dom算法，不能立即更新元素样式，等到nextTick后才会更新
  !state.showTotal ? desc.value.parentNode.style['max-height'] = `${20 * state.showLine}px` : desc.value.parentNode.style['max-height'] = ''
  state.showTotal ? desc.value.innerHTML = introduce.value : txtMethods.txtDec()
}
/** 窗口尺寸改变时重新计算文本的显示长度：使用防抖函数实现 */
window.addEventListener('resize', debounce(txtMethods.txtDec, 200))


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
</style>
