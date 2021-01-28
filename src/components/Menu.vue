<template>
  <nav class="headerNav">
    <button class="headerButton" type="button" @click="setOpen()">
      <img class="buttonImg" src="../assets/burger.svg" alt="Menu" />
    </button>
    <ul class="headerList" v-if="open">
      <li class="headerItem" @click="setOpen()">
        <router-link
          active-class="active"
          class="item"
          :to="'/questions?type=brand'"
          :key="this.$t('menu.settings')"
        >
          {{ this.$t("questions.brand") | capitalize }}
        </router-link>
      </li>
      <li class="headerItem" @click="setOpen()">
        <router-link
          active-class="active"
          class="item"
          :to="'/questions?type=category'"
          :key="this.$t('menu.settings')"
        >
          {{ this.$t("questions.category") | capitalize }}
        </router-link>
      </li>
      <li class="headerItem" @click="setOpen()">
        <router-link
          active-class="active"
          class="item"
          :to="'/share'"
          :key="this.$t('menu.share')"
        >
          {{ this.$t("menu.share") }}
        </router-link>
      </li>
      <li class="headerItem" @click="setOpen()">
        <router-link
          active-class="active"
          class="item"
          :to="'/settings'"
          :key="this.$t('menu.settings')"
        >
          {{ this.$t("menu.settings") }}
        </router-link>
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
  },
};
</script>
<style scoped>
@import "./styles/menu.css";
</style>
