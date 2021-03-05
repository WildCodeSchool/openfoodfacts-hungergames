<template>
  <article>
    <p>
      {{ $t("game.next_level") }}: {{ annotatedCount }} /
      {{ level }}
    </p>
    <div class="congratContainer" v-if="showPopUp">
      <p v-bind:class="popUpColors[randomizeColor]">
        {{ $t("game.popup_msg")[randomizer] }}
      </p>
    </div>
  </article>
</template>

<script>
import { ALL_RANKS } from "../const";
import {
  getUserInsightLocalStorage,
  saveUserInsightLocalStorage,
} from "../utils";
export default {
  name: "AnnotationCounter",
  props: {
    annotatedCount: {
      type: Number,
      required: true,
    },
    currentInsightId: {
      type: String,
      required: true,
    },
    popUpColors: {
      type: Array,
      default() {
        return [
          "popYellow",
          "popRed",
          "popGreen",
          "popLightBlue",
          "popMidBlue",
        ];
      },
    },
  },
  data: function () {
    return {
      randomizer: 0,
      randomizeColor: 0,
      showPopUp: false,
      level: 20,
    };
  },
  methods: {
    disablePop: function () {
      if (this.showPopUp === true) {
        this.showPopUp = false;
      }
    },
    findLevel: function (ranks) {
      let fittingRank = 0;
      for (let i = 0; i < ranks.length; i++) {
        if (ranks[i] > this.annotatedCount) {
          fittingRank = ranks[i];
          saveUserInsightLocalStorage(null, fittingRank, null);
          return fittingRank;
        }
      }
      return getUserInsightLocalStorage().level;
    },
    setLevel: function () {
      this.level = this.findLevel(ALL_RANKS);
    },
    checkPopUp: function () {
      if (this.annotatedCount === this.level) {
        this.showPopUp = true;
        setTimeout(this.disablePop, 1500);
        this.setLevel();
        this.checkLevelToReach();
      }
    },
    checkLevelToReach: function () {
      if (!this.level || this.level <= this.annotatedCount) {
        const insightsLocalStorage = getUserInsightLocalStorage();
        this.level = insightsLocalStorage.level;
        if (insightsLocalStorage.level <= this.annotatedCount) {
          this.level *= 2;
          saveUserInsightLocalStorage(null, this.level, null);
        }
      }
    },
  },
  watch: {
    annotatedCount: function () {
      this.checkPopUp();
      if (this.showPopUp) {
        this.randomizer = Math.floor(
          Math.random() * this.$t("game.popup_msg").length
        );
        this.randomizeColor = Math.floor(
          Math.random() * this.popUpColors.length
        );
      }
    },
  },
  mounted() {
    this.setLevel();
    this.checkLevelToReach();
  },
};
</script>
