<template>
  <div class="back">
    <label>背景の名前</label>
    <el-select v-model="act.name" placeholder="背景を選択">
      <el-option v-for="bg in backgrounds" :key="bg" :value="bg"></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: "Say",
  props: {
    act: Object,
    backgrounds: Array
  }
};
</script>

<style lang="scss"></style>
