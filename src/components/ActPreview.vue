<template>
  <el-card
    class="box-card preview"
    :class="{
      dark: preview.dark
    }"
  >
    <div slot="header" class="clearfix">
      <span>背景：{{ preview.background }}</span>
    </div>
    <el-button-group class="preview__characters">
      <el-button
        :type="charType(char)"
        v-for="char in preview.characters"
        :key="char"
      >
        <div class="preview__char">
          <el-avatar
            size="large"
            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
          ></el-avatar>
          <em>{{ char }}</em>
        </div>
      </el-button>
    </el-button-group>
  </el-card>
</template>

<script>
export default {
  name: "Wrapper",
  props: {
    preview: Object
  },
  methods: {
    charType(name) {
      return name === this.preview.active ? "primary" : "default";
    }
  }
};
</script>

<style lang="scss" scoped>
.preview {
  width: 300px;
  flex-shrink: 0;
  &.dark {
    background: #404040;
  }

  &__characters {
    display: flex;
    padding: 16px 0;
  }
  &__char {
    display: flex;
    flex-direction: column;
    > em {
      margin-top: 8px;
      text-align: center;
      font-style: normal;
    }
  }
}
</style>
