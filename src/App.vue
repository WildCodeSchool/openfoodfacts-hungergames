<template>
  <div class="globalContainer">
    <header>
      <Menu />
      <h1>Nom de l'app</h1>
    </header>
    <router-view />
  </div>
</template>

<script>
import Menu from "./components/Menu";
import { updateInsightLocalStorage } from "./utils/utilsApp";

export default {
  name: "app",
  components: { Menu },
  data: function () {
    return {};
  },
  mounted() {
    updateInsightLocalStorage();
  },
};
</script>
