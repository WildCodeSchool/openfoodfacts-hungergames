<template>
  <nav class="headerNav">
    <button class="headerButton" type="button" @click="setOpen()">
      <img class="buttonImg" src="../assets/burger.svg" alt="Menu" />
    </button>
    <ul class="headerList" v-if="open">
      <router-link
        active-class="active"
        class="item"
        :to="'/questions?type=brand'"
        :key="this.$t('questions.brand')"
      >
        <li class="headerItem headerGame" @click="setOpen()">
          {{ this.$t("questions.brand") | capitalize }}
        </li>
      </router-link>
      <router-link
        active-class="active"
        class="item"
        :to="'/questions?type=category'"
        :key="this.$t('questions.category')"
      >
        <li class="headerItem headerGame" @click="setOpen()">
          {{ this.$t("questions.category") | capitalize }}
        </li>
      </router-link>
      <router-link
        active-class="active"
        class="item"
        :to="'/project'"
        :key="'projet'"
      >
        <li class="headerItem" @click="setOpen()">Projet</li>
      </router-link>
      <router-link
        active-class="active"
        class="item"
        :to="'/share'"
        :key="this.$t('menu.share')"
      >
        <li class="headerItem" @click="setOpen()">
          {{ this.$t("menu.share") }}
        </li>
      </router-link>
      <router-link
        active-class="active"
        class="item"
        :to="'/settings'"
        :key="this.$t('menu.settings')"
      >
        <li class="headerItem" @click="setOpen()">
          {{ this.$t("menu.settings") }}
        </li>
      </router-link>
      <li class="headerItem headerExternal" @click="setOpen()">
        <a
          href="https://world.openfoodfacts.org/"
          title="Open Food Facts website"
          target="_blank"
          >Site d'Open Food Facts</a
        >
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data: function () {
    return {
      open: false,
    };
  },
  filters: {
    capitalize: function (value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
  methods: {
    setOpen() {
      this.open = !this.open;
    },
    close(e) {
      if (!this.$el.contains(e.target)) {
        this.open = false;
      }
    },
  },
  mounted() {
    document.addEventListener("click", this.close);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.close);
  },
};
</script>
<style scoped>
@import "./styles/menu.css";
</style>
