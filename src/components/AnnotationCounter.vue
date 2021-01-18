<template>
  <article>
    <p>
      {{ $t("game.next_level") }}: {{ annotatedCount }} /
      {{ levelToReach }}
    </p>
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
  },
  data: function() {
    return {
      historyAnnotatedCount: 0,
      levelToReach: 20,
    };
  },
  watch: {
    sessionAnnotatedCount() {
      if (this.annotatedCount === this.levelToReach) {
        alert(`Palier ${this.levelToReach} atteint !! Bravo`);
        this.levelToReach *= 2;
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
