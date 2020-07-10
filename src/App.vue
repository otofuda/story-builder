<template>
  <div id="app">
    <header>
      <h1>StoryBuilder beta</h1>
    </header>

    <nav>
      <h3><i class="el-icon-user-solid"></i> キャラデータ</h3>

      <el-table :data="characters" style="width: 100%">
        <el-table-column prop="this" label="名前" width="180">
          <template slot-scope="scope">
            <strong>{{ scope.row }}</strong>
          </template>
        </el-table-column>
        <el-table-column prop="delete" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="deleteChar(scope.row)"
              icon="el-icon-delete"
              >削除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <el-input
        type="text"
        placeholder="キャラ名"
        v-model="charName"
        maxlength="15"
        show-word-limit
      >
        <el-button slot="append" @click="addChar(charName)">追加</el-button>
      </el-input>

      <el-divider></el-divider>

      <h3><i class="el-icon-picture"></i> 背景データ</h3>

      <el-table :data="backgrounds" style="width: 100%">
        <el-table-column prop="this" label="名前" width="180">
          <template slot-scope="scope">
            <strong>{{ scope.row }}</strong>
          </template>
        </el-table-column>
        <el-table-column prop="delete" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="deleteBackground(scope.row)"
              >削除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <el-input
        type="text"
        placeholder="背景名"
        v-model="backgroundName"
        maxlength="15"
        show-word-limit
      >
        <el-button slot="append" @click="addBackground(backgroundName)"
          >追加</el-button
        >
      </el-input>
    </nav>

    <main>
      <h3><i class="el-icon-tickets"></i> スクリプト</h3>

      <el-timeline class="acts">
        <el-timeline-item size="large">
          <MainStart />
        </el-timeline-item>

        <el-divider></el-divider>

        <draggable v-model="acts" :animation="250">
          <el-timeline-item v-for="(act, i) in acts" :key="i" size="large">
            <component
              :is="act.type"
              :act="act"
              :characters="characters"
              :backgrounds="backgrounds"
              :index="i"
            />
          </el-timeline-item>
        </draggable>

        <el-divider></el-divider>

        <el-timeline-item size="large">
          <MainEnd />
        </el-timeline-item>
        <el-timeline-item size="large">
          <OptionEnd />
        </el-timeline-item>
      </el-timeline>
    </main>
  </div>
</template>

<script>
import Bury from "buryjs";
import draggable from "vuedraggable";

import Say from "./components/Say";
import Back from "./components/Back";
import FadeIn from "./components/FadeIn";
import FadeOut from "./components/FadeOut";
import Join from "./components/Join";
import Leave from "./components/Leave";
import MainStart from "./components/MainStart";
import MainEnd from "./components/MainEnd";
import OptionEnd from "./components/OptionEnd";

export default {
  name: "App",
  data() {
    return {
      charName: "",
      characters: ["華音", "門音", "空音", "_", "???"],
      backgroundName: "",
      backgrounds: ["朝", "夜"],
      acts: [
        {
          type: "Back",
          name: "夜"
        },
        {
          type: "FadeOut",
          duration: "0.01"
        },
        {
          type: "Say",
          name: "???",
          body: "これは、ある世界の物語"
        }
      ]
    };
  },
  mounted() {
    Bury.init();
  },
  methods: {
    addChar(name) {
      if (this.characters.includes(name)) {
        this.$alert("登録済みです。");
      } else if (name.size == 0) {
        this.$alert("キャラクターの名前を入力してください。");
      } else {
        this.characters.append(name);
        this.charName = "";
        this.$message({
          type: "success",
          message: `キャラクター「${name}」を追加しました。`
        });
      }
    },
    deleteChar(name) {
      this.$confirm(
        `本当にキャラクター「${name}」を削除しますか？（既に登録されているアクションは削除されません。）`,
        "確認",
        {
          confirmButtonText: "削除",
          cancelButtonText: "キャンセル",
          type: "warning"
        }
      ).then(() => {
        this.characters = this.characters.delete(name);
        this.$message({
          type: "success",
          message: `「${name}」を削除しました。`
        });
      });
    },
    addBackground(name) {
      if (this.backgrounds.includes(name)) {
        this.$alert("登録済みです。");
      } else if (name.size == 0) {
        this.$alert("背景の名前を入力してください。");
      } else {
        this.backgrounds.append(name);
        this.backgroundName = "";
        this.$message({
          type: "success",
          message: `背景「${name}」を追加しました。`
        });
      }
    },
    deleteBackground(name) {
      this.$confirm(
        `本当に背景「${name}」を削除しますか？（既に登録されているアクションは削除されません。）`,
        "確認",
        {
          confirmButtonText: "削除",
          cancelButtonText: "キャンセル",
          type: "warning"
        }
      ).then(() => {
        this.backgrounds = this.backgrounds.delete(name);
        this.$message({
          type: "success",
          message: `「${name}」を削除しました。`
        });
      });
    }
  },
  components: {
    draggable,
    Say,
    Back,
    FadeIn,
    FadeOut,
    Join,
    Leave,
    MainStart,
    MainEnd,
    OptionEnd
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: grid;
  grid-template-columns: 280px 1fr;
  grid-template-rows: 60px 1fr;
  header {
    grid-column: 1/3;
    grid-row: 1;
  }
  .acts {
    padding-left: 4px;
    .el-card__header {
      color: #ffffff;
      font-size: 18px;
    }
  }
}
</style>
