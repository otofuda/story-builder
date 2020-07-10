<template>
  <el-card class="fade-out">
    <div slot="header" class="clearfix">
      <strong>フェードアウト</strong>
      <el-button
        style="float: right"
        size="mini"
        type="danger"
        icon="el-icon-delete"
      ></el-button>
    </div>
    <i class="el-icon-timer"></i>
    <el-input-number
      v-model="act.duration"
      @change="update"
      :min="0.01"
      :precision="2"
      :step="0.1"
    ></el-input-number>
  </el-card>
</template>

<script>
export default {
  name: "FadeOut",
  props: {
    act: Object
  }
};
</script>

<style lang="scss">
.el-card__header {
  background: linear-gradient(90deg, #4b6cb7 0%, #182848 100%);
}
</style>
