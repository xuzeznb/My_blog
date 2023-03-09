<template>
  <div>
    <div style="width: 40px; float: left; margin-left: 15px">
      <el-icon :size="22">
        <Expand />
      </el-icon>
    </div>
    <div class="nav_header">
      <el-page-header @back="onBack">
        <template #breadcrumb>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">
              博客主页
            </el-breadcrumb-item>
            <el-breadcrumb-item
              ><a :to="{ path: '/backstage/home' }"
                >后台主页</a
              ></el-breadcrumb-item
            >
            <el-breadcrumb-item>{{ router_name }}</el-breadcrumb-item>
          </el-breadcrumb>
        </template>
        <template #content>
          <div class="flex items-center">
            <el-avatar :size="32" :src="my_Info.User_avantUrl" class="mr-3" />
            <span class="text-large font-600 mr-3" style="padding-left: 5px">{{
              my_Info.User_name
            }}</span>
            <el-tag style="margin-left: 5px">{{ "博主" }}</el-tag>
          </div>
        </template>
        <template #extra>
          <div class="flex items-center">
            <el-button
              v-show="router_name === '个人信息管理'"
              size="large"
              type="warning"
              @click="dialogFormVisible = true"
            >
              修改个人信息
            </el-button>
            <el-button
              class="ml-2"
              size="large"
              type="primary"
              @click="exitlogin"
              >退出登录</el-button
            >
          </div>
        </template>
        <div>
          <el-dialog v-model="dialogFormVisible" title="修改个人信息">
            <el-form :model="my_Info">
              <el-form-item :label-width="formLabelWidth" label="名称:">
                <el-input
                  v-model="my_Info.User_name"
                  autocomplete="off"
                  size="default"
                />
              </el-form-item>
              <el-form-item :label-width="formLabelWidth" label="用户名:">
                <el-input
                  v-model="my_Info.username"
                  autocomplete="off"
                  disabled
                  size="default"
                />
              </el-form-item>

              <el-form-item :label-width="formLabelWidth" label="头像:">
                <el-input
                  v-model="my_Info.User_avantUrl"
                  autocomplete="off"
                  size="default"
                />
              </el-form-item>

              <el-form-item :label-width="formLabelWidth" label="个性标签:">
                <el-input
                  v-model="my_Info.user_signature"
                  autocomplete="off"
                  size="default"
                />
              </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button size="large" @click="dialogFormVisible = false"
                  >退出</el-button
                >
                <el-button size="large" type="primary" @click="">
                  保存
                </el-button>
              </span>
            </template>
          </el-dialog>
        </div>
      </el-page-header>
    </div>
  </div>
</template>

<script lang="ts" setup>
import router from "@/router";
import {defineProps, reactive, ref, watch} from "vue";
import server from "@/api/api";
import {ElMessage, ElMessageBox} from "element-plus";
import {Expand} from "@element-plus/icons-vue";

const dialogFormVisible = ref(false);

  let prop = defineProps(["value"]);
  watch(
    () => prop.value,
    (newval) => {
      console.log(newval.dele_id);
      if (newval.dele_id) {
        ElMessageBox.confirm(`确定删除文章ID:${newval.dele_id}?`, "警告", {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
        })
          .then(() => {
            ElMessage({
              type: "success",
              message: "Delete completed",
            });
          })
          .catch(() => {
            ElMessage({
              type: "info",
              message: "Delete canceled",
            });
          });
      }
    }
  );

  const router_name = router.currentRoute.value.name;
  const formLabelWidth = "140px";
  const onBack = () => {
    console.log("0000");
  };
  const exitlogin = () => {
    localStorage.clear();
    router.push("/");
  };

  const my_Info: any = ref({});
  let myinfo = await server.My_Info().then();
  my_Info.value = myinfo.data;

  const emit = defineEmits(["clickChild"]);
  emit("clickChild", ...[my_Info.value.User_name, my_Info.value.UserId]);

  const form = reactive({
    name: "",
    region: "",
    date1: "",
    date2: "",
    delivery: false,
    type: [],
    resource: "",
    desc: "",
  });
</script>
<style scoped>
  .nav_header {
    margin: 15px 15px 0 15px;
  }

  >>> .el-page-header__back {
    display: none !important;
  }

  >>> .el-breadcrumb {
    line-height: 22px;
  }

  >>> .el-page-header__icon {
    display: none !important;
  }

  >>> .el-divider--vertical {
    display: none !important;
  }
</style>
