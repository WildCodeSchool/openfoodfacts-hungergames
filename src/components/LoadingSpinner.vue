<template>
  <div>
    <div class="sbl-circ" v-if="show"></div>
  </div>
</template>

<script>
export default {
  name: "LoadingSpinner",
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style scoped>
@import "../components/styles/loadingSpinner.css";
</style>
