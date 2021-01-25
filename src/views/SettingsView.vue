<template>

  <section class="settingsContainer">

      <h2 class="settingsTitle">{{ $t("settings.settings") }}</h2>
      <form  v-on:submit.prevent="search"  class="selectorForm">
             <label for="langSelector" class="langLabel">{{ $t("settings.language") }}</label>
            <select v-model="selectedLang"  id="langSelector">
              <option
                v-for="(lang, i) in langs"
                :key="`Lang${i}`"
                :value="lang"
              >
                {{ lang.toUpperCase() }}
              </option>
            </select>

        <button @click="saveLang" class="langButton">{{ $t("settings.save") }}</button>

      </form>
  </section>
</template>

<script>
import { localSettings } from "../settings";
import messages from "../i18n/messages";

export default {
  name: "SettingsView",
  props: [],
  data: function() {
    return {
      selectedLang: this.$i18n.locale,
      langs: Object.keys(messages),
    };
  },
  methods: {
    saveLang: function() {
      this.$i18n.locale = this.selectedLang;
      localSettings.update("lang", this.$i18n.locale);
    },
  },
};
</script>

<style scoped>
@import "../components/styles/settings.css";
</style>
