<template>

  <section class="settingsContainer">

      <h2 class="settingsTitle">{{ $t("settings.settings") }}</h2>
      <form class="selectorForm">
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
      <div class="pwaContainer">
        <h3>Installer Nom de l'app sur votre smartphone</h3>
        <p>Vous pouvez installer Nom de l'app directement sur l'écran d'accueil de votre smartphone. Pour les appareils sous Android, il faut entrer dans le menu du navigateur et choisir "installer" ou "ajouter à l'écran d'accueil", selon les navigateurs. Sur iOS, il suffit de cliquer sur l'icône "partager" puis sur "sur l'écran d'accueil".</p>
      </div>
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
