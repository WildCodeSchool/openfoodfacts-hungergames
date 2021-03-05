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
        :title="$t('share.title', { count })"
        :description="$t('share.description')"
        :quote="$t('share.quote')"
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
import { WEBSITE_URL } from "../const";
export default {
  name: "ShareView",
  data() {
    return {
      count: getUserInsightLocalStorage().count,
      sharing: {
        url: WEBSITE_URL,
        hashtags: "OpenFoodFacts",
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