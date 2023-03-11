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
                scope.row.file_size / 1024 / 1024
              }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="Operations">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
              >Edit</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >Delete</el-button
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
import {Timer} from "@element-plus/icons-vue";

interface User {
    date: string;
    name: string;
    address: string;
  }

  const handleEdit = (index: number, row: User) => {
    console.log(index, row);
  };
  const handleDelete = (index: number, row: User) => {
    console.log(index, row);
  };

  const qyery_file = await server.qyrey_File();
  const file = qyery_file.data.data;

  const tableData: User[] = [
    {
      date: "2016-05-03",
      name: "Tom",
      address: "No. 189, Grove St, Los Angeles",
    },
    {
      date: "2016-05-02",
      name: "Tom",
      address: "No. 189, Grove St, Los Angeles",
    },
    {
      date: "2016-05-04",
      name: "Tom",
      address: "No. 189, Grove St, Los Angeles",
    },
    {
      date: "2016-05-01",
      name: "Tom",
      address: "No. 189, Grove St, Los Angeles",
    },
  ];
</script>
