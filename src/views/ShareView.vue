<template>
  <section class="shareContainer">
    <h1>{{ $t("share.share_score") }}</h1>
    <p v-if="count > 1">{{ $t("share.annotated_product", { count }) }}</p>
    <div class="share-network-list">
      <ShareNetwork
        v-for="network in allNetworks"
        :network="network.network"
        :key="network.network"
        :style="{ backgroundColor: network.color }"
        :url="sharing.url"
        :title="sharing.title"
        :description="sharing.description"
        :quote="sharing.quote"
        :hashtags="sharing.hashtags"
        :twitterUser="sharing.twitterUser"
      >
        <i :class="network.icon"></i>
        <span>{{ network.name }}</span>
      </ShareNetwork>
    </div>
  </section>
</template>

<script>
import { getUserInsightLocalStorage } from "../utils";
export default {
  name: "ShareView",
  data() {
    return {
      count: getUserInsightLocalStorage().count,
      sharing: {
        // url: "https://news.vuejs.org/issues/180",
        url: "https://test-hunger-game.netlify.app",
        title:
          "Say hi to Vite! A brand new, extremely fast development setup for Vue.",
        description:
          'This week, I’d like to introduce you to "Vite", which means "Fast". It’s a brand new development setup created by Evan You.',
        quote: "The hot reload is so fast it's near instant. - Evan You",
        hashtags: "OpenFoodFacts",
        twitterUser: "youyuxi",
      },
      networks: [
        {
          network: "twitter",
          name: "Twitter",
          icon: "fab fah fa-lg fa-twitter",
          color: "#1da1f2",
        },
        {
          network: "facebook",
          name: "Facebook",
          icon: "fab fah fa-lg fa-facebook-f",
          color: "#1877f2",
        },
        {
          network: "linkedin",
          name: "LinkedIn",
          icon: "fab fah fa-lg fa-linkedin",
          color: "#007bb5",
        },
        {
          network: "email",
          name: "Email",
          icon: "far fah fa-lg fa-envelope",
          color: "#333333",
        },
      ],
      networksMobile: [
        {
          network: "telegram",
          name: "Telegram",
          icon: "fab fah fa-lg fa-telegram-plane",
          color: "#0088cc",
        },
        {
          network: "whatsapp",
          name: "Whatsapp",
          icon: "fab fah fa-lg fa-whatsapp",
          color: "#25d366",
        },
        {
          network: "sms",
          name: "SMS",
          icon: "far fah fa-lg fa-comment-dots",
          color: "#333333",
        },
      ],
    };
  },
  computed: {
    allNetworks: function () {
      if (this.$isMobile) return this.networks.concat(this.networksMobile);
      return this.networks;
    },
  },
};
</script>

<style>
@import "../components/styles/share.css";
</style>