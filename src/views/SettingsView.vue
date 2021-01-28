<template>
  <section class="settingsContainer">
    <h2 class="settingsTitle">{{ $t("settings.settings") }}</h2>
    <form class="selectorForm">
      <label for="langSelector" class="langLabel">{{
        $t("settings.language")
      }}</label>
      <select v-model="selectedLang" id="langSelector">
        <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">
          {{ lang.toUpperCase() }}
        </option>
      </select>

      <button @click.prevent="saveLang" class="langButton">
        {{ $t("settings.save") }}
      </button>

      <div class="langLabel">
        <!-- $t{{"laterality"}} -->
        Laterality:
        <span
          class="radio"
          v-for="(laterality, i) in lateralities"
          :key="`Laterality${i}`"
        >
          <label>
            <input
              type="radio"
              v-model="selectedLaterality"
              :value="laterality"
              :name="laterality"
            />
            <!-- a modifier selon lang $t{{"lateralities." + laterality}} -->
            {{ laterality | capitalize }}
          </label>
        </span>
      </div>
    </form>
  </section>
</template>

<script>
import { localSettings } from "../settings";
import messages from "../i18n/messages";

export default {
  name: "SettingsView",
  props: [],
  data: function () {
    return {
      selectedLang: this.$i18n.locale,
      langs: Object.keys(messages),
      selectedLaterality: this.$laterality,
      lateralities: ["right", "left"],
    };
  },
  watch: {
    selectedLaterality() {
      this.$setLaterality(this.selectedLaterality);
      localSettings.update("laterality", this.selectedLaterality);
    },
  },
  methods: {
    saveLang: function () {
      this.$i18n.locale = this.selectedLang;
      localSettings.update("lang", this.$i18n.locale);
    },
  },
  filters: {
    capitalize: function (value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
};
</script>

<style scoped>
@import "../components/styles/settings.css";
</style>
