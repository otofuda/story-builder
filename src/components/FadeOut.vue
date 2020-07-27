<template>
  <div class="fade-out">
    <label>遷移秒数</label>
    <el-input-number
      v-model="act.duration"
      :min="0.01"
      :precision="2"
      :step="0.1"
    ></el-input-number>
  </div>
</template>

<script>
export default {
  name: "FadeOut",
  props: {
    act: Object
  }
};
</script>

<style lang="scss"></style>
