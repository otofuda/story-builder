<template>
  <div class="say">
    <el-select
      v-model="act.name"
      placeholder="キャラを選択"
      filterable
      allow-create
    >
      <el-option v-for="c in characters" :key="c" :value="c"></el-option>
    </el-select>
    <el-select
      placeholder="表情差分"
      style="width: 120px; margin-left: 8px"
      disabled
    >
      <el-option value="0"></el-option>
    </el-select>
    <el-select
      placeholder="衣装差分"
      style="width: 120px; margin-left: 8px"
      disabled
    >
      <el-option value="0"></el-option>
    </el-select>
    <el-input
      type="textarea"
      :rows="2"
      placeholder="ここにセリフを入力"
      v-model="act.body"
      style="margin-top: 8px"
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
