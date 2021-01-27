<template>
  <article>
    <p>
      {{ $t("game.next_level") }}: {{ annotatedCount }} /
      {{ level }}
    </p>
    <div class="congratContainer" v-if="showPopUp">
        <p  v-bind:class="popUpColors[randomizeColor]">{{popUpMessages[randomizer]}}</p>
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
    popUpColors: {
      type: Array,
      default (){
        return [
      "popYellow", "popRed", "popGreen", "popLightBlue", "popMidBlue"
    ]},},
    showPopUp:{
      type: Boolean,
      required: true,
    }
  },
  data: function() {
    return {
      randomizer: 0,
      randomizeColor: 0,
    };
  },
  mounted(){
    this.$watch(
    function randomPop(){
      if (this.showPopUp){
        this.randomizer =  Math.floor(Math.random() * (this.popUpMessages.length + 1));
        this.randomizeColor =  Math.floor(Math.random() * (this.popUpColors.length + 1));
      }
    }
    // sessionAnnotatedCount() {
    //   if (this.annotatedCount+1 === this.level) {
    //     this.showPopUp = true;
    //   } else if(this.showPopUp === true){
    //     this.showPopUp = false;
    //   }
    //   console.log(this.showPopUp, this.annotatedCount, this.level);
    // },
    );
  }
  
  // computed: {
  //   poping: function(){
  //     return (new Promise())
  //     .then(
  //       this.showPopUp = true,
  //       timeout(2000)
  //     )
  //     .then(this.showPopUp = false)
  //   }
  // },
  // mounted() {
  //   const userInsightLocalStorage = getUserInsightLocalStorage();
  //   this.historyAnnotatedCount = userInsightLocalStorage.count;
  //   this.levelToReach = userInsightLocalStorage.level;
  // },
}
</script>
