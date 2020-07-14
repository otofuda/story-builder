<template>
  <div class="export">
    <el-row :gutter="20">
      <el-col :span="16">
        プレビュー｜
        <a
          ref="dllink"
          class="kit-hl-alt"
          target="_blank"
          rel="noopener noreferrer"
          >ファイルを取得</a
        >
      </el-col>
      <el-col :span="8" style="text-align: right">
        <el-button
          type="primary"
          icon="el-icon-folder-opened"
          @click="exportFile"
          >ファイルとしてエクスポート</el-button
        >
      </el-col>
    </el-row>

    <pre v-text="generateScript"></pre>
  </div>
</template>

<script>
export default {
  name: "AppExport",
  props: {
    acts: Array
  },
  computed: {
    generateScript() {
      let r = "#main_start\n\n";
      for (const act of this.acts) {
        switch (act.type) {
          case "Say":
            r += `@say ${act.name} ${act.costume} ${act.face}\n`;
            r += `${act.body}\n@sayend`;
            break;
          case "Back":
            r += `@back ${act.name}`;
            break;
          case "FadeIn":
            r += `@fade In ${act.duration}`;
            break;
          case "FadeOut":
            r += `@fade Out ${act.duration}`;
            break;
          case "Join":
            r += `@join ${act.name}`;
            break;
          case "Leave":
            r += `@leave ${act.name}`;
            break;
        }
        r += "\n\n";
      }
      r += "#main_end\n#option_end";
      return r;
    }
  },
  methods: {
    exportFile() {
      const blob = new Blob([this.generateScript], { type: "text/plain" });
      var a = this.$refs.dllink;
      a.href = URL.createObjectURL(blob);
      a.download = "STORY.grimm.";
      a.click();
    }
  }
};
</script>

<style lang="scss">
.el-card__body {
  padding: 0 20px !important;
}
</style>
