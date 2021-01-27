<script>
import VanillaSwipe from "../utils/vanilla-swipe";

export default {
  name: "VueWildSwipe", // vue component name
  props: {
    images: {
      type: Array,
    },
    arrows: {
      type: Boolean,
      default: true,
    },
    bullets: {
      type: Boolean,
      default: true,
    },
    keys: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      currentIndex: 0,
      numImages: this.images.length,
    };
  },
  methods: {
    setIndex(index) {
      this.currentIndex = index;
    },
  },
  computed: {
    bulletList() {
      return new Array(this.numImages).fill(false).map((_, i) => ({
        key: i,
        active: i === this.currentIndex ? true : false,
      }));
    },
  },
  watch: {
    images: function (newImages, oldImages) {
      this.numImages = newImages.length;
      this.currentIndex = 0;
      if (newImages && newImages !== oldImages && newImages.length > 0) {
        this.swiper.refreshNumImages(newImages.length);
      }
    },
  },
  mounted() {
    this.swiper = new VanillaSwipe(this.$refs.container);
    this.swiper.onChangeIndex = this.setIndex;
    if (this.keys) {
      this.swiper.bindKeyEventListeners();
    }
  },
  beforeDestroy() {
    this.swiper.unbindEventListeners();
    if (this.keys) {
      this.swiper.unbindKeyEventListeners();
    }
  },
};
</script>

<template>
  <div class="vue-wild-swipe">
    <div class="container" ref="container">
      <img :src="url" v-for="url in images" :key="url" />
    </div>
    <div class="bullets" v-if="bullets">
      <span
        class="icon-circle"
        :key="bullet.key"
        v-for="bullet in bulletList"
        :class="[bullet.active ? 'active' : '']"
      ></span>
    </div>
    <span
      class="icon-chevron-circle-left"
      v-if="arrows && currentIndex > 0"
      @click="swiper.prev()"
    ></span>
    <span
      class="icon-chevron-circle-right"
      v-if="arrows && currentIndex < numImages - 1"
      @click="swiper.next()"
    ></span>
  </div>
</template>

<style scoped>
@import "./styles/icons.css";

.vue-wild-swipe {
  max-width: 100%;
  overflow-x: hidden;
  height: 100%;
  position: relative;
}

.container {
  --n: 1;
  display: flex;
  align-items: center;
  overflow-y: hidden;
  width: 100%;
  height: 100%;
  width: calc(var(--n) * 100%);
  max-height: 100vh;
  transform: translate(calc(var(--i, 0) / var(--n) * -100%));
}

.container img {
  width: 100%;
  width: calc(100% / var(--n));
  user-select: none;
  pointer-events: none;
}

span[class^="icon-chevron-circle-"] {
  position: absolute;
  top: calc(50% - 12px);
  color: rgba(255, 255, 255, 0.7);
  transform: scale(1.5);
  line-height: 1.5em;
}

.icon-chevron-circle-left {
  left: 10px;
}

.icon-chevron-circle-right {
  right: 10px;
}

.bullets {
  text-align: center;
}

.bullets span {
  margin: 0 2px;
  font-size: 10px;
  color: #ccc;
}

.bullets span.active {
  color: #1fa1f7;
}
</style>
