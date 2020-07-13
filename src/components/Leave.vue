<template>
  <div class="leave">
    <label>退場するキャラ</label>
    <el-select
      v-model="act.name"
      placeholder="キャラを選択"
      filterable
      allow-create
    >
      <el-option v-for="c in characters" :key="c" :value="c"> </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: "Leave",
  props: {
    act: Object,
    characters: Array
  }
};
</script>

<style lang="scss"></style>
