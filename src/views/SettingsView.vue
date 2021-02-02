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
    <div class="pwaContainer">
      <h3>Installer {{ name_app }} sur votre smartphone</h3>
      <p>
        Vous pouvez installer {{ name_app }} directement sur l'écran d'accueil
        de votre smartphone. Pour les appareils sous Android, il faut entrer
        dans le menu du navigateur et choisir "installer" ou "ajouter à l'écran
        d'accueil", selon les navigateurs. Sur iOS, il suffit de cliquer sur
        l'icône "partager" puis sur "sur l'écran d'accueil".
      </p>
    </div>
  </section>
</template>

<script>
import { localSettings } from "../settings";
import messages from "../i18n/messages";
import { NAME_APP } from "../const";

export default {
  name: "SettingsView",
  props: [],
  data: function () {
    return {
      selectedLang: this.$i18n.locale,
      langs: Object.keys(messages),
      name_app: NAME_APP,
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
