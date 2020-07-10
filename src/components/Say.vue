<template>
  <el-card class="say">
    <div slot="header" class="clearfix">
      <strong>セリフ</strong>
      <el-button
        style="float: right"
        size="mini"
        type="danger"
        icon="el-icon-delete"
      ></el-button>
    </div>
    <i class="el-icon-user"></i>
    <el-select v-model="act.name" placeholder="キャラを選択">
      <el-option v-for="c in characters" :key="c" :value="c"> </el-option>
    </el-select>
    <i class="el-icon-chat-dot-square"></i>
  </el-card>
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

<style lang="scss">
.el-card__header {
  background: linear-gradient(90deg, #4b6cb7 0%, #182848 100%);
}
</style>
