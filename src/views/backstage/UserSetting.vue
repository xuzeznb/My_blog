<template>
  <div class="nav">
    <Hooks style="padding: 10px" />
    <div style="padding: 15px 15px; width: 1100px">
      <el-descriptions :column="3" class="mt-4" size="small">
        <el-descriptions-item label="用户名:">{{
          my_Info.username
        }}</el-descriptions-item>
        <el-descriptions-item label="用户ID:">{{
          my_Info.UserId
        }}</el-descriptions-item>
        <el-descriptions-item label="联系电话:"
          >18100000000</el-descriptions-item
        >
        <el-descriptions-item label="个性签名:">{{
          my_Info.user_signature || "无"
        }}</el-descriptions-item>
        <el-descriptions-item label="城市:">Shenyang</el-descriptions-item>
        <el-descriptions-item label="用户标签:">
          <el-tag size="small">School</el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";

import type { UploadFile } from "element-plus";
import server from "@/api/api";
import router from "@/router";
import Hooks from "@/views/hook/hooks.vue";

const dialogImageUrl = ref("");
  const disabled = ref(false);
  const my_Info: any = ref({});
  let myinfo = await server.My_Info().then();
  my_Info.value = myinfo.data;
  const handleDownload = (file: UploadFile) => {
    console.log(file);
  };
  const router_name = router.currentRoute.value.name;

  const gridData = [
    {
      date: "2016-05-02",
      name: "John Smith",
      address: "No.1518,  Jinshajiang Road, Putuo District",
    },
    {
      date: "2016-05-04",
      name: "John Smith",
      address: "No.1518,  Jinshajiang Road, Putuo District",
    },
    {
      date: "2016-05-01",
      name: "John Smith",
      address: "No.1518,  Jinshajiang Road, Putuo District",
    },
    {
      date: "2016-05-03",
      name: "John Smith",
      address: "No.1518,  Jinshajiang Road, Putuo District",
    },
  ];
</script>
<style scoped>
  .el-button--text {
    margin-right: 15px;
  }

  .el-select {
    width: 300px;
  }

  .el-input {
    width: 300px;
  }

  .dialog-footer button:first-child {
    margin-right: 10px;
  }

  .navigation {
    padding: 25px;
    width: 100%;
  }

  .navigation > h3 {
    text-align: center;
    margin-bottom: 20px;
  }

  .navigation > a {
    font-size: 10px;
  }

  >>> .el-page-header__back {
    display: none !important;
  }

  >>> .el-page-header__icon {
    display: none !important;
  }

  >>> .el-divider--vertical {
    display: none !important;
  }
</style>
