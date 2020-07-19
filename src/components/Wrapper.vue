<template>
  <el-card class="wrapper">
    <div slot="header" class="clearfix handle">
      <i :class="getIcon"></i> {{ index }}
      <strong>{{ getType }} - {{ act.type }}</strong>
      <el-button
        style="float: right"
        size="mini"
        type="danger"
        icon="el-icon-delete"
        @click="deleteAct(index)"
      ></el-button>
    </div>
    <div v-if="!config.compact" style="padding: 20px 0">
      <slot></slot>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "Wrapper",
  props: {
    act: Object,
    index: Number,
    config: Object
  },
  methods: {
    deleteAct(index) {
      this.$emit("delete-act", index);
    }
  },
  computed: {
    getType() {
      let r;
      switch (this.act.type) {
        case "Say":
          r = "通常セリフ";
          break;
        case "Back":
          r = "背景変更";
          break;
        case "FadeIn":
          r = "暗転解除";
          break;
        case "FadeOut":
          r = "暗転";
          break;
        case "Join":
          r = "キャラ入場";
          break;
        case "Leave":
          r = "キャラ退場";
          break;
        case "MainStart":
          r = "メイン開始";
          break;
        case "MainEnd":
          r = "メイン終了";
          break;
        case "OptionEnd":
          r = "オプション終了";
          break;
        default:
          r = this.act.type;
          break;
      }
      return r;
    },
    getIcon() {
      let r;
      switch (this.act.type) {
        case "Say":
          r = "el-icon-chat-dot-square";
          break;
        case "Back":
          r = "el-icon-picture";
          break;
        case "FadeIn":
          r = "el-icon-caret-right";
          break;
        case "FadeOut":
          r = "el-icon-caret-left";
          break;
        case "Join":
          r = "el-icon-arrow-right";
          break;
        case "Leave":
          r = "el-icon-arrow-left";
          break;
        case "MainStart":
          r = "el-icon-film";
          break;
        case "MainEnd":
          r = "el-icon-check";
          break;
        case "OptionEnd":
          r = "el-icon-check";
          break;
        default:
          r = "el-icon-question";
          break;
      }
      return r;
    }
  }
};
</script>

<style lang="scss">
.el-card__body {
  padding: 0 20px !important;
}
</style>
