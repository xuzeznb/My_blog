<template>
  <div >
    <div style="padding: 20px">
      <Hooks style="padding: 1opx; width: 1100px" />
      <div>
        <div style="display:flex;font-size:15px;padding: 10px;height: 50px">
          <el-input v-model="add_labels" placeholder="请添加您的标签！" style="width: 200px;height: 40px;margin-left: 10px "></el-input>
          <el-button plain style="width: 50px;height: 40px;margin-left: 10px " type="primary" @click="submit_tags">提交</el-button>
        </div>
        <el-table :data="all_Label.data" style="width: 100%;margin-top: 10px">
          <el-table-column label="id" prop="tag_id" width="180" />
          <el-table-column label="标签名称" prop="tag_name" width="180" />
          <el-table-column label="操作">
            <template #default="scope">
              <el-button type="success" @click="del_label(scope.row.tag_id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Hooks from "@/views/hook/hooks";
import { ref } from "vue";
import http from "@/api/api";
import { ElMessage } from "element-plus";

const all_Label = ref()
  const add_labels = ref()

  // 提交标签
  const submit_tags = async () => {
   let res  =  await http.add_tag({ tag_name:add_labels.value })
    if (res.data.code === 200){
      ElMessage.success(res.data.msg)
      add_labels.value = ''
      let {data} = await http.all_label()
      all_Label.value = data
    }else{
      ElMessage.error(res.data.msg)
    }
  }
  const del_label = async (id: number) => {
    let {data} = await http.del_label(id)
    if (data.code === 200 ){
      ElMessage.success("删除成功！")
      let {data} = await http.all_label()
      all_Label.value = data
    }else{
      ElMessage.error("删除失败！")
    }

  }

  // 查询所有标签
  let {data} = await http.all_label()
  if (data.code != 200){
    ElMessage.error('获取失败！')
  }
  all_Label.value = data

  const tableData = [
    {
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-04',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-01',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
  ]

</script>
