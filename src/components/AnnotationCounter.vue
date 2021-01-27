<template>
  <article>
    <p>
      {{ $t("game.next_level") }}: {{ annotatedCount }} /
      {{ level }}
    </p>
    <div class="congratContainer" v-if="showPopUp">
        <p class="congrat">Bravo</p>
  </div>
  </article>
</template>

<script>
export default {
  name: "AnnotationCounter",
  props: {
    annotatedCount: {
      type: Number,
      required: true,
    },
    level: {
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
  },
  data: function() {
    return {
      showPopUp: false,
    };
  },
  watch: {
    sessionAnnotatedCount() {
      if (this.annotatedCount === this.level) {
        this.poping;
      }
    },
  },
  computed: {
    poping: function(){
      (new Promise())
      .then(
        this.showPopUp = true,
        timeout(2000)
      )
      .then(this.showPopUp = false)
    }
  },
  // mounted() {
  //   const userInsightLocalStorage = getUserInsightLocalStorage();
  //   this.historyAnnotatedCount = userInsightLocalStorage.count;
  //   this.levelToReach = userInsightLocalStorage.level;
  // },
}
</script>
