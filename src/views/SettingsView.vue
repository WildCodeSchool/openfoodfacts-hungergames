<template>

  <section class="questionContainer">
    <div>
      <h2>{{ $t("settings.settings") }}</h2>
      <form>
        <div>
          <div>
            <div>{{ $t("settings.language") }}</div>
            <select v-model="selectedLang">
              <option
                v-for="(lang, i) in langs"
                :key="`Lang${i}`"
                :value="lang"
              >
                {{ lang.toUpperCase() }}
              </option>
            </select>
          </div>
        </div>
        <button @click="saveLang">{{ $t("settings.save") }}</button>

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