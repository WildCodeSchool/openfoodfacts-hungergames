<template>
  <div class="globalContainer">
    <header>
      <Menu />
      <h1>{{ name_app }}</h1>
    </header>
    <router-view />
  </div>
</template>

<script>
import Menu from "./components/Menu";
import { updateInsightLocalStorage } from "./utils/utilsApp";
// import { vhTrick } from "./utils/vhTrick";
import { NAME_APP } from "./const";

export default {
  name: "app",
  components: { Menu },
  data: function () {
    return {
      name_app: NAME_APP,
    };
  },
  mounted() {
    updateInsightLocalStorage();
    // vhTrick();
  },
};
</script>
