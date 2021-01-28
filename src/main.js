import Vue from "vue";
import VueRouter from "vue-router";
import VueI18n from "vue-i18n";
import VueSocialSharing from "vue-social-sharing";
import App from "./App.vue";
import QuestionView from "./views/QuestionView.vue";
import SettingsView from "./views/SettingsView.vue";
import ShareView from "./views/ShareView.vue";
import messages from "./i18n/messages";
import { getLang, getLaterality } from "./settings";
import "./app.css";

Vue.use(VueSocialSharing);
Vue.use(VueRouter);
Vue.use(VueI18n);
Vue.config.productionTip = false;

// Droitier / Gaucher
Vue.prototype.$laterality = getLaterality();
Vue.prototype.$setLaterality = (lat) => {
  Vue.prototype.$laterality = lat;
};

const routes = [
  { path: "/", redirect: "/questions" },
  { path: "/questions", component: QuestionView },
  { path: "/settings", component: SettingsView },
  { path: "/share", component: ShareView },
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
