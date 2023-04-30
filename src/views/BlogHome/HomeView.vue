<template>
  <div class="home">
    <Suspense>
      <template #default>
        <HelloWorld />
      </template>
    </Suspense>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

export default defineComponent({
    name: "HomeView",
    components: {
      HelloWorld,
    },
  });
</script>
