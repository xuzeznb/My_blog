<template>
  <Suspense>
    <!-- 主要内容 -->
    <template v-show="isshow" #default>
      <router-view />
    </template>
    <template #fallback> 网页加载失败！请耐心等待网页修复！ </template>
  </Suspense>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import router from "@/router";
import { ElLoading } from "element-plus";

const isshow = ref(false);
  const _isMoble = () => {
    let flag = navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    );
    return flag;
  };
  onMounted(() => {
    const loading = ElLoading.service({
      lock: true,
      text: "Loading",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.9)",
    });
    if (sessionStorage.getItem("isCached")) {
      //如果有缓存，直接结束loading样式
      //其他操作
      loading.close();
      isshow.value = true;
    } else {
      isshow.value = false;
      //模拟异步请求数据
      setTimeout(() => {
        //请求完成
        loading.close();
        isshow.value = true;
        sessionStorage.setItem("isCached", true);
        //其他操作
      }, 2000);
    }
  });
  onMounted(() => {
    if (_isMoble()) {
      router.push({
        path: "/m_home",
      });
    }
  });
</script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
  }

  #loader-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 999999;
  }
  #loader {
    display: block;
    position: relative;
    left: 50%;
    top: 40%;
    z-index: 1001;
    width: 90px;
    height: 90px;
    margin: -45px 0 0 -45px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: #fe9501;
    -webkit-animation: spin 2s linear infinite;
    -ms-animation: spin 2s linear infinite;
    -moz-animation: spin 2s linear infinite;
    -o-animation: spin 2s linear infinite;
    animation: spin 2s linear infinite;
  }
  #loader:before {
    content: "";
    position: absolute;
    top: 5px;
    left: 5px;
    right: 5px;
    bottom: 5px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: #fe9501;
    -webkit-animation: spin 3s linear infinite;
    -moz-animation: spin 3s linear infinite;
    -o-animation: spin 3s linear infinite;
    -ms-animation: spin 3s linear infinite;
    animation: spin 3s linear infinite;
  }
  #loader:after {
    content: "";
    position: absolute;
    top: 15px;
    left: 15px;
    right: 15px;
    bottom: 15px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: #fe9501;
    -moz-animation: spin 1.5s linear infinite;
    -o-animation: spin 1.5s linear infinite;
    -ms-animation: spin 1.5s linear infinite;
    -webkit-animation: spin 1.5s linear infinite;
    animation: spin 1.5s linear infinite;
  }
  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
</style>
