<template>
  <div
    v-lazy:backhround-image="home_info.home_background"
    :style="{
      background: 'no-repeat',
      'background-size': 'cover',
      '-moz-background-size': ' cover',
      '-webkit-background-size': 'cover',
    }"
    class="login"
  >
    <div class="login_page">
      <div class="login_page_window">
        <div style="margin-bottom: 20px">
          <h2>欢迎回来！</h2>
          <div>
            <a style="color: rgba(155, 150, 150, 0.65); font-size: 12px"
              >还没注册吧!</a
            >
            <a
              href="JavaScript:;"
              style="
                color: black;
                font-size: 12px;
                text-decoration: none;
                margin-left: 10px;
              "
            >
              点击注册！</a
            >
          </div>
        </div>
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item>
            <input v-model="username" class="nameinput" placeholder="用户名" />
          </el-form-item>
          <br />
          <el-form-item>
            <input
              v-model="password"
              class="nameinput"
              placeholder="密码"
              type="password"
            />
          </el-form-item>
          <br />
          <el-form-item>
            <el-button v-show="onlogin" style="width: 200px" type="primary" @click="onSubmit()"
              >登录</el-button
            >
            <el-button v-show="!onlogin" loading style="width: 200px" type="primary">登录中</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="block text-center" style="width: 300px">
        <span class="demonstration"></span>
        <el-carousel height="300px">
          <el-carousel-item v-for="item in imgs" :key="item">
            <img
              v-lazy="item"
              style="
                width: 100%;
                border-radius: 30px;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
              "
            />
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {ref} from "vue";
import http from "@/api/api";
import utils from "@/utils";
import {ElMessage} from "element-plus";
import router from "@/router";

const username: any = utils.debounceRef("");
  const password: any = utils.debounceRef("");
const onlogin = ref(true)
  //主页信息API
  const home_info = ref({});
  let homeInfo = await http.home_info();
  home_info.value = homeInfo.data?.data[0];

  let imgs = [
    "http://101.42.34.131:3000/images/001.webp",
    "http://101.42.34.131:3000/images/002.webp",
    "http://101.42.34.131:3000/images/003.webp",
  ];

  //　登录信息
  const login_info: any = ref([]);
  console.log(login_info.value);
  const onSubmit = async () => {
    onlogin.value = false
    setTimeout(async () => {
      let loginInfo = await http.login_info({
        username: username.value,
        password: password.value,
      });
      login_info.value = loginInfo.data.data;
      localStorage.setItem("token", login_info.value.token);
      if (loginInfo.data.code == 200) {
        onlogin.value = false
        await router.push("/backstage")
        location.reload();
        ElMessage({
          type: "success",
          message: "登陆成功！",
        });
        onlogin.value = false
      } else {
        ElMessage({
          type: "err",
          message: "账号或密码错误！！",
        });
      }
    }, 3000)
  };
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 230px;
    margin: 0;
    text-align: center;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: white;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: white;
  }

  .login {
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .login_page {
    width: 650px;
    height: 350px;
    border-radius: 20px;
    padding: 10px;
    background-size: 8px 8px;
    display: flex;
    align-items: center;
    background: white;
    filter: alpha(Opacity=90);
    -moz-opacity: 1;
    opacity: 1;
  }

  .login_page_window {
    margin-left: 50px;
  }

  .nameinput {
    height: 30px;
    width: 200px;
    border-top: none;
    border-bottom: 1px rgba(225, 213, 213, 0.98) solid;
    border-right: none;
    border-left: none;
    outline: none;
  }
</style>
