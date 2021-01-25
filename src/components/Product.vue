<template>
  <div v-show="loaded" class="product-card">
  <vue-wild-swipe :images="images"></vue-wild-swipe>
  </div>
</template>

<script>
import VueWildSwipe from "vue-wild-swipe";
import offService from "../off";

export default {
  name: "Product",
  components: {
    VueWildSwipe
  },
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
  }
};
</script>
