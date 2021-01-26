<template>
  <article>
    <p>
      {{ $t("game.next_level") }}: {{ annotatedCount }} /
      {{ levelToReach }}
    </p>
    <div class="congratContainer" v-if="showPopUp">
        <p class="congrat">Bravo</p>
  </div>
  </article>
</template>

<script>
import {
  getUserInsightLocalStorage,
  saveUserInsightLocalStorage,
} from "../utils";

export default {
  name: "AnnotationCounter",
  props: {
    sessionAnnotatedCount: {
      type: Number,
      required: true,
    },
    currentInsightId: {
      type: String,
      required: true,
    },
    popUpMessages: {
      type: Array,
      default (){
        return [
      "Wow", "Amazing", "Wonderful", "Impressive", "Great job", "Bravo", "Sensational", "Tremendous", "Wondrous", "Marvelous", "Prodigious", "Stupendous", "Phenomenal", "Colossal", "Legendary"
    ]},},
    allRanks:{
      type: Array,
      default (){
        return [
      20, 40, 60, 80, 100, 200, 300, 400, 500, 1000, 1500, 2000, 3000, 4000, 5000, 7500, 10000, 25000, 50000, 100000, 150000, 200000, 500000, 1000000, 10000000, 100000000, 1000000000, 10000000000
    ]},},
  },
  data: function() {
    return {
      historyAnnotatedCount: 0,
      levelToReach: 0,
      showPopUp: false,
    };
  },
  watch: {
    sessionAnnotatedCount() {
      if (this.annotatedCount === this.allRanks[this.levelToReach]) {
        // alert(`Palier ${this.levelToReach} atteint !! Bravo`);
        this.showPopUp = true;
        this.levelToReach += 1;
      }
      saveUserInsightLocalStorage(
        this.annotatedCount,
        this.levelToReach,
        this.currentInsightId
      );
    },
  },
  computed: {
    annotatedCount: function() {
      return this.historyAnnotatedCount + this.sessionAnnotatedCount;
    },
  },
  mounted() {
    const userInsightLocalStorage = getUserInsightLocalStorage();
    this.historyAnnotatedCount = userInsightLocalStorage.count;
    this.levelToReach = userInsightLocalStorage.level;
  },
};
</script>
