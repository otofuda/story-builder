<template>
  <el-card class="back">
    <div slot="header" class="clearfix">
      <strong>背景変更</strong>
      <el-button
        style="float: right"
        size="mini"
        type="danger"
        icon="el-icon-delete"
      ></el-button>
    </div>
    <i class="el-icon-picture"></i>
    <el-select v-model="act.name" placeholder="背景を選択">
      <el-option v-for="bg in backgrounds" :key="bg" :value="bg"> </el-option>
    </el-select>
    <i class="el-icon-chat-dot-square"></i>
  </el-card>
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

<style lang="scss">
.el-card__header {
  background: linear-gradient(90deg, #4b6cb7 0%, #182848 100%);
}
</style>
