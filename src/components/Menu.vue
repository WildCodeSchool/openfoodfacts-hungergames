<template>
  <nav class="headerNav">
    <button class="headerButton" type="button" @click="setOpen()">
      <img class="buttonImg" src="../assets/burger.png" alt="Menu" />
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
      <li class="headerItem" @click="setOpen()">{{ $t("game.tutorial") }}</li>
      <li class="headerItem" @click="setOpen()">{{ $t("game.profile") }}</li>
      <li class="headerItem" @click="setOpen()">{{ $t("game.log_in") }}</li>
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
    <!-- <router-link v-for="item in menuItems" active-class="active" class="item mobile hidden" :to="item.to" :key='item.to'>
        {{item.label}}
      </router-link> -->
    <!-- <sui-dropdown item icon="bars" simple class="mobile only">
      <sui-dropdown-menu>
        <template v-for="item in menu">
          <sui-dropdown-header v-if="!item.to" :key="item.label">
            {{item.label}}
          </sui-dropdown-header>
          <sui-dropdown-divider v-if="!item.label" :key="item.label"/>
          <router-link active-class="active" class="item" :to="item.to" :key="item.label" v-if="item.to">
            {{item.label}}
          </router-link>
        </template>
      </sui-dropdown-menu>
    </sui-dropdown>
    <sui-menu-item class="item mobile hidden">
      <img src="~/../assets/logo.png" >
    </sui-menu-item>
    <router-link v-for="item in menuItems" active-class="active" class="item mobile hidden" :to="item.to" :key='item.to'>
      {{item.label}}
    </router-link> -->
  </nav>
</template>

<script>
export default {
  data: function() {
    return {
      open: false,
      // menu : [
      //   {label: this.$t('menu.games')},
      //   {label: this.$t('menu.questions'), to:'/questions'},
      //   {},
      //   {label: this.$t('menu.manage'), type: 'header'},
      //   {label: this.$t('menu.settings'), to:'/settings'},
      // ]
    };
  },
  filters: {
    capitalize: function(value) {
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
  computed: {
    // menuItems: function() {
    //   return this.menu.filter((item) => {
    //     return item.to
    //   })
    // }
  },
};
</script>
<style scoped>
@import "./styles/menu.css";
</style>
