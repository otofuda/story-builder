<template>
  <div id="app">
    <header>
      <a
        href="http://github.com/otofuda/story-builder"
        target="_blank"
        rel="noopener noreferrer"
        ><img
          src="https://otofuda.github.io/story-builder/logo.png"
          alt="StoryBuilder"
      /></a>
      <div>
        <el-button round @click="toggleExport" icon="el-icon-s-tools"
          >エクスポート設定</el-button
        >
      </div>
    </header>

    <AppExport class="export" v-if="config.export" :acts="acts"></AppExport>

    <nav>
      <el-collapse v-model="activeNames">
        <el-collapse-item title="ファイル操作" name="1">
          <div>保存していない現在の作業状況は失われます。</div>
          <div class="kit-flex m-t">
            <el-button
              type="primary"
              class="kit-flex-grow"
              @click="newProfile()"
              >新規ファイル</el-button
            >
          </div>
          <div class="kit-flex m-t">
            <el-button
              type="primary"
              class="kit-flex-grow"
              @click="loadSample()"
              >サンプルデータを読み込む</el-button
            >
          </div>
        </el-collapse-item>
      </el-collapse>
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
            ></el-button>
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
            ></el-button>
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

      <h3><i class="el-icon-s-operation"></i> 表示</h3>
      <el-switch
        v-model="config.compact"
        active-text="コンパクト表示"
      ></el-switch>
    </nav>

    <main>
      <h3><i class="el-icon-tickets"></i> スクリプト</h3>

      <el-timeline class="acts">
        <MainStart />
        <el-divider></el-divider>

        <draggable v-model="acts" :animation="250" handle=".handle">
          <el-timeline-item
            v-for="(act, index) in acts"
            :key="index"
            size="large"
          >
            <Wrapper
              :act="act"
              :index="index"
              :config="config"
              @delete-act="deleteAct"
            >
              <component
                :is="act.type"
                :act="act"
                :characters="characters"
                :backgrounds="backgrounds"
                :index="index"
              />
            </Wrapper>
            <ActPreview
              v-if="previewList[index].characters.size > 0"
              :index="index"
              :preview="previewList[index]"
              @select-char="selectChar"
            />
          </el-timeline-item>
        </draggable>

        <el-divider></el-divider>
        <MainEnd />
        <OptionEnd />
      </el-timeline>

      <el-dropdown
        split-button
        type="primary"
        @click="addAct('Say')"
        class="add-button kit-shadow-5"
        trigger="click"
        @command="addAct"
      >
        末尾に通常セリフを追加
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="Say"
            ><i class="el-icon-chat-dot-square"></i>
            通常セリフ</el-dropdown-item
          >
          <el-dropdown-item command="Back"
            ><i class="el-icon-picture"></i>背景変更</el-dropdown-item
          >
          <el-dropdown-item command="FadeIn"
            ><i class="el-icon-caret-right"></i>暗転解除</el-dropdown-item
          >
          <el-dropdown-item command="FadeOut"
            ><i class="el-icon-caret-left"></i>暗転</el-dropdown-item
          >
          <el-dropdown-item command="Join"
            ><i class="el-icon-arrow-right"></i>キャラ入場</el-dropdown-item
          >
          <el-dropdown-item command="Leave"
            ><i class="el-icon-arrow-left"></i>キャラ退場</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
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

import Wrapper from "./components/Wrapper";
import AppExport from "./components/AppExport";
import ActPreview from "./components/ActPreview";

export default {
  name: "App",
  data() {
    return {
      config: {
        compact: false,
        export: false
      },
      activeNames: [],
      charName: "",
      characters: ["華音", "門音", "空音", "大音", "_"],
      backgroundName: "",
      backgrounds: ["BLACK", "朝", "夜"],
      acts: [],
      sample: [
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
          body: "これは、ある世界の物語",
          costume: 0,
          face: 0
        },
        {
          type: "FadeIn",
          duration: "0.5"
        },
        {
          type: "Back",
          name: "朝"
        },
        {
          type: "Say",
          name: "門音",
          body: "あの魔物は・・・私の兄の仇・・・絶対に許さない。",
          costume: 0,
          face: 0
        },
        {
          type: "Say",
          name: "怪物",
          body: "うぁぁぁぁぁ！やめてくれぇぇぇ！",
          costume: 0,
          face: 0
        },
        {
          type: "FadeOut",
          duration: "0.5"
        },
        {
          type: "Join",
          name: "門音"
        },
        {
          type: "Say",
          name: "_",
          body:
            "必死に門音の方に手を伸ばす、しかしその手はあと一歩のところで届かない。\nあの時私の手が届いていれば・・・。",
          costume: 0,
          face: 0
        },
        {
          type: "Leave",
          name: "華音"
        },
        {
          type: "FadeIn",
          duration: "0.5"
        }
      ]
    };
  },
  computed: {
    previewList() {
      let result = [],
        currentBackground = this.backgrounds.first,
        currentCharacters = [],
        currentDark = false;
      for (const act of this.acts) {
        let active = null;
        if (act.type === "Say") {
          active = act.name;
          if (
            act.name &&
            !currentCharacters.includes(act.name) &&
            this.characters.includes(act.name) &&
            act.name !== "_"
          )
            currentCharacters.append(act.name);
        } else if (act.type == "Join") {
          if (
            act.name &&
            !currentCharacters.includes(act.name) &&
            act.name !== "_"
          )
            currentCharacters.append(act.name);
        } else if (act.type == "Leave") {
          if (currentCharacters.includes(act.name))
            currentCharacters = currentCharacters.delete(act.name);
        } else if (act.type === "Back") {
          currentBackground = act.name;
        } else if (act.type === "FadeOut") {
          currentDark = true;
        } else if (act.type === "FadeIn") {
          currentDark = false;
        }
        result.append({
          background: currentBackground,
          characters: [...currentCharacters],
          dark: currentDark,
          active
        });
      }
      return result;
    }
  },
  mounted() {
    Bury.init();
  },
  methods: {
    toggleExport() {
      this.config.export = !this.config.export;
    },
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
    },
    addAct(type) {
      let r;
      switch (type) {
        case "Say":
          r = { name: "", body: "", costume: 0, face: 0 };
          break;
        case "Back":
          r = { name: "" };
          break;
        case "FadeIn":
          r = { duration: 0.5 };
          break;
        case "FadeOut":
          r = { duration: 0.5 };
          break;
        case "Join":
          r = { name: "" };
          break;
        case "Leave":
          r = { name: "" };
          break;
        case "MainStart":
        case "MainEnd":
        case "OptionEnd":
        default:
          this.$message({
            type: "error",
            message: "不明なタイプを追加できませんでした。"
          });
          return false;
      }
      this.acts.push({ type, ...r });
      this.$message({
        type: "success",
        message: `${type}を追加しました。`
      });
    },
    deleteAct(index) {
      this.$confirm(`本当に${this.acts[index].type}を削除しますか？`, "確認", {
        confirmButtonText: "削除",
        cancelButtonText: "キャンセル",
        type: "warning"
      }).then(() => {
        this.acts.delete_at(index);
        this.$message({ type: "success", message: "削除しました。" });
      });
    },
    selectChar(index, name) {
      const act = this.acts[index];
      if (["Say", "Leave"].includes(act.type)) act.name = name;
    },
    // ファイル操作関連
    newProfile() {
      this.$confirm(
        "本当に新規プロファイルの編集を開始しますか？作業中のデータは失われます。",
        "確認",
        {
          confirmButtonText: "了解して続行",
          cancelButtonText: "キャンセル",
          type: "warning"
        }
      ).then(() => {
        this.acts = [];
        this.$message({
          type: "success",
          message: "新しいプロファイルの編集を開始しました。"
        });
      });
    },
    loadSample() {
      this.$confirm(
        "本当にサンプルファイルを読み込みますか？作業中のデータは失われます。",
        "確認",
        {
          confirmButtonText: "了解して続行",
          cancelButtonText: "キャンセル",
          type: "warning"
        }
      ).then(() => {
        this.acts = this.sample;
        this.$message({
          type: "success",
          message: "サンプルファイルを読み込みました。"
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
    OptionEnd,
    Wrapper,
    AppExport,
    ActPreview
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
  grid-template-rows: 105px 1fr;
  header {
    grid-column: 1/3;
    grid-row: 1;
    background: #303030;
    padding: 5px 10px 0 10px;
    display: flex;
    img {
      height: 90px;
    }
    div {
      flex-grow: 1;
      text-align: right;
      padding-top: 25px;
    }
  }
  .export {
    grid-column: 1/3;
    grid-row: 2;
    background: #303030;
    color: #ffffff;
    padding: 10px;
    pre {
      color: #505050;
      max-height: 250px;
    }
  }
  nav {
    background: #f0f0f0;
    padding: 0 10px;
    .el-table {
      margin-bottom: 15px;
    }
    .el-collapse-item__header,
    .el-collapse-item__wrap {
      background: transparent;
    }
  }
  main {
    padding: 0 20px;
    background: #ffffff;
    .el-timeline-item:last-child {
      padding-bottom: 0;
    }
    .add-button {
      position: fixed;
      bottom: 15px;
      right: 15px;
    }
    .el-timeline-item__content {
      display: flex;
      > .el-card:first-child {
        flex-grow: 1;
      }
    }
  }
  .acts {
    padding-left: 4px;
    .el-card__header {
      background-image: radial-gradient(
        circle farthest-corner at 10% 20%,
        rgba(234, 249, 249, 0.67) 0.1%,
        rgba(239, 249, 251, 0.63) 90.1%
      );
      font-size: 18px;
    }
    label {
      font-size: 16px;
      margin-right: 20px;
    }
  }
}

.el-dropdown-menu__item {
  font-size: 16px !important;
  padding: 10px 20px !important;
  width: 200px;
}
</style>
