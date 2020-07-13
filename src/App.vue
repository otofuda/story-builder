<template>
  <div id="app">
    <header>
      <a
        href="http://github.com/otofuda/story-builder"
        target="_blank"
        rel="noopener noreferrer"
        ><img src="/logo.png" alt="StoryBuilder"
      /></a>
      <div>
        <el-button type="primary" round>Export .grimm</el-button>
      </div>
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

        <draggable v-model="acts" :animation="250">
          <el-timeline-item v-for="(act, i) in acts" :key="i" size="large">
            <Wrapper :act="act" :i="i" :config="config">
              <component
                :is="act.type"
                :act="act"
                :characters="characters"
                :backgrounds="backgrounds"
                :index="i"
              />
            </Wrapper>
          </el-timeline-item>
        </draggable>

        <el-divider></el-divider>
        <MainEnd />
        <OptionEnd />
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

import Wrapper from "./components/Wrapper";

export default {
  name: "App",
  data() {
    return {
      config: {
        compact: false
      },
      charName: "",
      characters: ["華音", "門音", "空音", "_"],
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
          type: "Leave",
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
  computed: {
    script() {
      let r = "";
      for (const act of this.acts) {
        r += act.type;
        r += " ";
      }
      return r;
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
    Wrapper
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
  nav {
    background: #f0f0f0;
    padding: 0 10px;
    .el-table {
      margin-bottom: 15px;
    }
  }
  main {
    padding: 0 20px;
    background: #ffffff;
    .el-timeline-item:last-child {
      padding-bottom: 0;
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
</style>
