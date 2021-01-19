<template>
  <div v-if="loaded" class="product-card">
    <!-- <div v-if="images.length > 0">
      <viewer :images="images" :options="imageZoomOptions">
        <img :src="url" v-for="url in images" :key="url" loading="lazy" />
      </viewer>
      <div class="ui divider"></div>
    </div> -->
    <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide>Slide 1</swiper-slide>
      <swiper-slide>Slide 2</swiper-slide>
      <swiper-slide>Slide 3</swiper-slide>
      <swiper-slide>Slide 4</swiper-slide>
      <swiper-slide>Slide 5</swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
  </div>
</template>

<script>
import offService from "../off";
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
  },
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
  computed: {
      swiper() {
        return this.$refs.mySwiper.$swiper
      }
    },
  mounted() {
    if (this.barcode) {
      this.update();
    }
    console.log('Current Swiper instance object', this.swiper)
      this.swiper.slideTo(3, 1000, false)
  },
};
</script>
