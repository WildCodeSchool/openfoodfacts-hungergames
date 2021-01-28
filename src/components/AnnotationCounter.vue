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
          return fittingRank;
        }
      }
    },
    setLevel: function () {
      this.level = this.findLevel(ALL_RANKS);
    },
    checkPopUp: function () {
      if (this.annotatedCount === this.level) {
        this.showPopUp = true;
        setTimeout(this.disablePop, 1500);
        this.setLevel();
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
  },
};
</script>
