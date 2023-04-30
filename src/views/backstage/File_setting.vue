import Hooks from '../hooks.vue';

<template>
  <div>
    <div style="width: 1100px">
      <Hooks />
    </div>
    <div style="margin: 10px 10px">
      <div style="width: 1070px">
        <el-button size="lang" type="primary">上传文件</el-button>
        <el-button size="lang" style="float: right" type="primary"
          >上传历史</el-button
        >
      </div>
      <el-table :data="file" style="margin-top: 10px">
        <el-table-column label="id" width="180">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span style="margin-left: 10px">{{ scope.row.id }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="文件名称" width="320">
          <template #default="scope">
            <el-popover
              effect="light"
              placement="top"
              trigger="hover"
              width="auto"
            >
              <template #default>
                <div>name: {{ scope.row.file_name }}</div>
                <div>address: {{ scope.row.file_Url }}</div>
              </template>
              <template #reference>
                <el-tag>{{ scope.row.file_name }}</el-tag>
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="文件大小" width="320">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-icon><timer /></el-icon>
              <span style="margin-left: 10px">{{
                (scope.row.file_size / 1024 / 1024 + "MB").slice(0, 4) + "MB"
              }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="Operations">
          <template #default="scope">
            <el-button
              size="default"
              @click="handleEdit(scope.$index, scope.row)"
              >预览</el-button
            >
            <el-button
              size="default"
              type="danger"
              @click="handleDelete(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Hooks from "../hook/hooks.vue";
import server from "@/api/api";
import { Timer } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";

interface User {
    date: string;
    name: string;
    address: string;
  }

  const handleEdit = (index: number, row: User) => {
    console.log(index, row);
  };
  //TODO:假删除
  const handleDelete = (id) => {
    // TODO:删除文件
    ElMessageBox.confirm(`您确定要删除id为 ${id} 的文件?`, "提示:", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(() => {
        ElMessage({
          type: "success",
          message: "删除成功！",
        });
      })
      .catch(() => {
        ElMessage({
          type: "info",
          message: "取消删除！",
        });
      });
  };

  const qyery_file = await server.qyrey_File();
  const file = qyery_file.data.data;
</script>
