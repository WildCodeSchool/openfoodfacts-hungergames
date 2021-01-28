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
    // level: {
    //   type: Number,
    //   required: true,
    // },
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
    // showPopUp:{
    //   type: Boolean,
    //   required: true,
    // },
    allRanks:{
      type: Array,
      default (){
        return [
      5, 6, 7, 8, 9, 11, 12, 13, 20, 40, 60, 80, 100, 200, 300, 400, 500, 1000, 1500, 2000, 3000, 4000, 5000, 7500, 10000, 25000, 50000, 100000, 150000, 200000, 500000, 1000000, 10000000, 100000000, 1000000000, 10000000000
    ]},},
  },
  data: function() {
    return {
      randomizer: 0,
      randomizeColor: 0,
      showPopUp: false,
      level:5,
    };
  },
  // mounted(){
  //   this.$watch(
  //   function randomPop(){
  //     if (this.showPopUp){
  //       this.randomizer =  Math.floor(Math.random() * (this.popUpMessages.length + 1));
  //       this.randomizeColor =  Math.floor(Math.random() * (this.popUpColors.length + 1));
  //     }
  //   }
  //   );
  // },
  methods:{
    disablePop: function(){
      if (this.showPopUp===true){
        this.showPopUp=false;
      }
    },
    findLevel: function(rank){
      return rank> this.level;
    },
    setLevel:function(){
      this.level = this.allRanks[this.allRanks.findIndex(this.findLevel)];
    },
    checkPopUp: function () {
      if (
        this.annotatedCount ===
        this.level
      ) {
        this.showPopUp = true;
        setTimeout(this.disablePop, 1500);
        this.setLevel();
        // this.level = this.allRanks[this.allRanks.findIndex(this.findLevel)];
      }
    },
  },
  watch: {
    annotatedCount: function () {
      this.checkPopUp();
      if (this.showPopUp) {
        this.randomizer = Math.floor(Math.random() * (this.popUpMessages.length));
        this.randomizeColor = Math.floor(Math.random() * (this.popUpColors.length));
      }
      // for( let i = 0; this.annotatedCount<this.allRanks[i]; i++){
      //   this.level = this.allRanks[i];
      // }
    },
  },
  mounted(){
    this.setLevel();
  }
}
</script>
