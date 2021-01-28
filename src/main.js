import Vue from "vue";
import VueRouter from "vue-router";
import VueI18n from "vue-i18n";
import App from "./App.vue";
import QuestionView from "./views/QuestionView.vue";
import SettingsView from "./views/SettingsView.vue";
import messages from "./i18n/messages";
import { getLang } from "./settings";
import "./app.css";

Vue.use(VueRouter);
Vue.use(VueI18n);
Vue.config.productionTip = false;

const routes = [
  { path: "/", redirect: "/questions" },
  { path: "/questions", component: QuestionView },
  { path: "/settings", component: SettingsView },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

const i18n = new VueI18n({
  locale: getLang(),
  messages,
  fallbackLocale: "en",
});

new Vue({
  router,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
