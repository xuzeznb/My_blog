<template>
  <div class="tags">
    <div>
      <M_hooks />
    </div>
    <div style="display: flex; justify-content: center; margin-top: 30px">
      <div
        style="
          background: white;
          font-size: 10px;
          width: 300px;
          border-radius: 2px;
          padding: 10px;
        "
      >
        <p style="margin-left: 5px">分类</p>
        <br />
        <div style="width: 260px">
          <a style="margin-left: 20px; float: left">vue</a>
          <a style="float: right">1</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import M_hooks from "@/views/Mobile/m_hooks";

// http://127.0.0.1:3000/api/tags

  // await server.Tags()
</script>
<style scoped>
  .tags {
    background: rgb(237, 239, 245);
    height: 100vh;
  }
</style>
