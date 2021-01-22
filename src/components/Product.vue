<template>
  <div v-show="loaded" class="product-card">
  <div class='swiperContainer' ref="swiperContainer">
    <img :src="url" v-for="url in images" :key="url" loading="lazy" />
  </div>
  </div>
</template>

<script>
import offService from "../off";
import swipeUtils from "../utils/swipeUtil";

export default {
  name: "Product",
  props: ["barcode"],
  data: function () {
    return {
      images: [],
      loaded: false,
      imageZoomOptions: {
        toolbar: {
          rotateLeft: 1,
          rotateRight: 1,
        },
      },
      swiperOptions: {
          pagination: {
            el: '.swiper-pagination'
          },
      },
    };
  },
  watch: {
    barcode: function (value) {
      this.images = [];
      if (value) {
        this.update();
      } else {
        this.loaded = false;
      }
    },
  },
  methods: {
    update: function () {
      offService.getImage(this.barcode).then((result) => {
        this.images = result.data;

        this.loaded = true;
      });
    },
  },
  mounted() {
    if (this.barcode) {
      this.update();
    }
  },
  updated(){
    const swiperContainer = this.$refs.swiperContainer;
    console.log('update', this.barcode);

    window.addEventListener('keydown', (e) => {
      console.log(e.keyCode)
    })

    if(this.eventListeners) {

      const swiperContainer = this.$refs.swiperContainer;
      const { size, lock, drag, move } = this.eventListeners;

      removeEventListener("resize", size, false);

      swiperContainer.removeEventListener("mousedown", lock, false);
      swiperContainer.removeEventListener("touchstart", lock, false);

      swiperContainer.removeEventListener("mousemove", drag, false);
      swiperContainer.removeEventListener("touchmove", drag, false);

      swiperContainer.removeEventListener("mouseup", move, false);
      swiperContainer.removeEventListener("touchend", move, false);
    }
    // if (this.loaded && this.images.length > 0 && !this.eventListeners) {
     if (this.loaded && this.images.length > 0) {

      this.eventListeners = swipeUtils(swiperContainer);
      const { size, lock, drag, move } = this.eventListeners;

      addEventListener("resize", size, false);

      swiperContainer.addEventListener("mousedown", lock, false);
      swiperContainer.addEventListener("touchstart", lock, false);

      swiperContainer.addEventListener("mousemove", drag, false);
      swiperContainer.addEventListener("touchmove", drag, false);

      swiperContainer.addEventListener("mouseup", move, false);
      swiperContainer.addEventListener("touchend", move, false);
    }
  },
  beforeDestroy() {
  }
};
</script>
