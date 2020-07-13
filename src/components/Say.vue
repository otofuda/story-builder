<template>
  <div class="say">
    <label>キャラの名前</label>
    <el-select
      v-model="act.name"
      placeholder="キャラを選択"
      filterable
      allow-create
    >
      <el-option v-for="c in characters" :key="c" :value="c"> </el-option>
    </el-select>
    <el-divider></el-divider>
    <el-input
      type="textarea"
      :rows="2"
      placeholder="Please input"
      v-model="act.body"
    >
    </el-input>
  </div>
</template>

<script>
export default {
  name: "Say",
  props: {
    act: Object,
    characters: Array
  }
};
</script>

<style lang="scss"></style>
